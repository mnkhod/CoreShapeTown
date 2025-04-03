/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class OpenWiki extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		this.blendMode = Phaser.BlendModes.SKIP_CHECK;

		// openWikiHovered
		const openWikiHovered = scene.add.image(12, 12, "Wiki_Click_V01");
		openWikiHovered.scaleX = 0.5;
		openWikiHovered.scaleY = 0.5;
		this.add(openWikiHovered);

		// openWiki
		const openWiki = scene.add.image(12, 12, "Wiki_Normal_V01");
		openWiki.scaleX = 0.5;
		openWiki.scaleY = 0.5;
		this.add(openWiki);

		// key_I
		const key_I = scene.add.image(23, 23, "ShotCut_Buttom_Wiki");
		key_I.scaleX = 0.5;
		key_I.scaleY = 0.5;
		this.add(key_I);

		// keyboard_I
		const keyboard_I = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);

		this.openWikiHovered = openWikiHovered;
		this.openWiki = openWiki;
		this.key_I = key_I;
		this.keyboard_I = keyboard_I;

		/* START-USER-CTR-CODE */
	    this.setSize(openWiki.width, openWiki.height);
	    this.setInteractive({ useHandCursor: true });
	
	    this.openWikiHovered.visible = false;
	    this.isKeyPressed = false;
	    this.isWikiOpen = false;
	
	    this.on('pointerover', this.handlePointerOver, this);
	    this.on('pointerout', this.handlePointerOut, this);
	
	    this.on('pointerdown', this.handleWikiOpen, this);
	
	    this.scene.events.on('update', this.onSceneUpdate, this);
	
	    if (this.scene.reactEvent) {
	        this.scene.reactEvent.on('close-seed-encyclopedia', () => {
	            this.isWikiOpen = false;
	        });
	    }
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Image} */
	openWikiHovered;
	/** @type {Phaser.GameObjects.Image} */
	openWiki;
	/** @type {Phaser.GameObjects.Image} */
	key_I;
	/** @type {Phaser.Input.Keyboard.Key} */
	keyboard_I;
	/** @type {Phaser.GameObjects.GameObject} */
	player;

	/* START-USER-CODE */
    handlePointerOver() {
        this.openWikiHovered.visible = true;
        this.openWiki.visible = false;
    }

    handlePointerOut() {
        this.openWikiHovered.visible = false;
        this.openWiki.visible = true;
    }

    handleWikiOpen() {
        if (!this.scene.reactEvent) return;

        this.scene.reactEvent.emit("open-seed-encyclopedia", {
            phaserInstance: this.scene
        });
        
        this.isWikiOpen = true;
    }
    
    handleWikiClose() {
        if (!this.scene.reactEvent) return;

        console.log('Closing seed encyclopedia');
        this.isWikiOpen = false;
        this.scene.reactEvent.emit("close-seed-encyclopedia");
    }

    onSceneUpdate() {
        if (!this.visible) return;

        const cam = this.scene.cameras.main;
        let newX = cam.worldView.left + 64; 
        let newY = cam.worldView.bottom - 48;

        this.setPosition(
            Phaser.Math.Linear(this.x, newX, 1),
            Phaser.Math.Linear(this.y, newY, 1)
        );

        if (Phaser.Input.Keyboard.JustDown(this.keyboard_I)) {
            console.log('I key pressed');
            if (this.isWikiOpen) {
                this.handleWikiClose();
            } else {
                this.handleWikiOpen();
            }
        }
    }

    destroy() {
        if (this.scene.reactEvent) {
            this.scene.reactEvent.off('close-seed-encyclopedia');
        }
        this.scene.events.off('update', this.onSceneUpdate, this);
        super.destroy();
    }
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */