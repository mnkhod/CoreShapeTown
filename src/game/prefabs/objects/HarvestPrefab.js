// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
const CROP_DATA = {
    "CARROT": {
        type: "Vegetable",
        seedPrice: 10,
        sellingPrice: 25,
        growthDays: 2,
        growthMinutes: 10,
        tier: "common",
        spritesheet: "Crop_Cycle_Carrot",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-carrot",
        seedAsset: "crops-seed bags-carrot",
        displayName: "Carrot"
    },
    "BOKCHOK": {
        type: "Vegetable",
        seedPrice: 40,
        sellingPrice: 80,
        growthDays: 3,
        growthMinutes: 10,
        tier: "Uncommon",
        spritesheet: "Crop_Cycle_Bokchok",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-bokchok",
        seedAsset: "crops-seed bags-bokchok",
        displayName: "Bok Chok"
    },
    "BROCCOLI": {
        type: "Vegetable",
        seedPrice: 55,
        sellingPrice: 110,
        growthDays: 4,
        growthMinutes: 10,
        tier: "Rare",
        spritesheet: "Crop_Cycle_Broccoli",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-broccoli",
        seedAsset: "crops-seed bags-broccoli",
        displayName: "Broccoli"
    },
    "WHEAT": {
        type: "Vegetable",
        seedPrice: 15,
        sellingPrice: 30,
        growthDays: 2,
        growthMinutes: 10,
        tier: "common",
        spritesheet: "Crop_Cycle_Wheat",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-wheat",
        seedAsset: "crops-seed bags-wheat",
        displayName: "Wheat"
    },
    "POTATO": {
        type: "Vegetable",
        seedPrice: 20,
        sellingPrice: 40,
        growthDays: 3,
        growthMinutes: 10,
        tier: "common",
        spritesheet: "Crop_Cycle_Potato",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-potato",
        seedAsset: "crops-seed bags-potato",
        displayName: "Potato"
    },
    "CAULIFLOWER": {
        type: "Vegetable",
        seedPrice: 30,
        sellingPrice: 60,
        growthDays: 3,
        growthMinutes: 10,
        tier: "Uncommon",
        spritesheet: "Crop_Cycle_Cauliflower",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-cauliflower",
        seedAsset: "crops-seed bags-cauliflower",
        displayName: "Cauliflower"
    },
    "CHILI": {
        type: "Vegetable",
        seedPrice: 70,
        sellingPrice: 140,
        growthDays: 3,
        growthMinutes: 10,
        tier: "Rare",
        spritesheet: "Crop_Cycle_Chili",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-chili",
        seedAsset: "crops-seed bags-chili",
        displayName: "Chili"
    },
    "CORN": {
        type: "Vegetable",
        seedPrice: 50,
        sellingPrice: 100,
        growthDays: 5,
        growthMinutes: 10,
        tier: "Rare",
        spritesheet: "Crop_Cycle_Corn",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-corn",
        seedAsset: "crops-seed bags-corn",
        displayName: "Corn"
    },
    "EGGPLANT": {
        type: "Vegetable",
        seedPrice: 65,
        sellingPrice: 130,
        growthDays: 5,
        growthMinutes: 10,
        tier: "Rare",
        spritesheet: "Crop_Cycle_EggPlant",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-eggplant",
        seedAsset: "crops-seed bags-eggplant",
        displayName: "Eggplant"
    },
    "GREENBEAN": {
        type: "Vegetable",
        seedPrice: 25,
        sellingPrice: 50,
        growthDays: 4,
        growthMinutes: 10,
        tier: "Uncommon",
        spritesheet: "Crop_Cycle_Greenbean",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-green bean",
        seedAsset: "crops-seed bags-greenbean",
        displayName: "Green Bean"
    },
    "PARSNIP": {
        type: "Vegetable",
        seedPrice: 12,
        sellingPrice: 24,
        growthDays: 2,
        growthMinutes: 10,
        tier: "common",
        spritesheet: "Crop_Cycle_Parsnip",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-parsnip",
        seedAsset: "crops-seed bags-parsnip",
        displayName: "Parsnip"
    },
    "PUMPKIN": {
        type: "Vegetable",
        seedPrice: 125,
        sellingPrice: 250,
        growthDays: 6,
        growthMinutes: 10,
        tier: "Very Rare",
        spritesheet: "Crop_Cycle_Pumpkin",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-pumpkin",
        seedAsset: "crops-seed bags-pumpkin",
        displayName: "Pumpkin"
    },
    "RADISH": {
        type: "Vegetable",
        seedPrice: 15,
        sellingPrice: 30,
        growthDays: 1,
        growthMinutes: 10,
        tier: "common",
        spritesheet: "Crop_Cycle_Radish",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-radish",
        seedAsset: "crops-seed bags-radish",
        displayName: "Radish"
    },
    "RED_CABBAGE": {
        type: "Vegetable",
        seedPrice: 45,
        sellingPrice: 90,
        growthDays: 4,
        growthMinutes: 10,
        tier: "Uncommon",
        spritesheet: "Crop_Cycle_RedCabagge",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-red cabagge",
        seedAsset: "crops-seed bags-redcabbage",
        displayName: "Red Cabbage"
    },
    "GARLIC": {
        type: "Vegetable",
        seedPrice: 35,
        sellingPrice: 70,
        growthDays: 3,
        growthMinutes: 10,
        tier: "Uncommon",
        spritesheet: "Crop_Cycle_Garlic",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-garlic",
        seedAsset: "crops-seed bags-garlic",
        displayName: "Garlic"
    },
    "GRAPE": {
        type: "Fruit",
        seedPrice: 60,
        sellingPrice: 120,
        growthDays: 5,
        growthMinutes: 10,
        tier: "Rare",
        spritesheet: "Fruit_Cycle_Grape",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-grape",
        seedAsset: "crops-seed bags-grape",
        displayName: "Grape"
    },
    "MELON": {
        type: "Fruit",
        seedPrice: 80,
        sellingPrice: 160,
        growthDays: 5,
        growthMinutes: 10,
        tier: "Rare",
        spritesheet: "Fruit_Cycle_Melon",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-melon",
        seedAsset: "crops-seed bags-melon",
        displayName: "Melon"
    },
    "COFFEE": {
        type: "Fruit",
        seedPrice: 75,
        sellingPrice: 150,
        growthDays: 4,
        growthMinutes: 10,
        tier: "Rare",
        spritesheet: "Fruit_Cycle_Coffee",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-coffee",
        seedAsset: "crops-seed bags-coffee",
        displayName: "Coffee Bean"
    },
    "BLUEBERRY": {
        type: "Fruit",
        seedPrice: 50,
        sellingPrice: 100,
        growthDays: 4,
        growthMinutes: 10,
        tier: "Uncommon",
        spritesheet: "Fruit_Cycle_Blueberry",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-blueberry",
        seedAsset: "crops-seed bags-blueberry",
        displayName: "Blueberry"
    },
    "STRAWBERRY": {
        type: "Fruit",
        seedPrice: 60,
        sellingPrice: 120,
        growthDays: 4,
        growthMinutes: 10,
        tier: "Uncommon",
        spritesheet: "Fruit_Cycle_Strawberry",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-strawberry",
        seedAsset: "crops-seed bags-strawberry",
        displayName: "Strawberry"
    },
    "TOMATO": {
        type: "Fruit",
        seedPrice: 45,
        sellingPrice: 90,
        growthDays: 3,
        growthMinutes: 10,
        tier: "Uncommon",
        spritesheet: "Fruit_Cycle_Tomato",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-tomato",
        seedAsset: "crops-seed bags-tomato",
        displayName: "Tomato"
    },
    "ARTICHOKE": {
        type: "Vegetable",
        seedPrice: 40,
        sellingPrice: 80,
        growthDays: 3,
        growthMinutes: 10,
        tier: "Uncommon",
        spritesheet: "Fruit_Cycle_Artichoke",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-artichoke",
        seedAsset: "crops-seed bags-artichoke",
        displayName: "Artichoke"
    },
    "WHEAT": {
        type: "Vegetable",
        seedPrice: 10,
        sellingPrice: 20,
        growthDays: 2,
        growthMinutes: 10,
        tier: "Common",
        spritesheet: "Crop_Cycle_Wheat",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-wheat",
        seedAsset: "crops-seed bags-wheat",
        displayName: "Wheat"
    }
};
/* END-USER-IMPORTS */

export default class HarvestPrefab extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x ?? 16, y ?? 16, texture || "__DEFAULT", frame);

        /* START-USER-CTR-CODE */
        // Write your code here.
        scene.events.on('create', this.prefabCreateCycle, this);
        this.setInteractive({ useHandCursor: true });

        scene.physics.world.enable(this);
        this.physicsBody = this.body;
        
        if (this.physicsBody) {
            this.physicsBody.setImmovable(true);
            this.physicsBody.enable = false;
        }

        this.previousState = null;
        this.tileId = null;
        this.growthTimer = null;
        this.growthStage = 0;
        this.growthStartTime = null;
        this.growthText = null;
        this.textBackground = null;
        this.plantSprite = null;
        
        this.on('destroy', () => {
            if (this.growthText && this.growthText.destroy) {
                this.growthText.destroy();
            }
            if (this.plantSprite && this.plantSprite.destroy) {
                this.plantSprite.destroy();
            }
        });
        /* END-USER-CTR-CODE */
    }

    /** @type {string} */
    state = "ROCK";
    state = "SHELL"
    seed = "CARROT";
    isReadyForHarvest = false;
    isWatered = false;

    /* START-USER-CODE */

    prefabCreateCycle() {
        this.setupBasedOnState();
    
        this.on('pointerover', () => {
            this.preFX.addGlow(16777215, 4, 0, false);
            this.showGrowthInfo();
        }, this);
    
        this.on('pointerout', () => {
            this.preFX.clear();
            this.hideGrowthInfo();
        }, this);
    
        this.on('pointerdown', function (_pointer) {
            if (!this.scene.playerPrefab) throw Error("Scene doesnt have playerPrefab");
    
            let distance = this.getDistance(this.scene.playerPrefab, this);
    
            if (distance > 80) {
                this.scene.alertPrefab.alert("Too Far");
                return;
            }
    
            if (this.isWatered && this.isReadyForHarvest == false) {
                this.scene.alertPrefab.alert("Already Watered");
                return;
            }
    
            if (this.isReadyForHarvest) {
                const cropData = CROP_DATA[this.seed];
                const harvestAsset = cropData ? cropData.harvestAsset : `crops-${this.seed.toLowerCase()}`;
                
                this.hideGrowthInfo();
                
                this.scene.newItemHudPrefab.addItem(this.seed, harvestAsset, 0, 1, true);
                
                console.log("Harvesting crop:", this.seed);
                
                this.updatePlantProgression(this.seed);
                
                if (this.scene.triggerQuestEvent) {
                    console.log("Triggering harvest quest event");
                    this.scene.triggerQuestEvent('harvest:cropHarvested', { crop: this.seed, harvest: this });
                } else {
                    console.log("triggerQuestEvent not available");
                }
                
                this.isReadyForHarvest = false;
                this.isWatered = false;
                this.growthStage = 0;
                this.growthStartTime = null;
                this.state = "SOIL";
                this.setupBasedOnState();
                return;
            }
    
            this.changeState();
        }, this);
    }

    updatePlantProgression(seedName) {
        const formattedSeedId = "seed_" + seedName.toLowerCase();
        if (!window.plantProgressionSystem) {
            console.log("Creating new plant progression system");
            if (typeof createPlantProgressionSystem === 'function') {
                window.plantProgressionSystem = createPlantProgressionSystem();
            } else {
                window.plantProgressionSystem = {
                    data: {},
                    addPlantedCount: function(seedId, count) {
                        if (!this.data[seedId]) {
                            this.data[seedId] = { plantCount: 0, tier: 0 };
                        }
                        
                        const oldTier = this.data[seedId].tier;
                        this.data[seedId].plantCount += count;
                        
                        const thresholds = [0, 5, 15, 30, 50];
                        for (let i = this.data[seedId].tier; i < 5; i++) {
                            if (this.data[seedId].plantCount >= thresholds[i]) {
                                this.data[seedId].tier = i + 1;
                            } else {
                                break;
                            }
                        }
                        
                        return this.data[seedId].tier > oldTier;
                    },
                    saveToStorage: function() {
                        try {
                            const walletAddress = window.ethereum && window.ethereum.selectedAddress ? 
                                window.ethereum.selectedAddress : '';
                            const keyPrefix = walletAddress ? 
                                `plantProgression_${walletAddress}` : 'plantProgression';
                                
                            localStorage.setItem(`${keyPrefix}_data`, JSON.stringify(this.data));
                        } catch (e) {
                            console.error('Failed to save progression data', e);
                        }
                    },
                    loadFromStorage: function() {
                        try {
                            const walletAddress = window.ethereum && window.ethereum.selectedAddress ? 
                                window.ethereum.selectedAddress : '';
                            const keyPrefix = walletAddress ? 
                                `plantProgression_${walletAddress}` : 'plantProgression';
                                
                            const savedData = localStorage.getItem(`${keyPrefix}_data`);
                            if (savedData) {
                                this.data = JSON.parse(savedData);
                                return true;
                            }
                        } catch (e) {
                            console.error('Failed to load progression data', e);
                        }
                        return false;
                    }
                };
            }
            
            window.plantProgressionSystem.loadFromStorage();
        }
        
        const tierIncreased = window.plantProgressionSystem.addPlantedCount(formattedSeedId, 1);
        window.plantProgressionSystem.saveToStorage();
        
        if (tierIncreased && this.scene.alertPrefab) {
            const tier = window.plantProgressionSystem.data[formattedSeedId].tier;
            this.scene.alertPrefab.alert(`Encyclopedia: ${seedName.toLowerCase()} knowledge increased to Tier ${tier}!`);
        }
        
        if (window.EventBus) {
            console.log("Emitting plant-grown event via EventBus");
            window.EventBus.emit("plant-grown", { 
                seedId: formattedSeedId,
                phaserInstance: this.scene
            });
        }
        
        if (this.scene.reactEvent) {
            console.log("Emitting plant-grown event via scene.reactEvent");
            this.scene.reactEvent.emit("plant-grown", {
                seedId: formattedSeedId,
                phaserInstance: this.scene
            });
        }
        
        if (this.scene.alertPrefab) {
            this.scene.alertPrefab.alert(`Harvested ${seedName.toLowerCase()}!`);
        }
    }
    setupBasedOnState() {
        let timer = this.scene.time;

        switch (this.state) {
            case "ROCK":
                this.setTexture("GroundAccessor", this.getRandomInt(12, 21));
                if (this.physicsBody) {
                    this.physicsBody.enable = true;
                    this.physicsBody.setSize(32, 32);
                    if (this.scene.playerPrefab && !this.hasPlayerCollider) {
                        this.scene.physics.add.collider(this, this.scene.playerPrefab);
                        this.hasPlayerCollider = true;
                    }
                }
                if (this.plantSprite) {
                    this.plantSprite.setVisible(false);
                }
                break;

            case "SHELL":
                this.setTexture("ShellBeach_V01", this.getRandomInt(0, 1));
                if (this.physicsBody) {
                    this.physicsBody.enable = true;
                    this.physicsBody.setSize(32, 32);
                    if (this.scene.playerPrefab && !this.hasPlayerCollider) {
                        this.scene.physics.add.collider(this, this.scene.playerPrefab);
                        this.hasPlayerCollider = true;
                    }
                }
                if (this.plantSprite) {
                    this.plantSprite.setVisible(false);
                }
                break;
                
            case "GROUND":
                if (this.previousState === "ROCK") {
                    this.tileId = 83;
                } else {
                    const roll = Phaser.Math.RND.frac();
                    if (roll < 0.05) {
                        this.state = "ROCK";
                        this.setupBasedOnState();
                        return;
                    } else if (roll < 0.7) {
                        this.tileId = 34;
                    } else if (roll < 0.9) {
                        this.tileId = 83;
                    } else {
                        this.tileId = 89;
                    }
                }
                
                this.setTexture("GroundTileset_V02", this.tileId);
                if (this.physicsBody) {
                    this.physicsBody.enable = false;
                }
                if (this.plantSprite) {
                    this.plantSprite.setVisible(false);
                }
                break;

            case "GROUND_1":
                if (this.previousState === "SHELL") {
                    this.tileId = 175;
                } else {
                    const roll = Phaser.Math.RND.frac();
                    if (roll < 0.05) {
                        this.state = "SHELL";
                        this.setupBasedOnState();
                        return;
                    } else if (roll < 0.7) {
                        this.tileId = 34;
                    } else if (roll < 0.9) {
                        this.tileId = 83;
                    } else {
                        this.tileId = 89;
                    }
                }
                
                this.setTexture("BeachWaterSheet_v01", this.tileId);
                if (this.physicsBody) {
                    this.physicsBody.enable = false;
                }
                if (this.plantSprite) {
                    this.plantSprite.setVisible(false);
                }
                break;
                
            case "SOIL":
                this.setTexture("Farming_Soil_Tile_V01", 0);
                this.tileId = null;
                this.preFX.clear();
                if (this.plantSprite) {
                    this.plantSprite.setVisible(false);
                }
                break;
                
            case "PLANTED":
                this.setTexture("Farming_Soil_Tile_V01", 0);
                
                if (CROP_DATA[this.seed]) {
                    if (!this.plantSprite) {
                        this.plantSprite = this.scene.add.sprite(this.x, this.y, 
                            CROP_DATA[this.seed].spritesheet, 
                            CROP_DATA[this.seed].seedFrame);
                        this.plantSprite.setDepth(this.depth + 1);
                    } else {
                        this.plantSprite.setTexture(
                            CROP_DATA[this.seed].spritesheet, 
                            CROP_DATA[this.seed].seedFrame);
                        this.plantSprite.setVisible(true);
                    }
                } else if (this.plantSprite) {
                    this.plantSprite.setVisible(false);
                }
                break;
                
            case "WATERED":
                this.setTexture("Farming_Soil_Tile_V01", 0);
                
                if (CROP_DATA[this.seed]) {
                    if (!this.plantSprite) {
                        this.plantSprite = this.scene.add.sprite(this.x, this.y, 
                            CROP_DATA[this.seed].spritesheet, CROP_DATA[this.seed].seedFrame);
                        this.plantSprite.setDepth(this.depth + 1);
                    } else {
                        this.plantSprite.setTexture(CROP_DATA[this.seed].spritesheet, CROP_DATA[this.seed].seedFrame);
                        this.plantSprite.setVisible(true);
                    }
                }
                
                this.isWatered = true;
                this.growthStartTime = Date.now();
                this.growthStage = 0;
                
                let growthTimeMs = this.calculateGrowthTimeMs();
                const stageTime = growthTimeMs / 4;
                
                // Schedule growth stages
                this.scheduleGrowthStages(stageTime);
                break;
                
            default:
                if (this.state.includes("_LEVEL_")) {
                    this.setTexture("Farming_Soil_Tile_V01", 0);
                    
                    const cropData = CROP_DATA[this.seed];
                    if (cropData) {
                        const level = parseInt(this.state.split("_").pop());
                        
                        if (!this.plantSprite) {
                            this.plantSprite = this.scene.add.sprite(this.x, this.y, 
                                cropData.spritesheet, 
                                level <= 4 ? cropData.growthFrames[level-1] : cropData.harvestFrame);
                            this.plantSprite.setDepth(this.depth + 1);
                        } else {
                            this.plantSprite.setTexture(
                                cropData.spritesheet, 
                                level <= 4 ? cropData.growthFrames[level-1] : cropData.harvestFrame);
                            this.plantSprite.setVisible(true);
                        }
                        
                        if (level === 4) {
                            this.isReadyForHarvest = true;
                        }
                    }
                }
                break;
        }
    }

    calculateGrowthTimeMs() {
        if (!CROP_DATA[this.seed]) return 4000; // Default 4 seconds if data not found
        
        // For demo, we're scaling down the actual growth time
        // In a real game, you'd use the actual minutes/days
        // For testing, we'll use 1 second per "minute" in the data
        return CROP_DATA[this.seed].growthMinutes * 1000;
    }

    scheduleGrowthStages(stageTime) {
        let timer = this.scene.time;
        
        // First stage
        timer.delayedCall(stageTime, () => {
            this.state = `${this.seed}_LEVEL_1`;
            this.growthStage = 1;
            this.setupBasedOnState();
        }, {}, this);
        
        // Second stage
        timer.delayedCall(stageTime * 2, () => {
            this.state = `${this.seed}_LEVEL_2`;
            this.growthStage = 2;
            this.setupBasedOnState();
        }, {}, this);
        
        // Third stage
        timer.delayedCall(stageTime * 3, () => {
            this.state = `${this.seed}_LEVEL_3`;
            this.growthStage = 3;
            this.setupBasedOnState();
        }, {}, this);
        
        // Final stage
        timer.delayedCall(stageTime * 4, () => {
            this.state = `${this.seed}_LEVEL_4`;
            this.growthStage = 4;
            this.setupBasedOnState();
        }, {}, this);
    }

    showGrowthInfo() {
        this.hideGrowthInfo();
        
        const cropData = CROP_DATA[this.seed];
        
        if (!cropData && this.state !== "SOIL") return;
        
        const displayName = cropData ? cropData.displayName || this.seed : "";
        let textContent = '';
        let textColor = '#ffffff';
        
        if (this.isWatered && !this.isReadyForHarvest && this.growthStartTime) {
            const currentTime = Date.now();
            const elapsedTime = currentTime - this.growthStartTime;
            const totalGrowthTime = this.calculateGrowthTimeMs();
            const remainingTime = Math.max(0, totalGrowthTime - elapsedTime);
            
            const remainingSeconds = Math.ceil(remainingTime / 1000);
            const progressPercent = Math.min(100, Math.floor((elapsedTime / totalGrowthTime) * 100));
            
            let timeDisplay;
            if (remainingSeconds > 60) {
                const minutes = Math.floor(remainingSeconds / 60);
                const seconds = remainingSeconds % 60;
                timeDisplay = `${minutes}m ${seconds}s`;
            } else {
                timeDisplay = `${remainingSeconds}s`;
            }
            
            textContent = `${displayName}\n${progressPercent}% grown\n${timeDisplay} remaining`;
            textColor = '#ffffff';
        } else if (this.isReadyForHarvest) {
            const tierColors = {
                'common': '#ffffff',
                'Common': '#ffffff',
                'Uncommon': '#1eff00',
                'Rare': '#0070dd',
                'Very Rare': '#a335ee',
                'Special': '#ff8000'
            };
            
            textColor = tierColors[cropData.tier] || '#00ff00';
            textContent = `${displayName}\nReady to harvest!\n(${cropData.tier})`;
        } else if (this.state === "PLANTED") {
            textContent = `${displayName}\nNeeds water`;
            textColor = '#87cefa';
        }

        if (textContent) {
            this.textBackground = this.scene.add.graphics();
            this.textBackground.setDepth(100);
            
            this.growthText = this.scene.add.text(this.x, this.y - 40, textContent, {
                fontSize: '12px',
                color: textColor,
                stroke: '#000000',
                strokeThickness: 0.5,
                align: 'left',
                padding: { x: 6, y: 4 }
            });
            this.growthText.setDepth(101);
            this.growthText.setOrigin(0.5, 1);

            const bounds = this.growthText.getBounds();
            const padding = 10;
            const cornerRadius = 8;

            this.textBackground.clear();
            this.textBackground.fillStyle(0x000000, 0.6);
            this.textBackground.lineStyle(1, 0xffffff, 0.2);
            
            this.textBackground.fillRoundedRect(
                bounds.x - padding,
                bounds.y - padding,
                bounds.width + (padding * 2),
                bounds.height + (padding * 2),
                cornerRadius
            );
            
            this.textBackground.strokeRoundedRect(
                bounds.x - padding,
                bounds.y - padding,
                bounds.width + (padding * 2),
                bounds.height + (padding * 2),
                cornerRadius
            );
        }
    }

    hideGrowthInfo() {
        if (this.textBackground) {
            this.textBackground.destroy();
            this.textBackground = null;
        }
        if (this.growthText) {
            this.growthText.destroy();
            this.growthText = null;
        }
    }

    changeState() {
        let item = this.scene.newItemHudPrefab.selectedItem;
        let activeIndex = this.scene.newItemHudPrefab.activeIndex;
        
        if (activeIndex >= 0 && item === null) {
            this.scene.alertPrefab.alert("Empty Slot Selected");
            return;
        }
        
        if (item == null) {
            this.scene.alertPrefab.alert("No Selected Item");
            return;
        }
    
        switch (this.state) {
            case "ROCK":
                if (item != "ToolPickaxe") {
                    this.scene.alertPrefab.alert("Select Pick Axe");
                    break;
                }
                this.previousState = "ROCK";
                this.state = "GROUND";
                this.setupBasedOnState();
                break;
            case "SHELL":
                if (item != "ToolPickaxe") {
                    this.scene.alertPrefab.alert("Select Pick Axe");
                    break;
                }
                this.previousState = "SHELL";
                this.state = "GROUND";
                this.setupBasedOnState();
                break;
            case "GROUND":
                if (item != "ToolHoe") {
                    this.scene.alertPrefab.alert("Select Hoe");
                    break;
                }
                // if (this.tileId !== 83) {
                //     this.scene.alertPrefab.alert("Can't sow this ground!");
                //     break;
                // }
                this.state = "SOIL";
                this.setupBasedOnState();
                break;
            case "SOIL":
                if (!item.endsWith("_SEED") && !item.startsWith("seed_")) {
                    this.scene.alertPrefab.alert("Select Seed");
                    break;
                }
                let seedType;
                if (item.endsWith("_SEED")) {
                    seedType = item.replace("_SEED", "");
                } else if (item.startsWith("seed_")) {
                    seedType = item.replace("seed_", "").replace(/-/g, "_").toUpperCase();
                }
                if (!CROP_DATA[seedType]) {
                    this.scene.alertPrefab.alert("Unknown Seed Type");
                    break;
                }
                
                this.seed = seedType;
                this.scene.newItemHudPrefab.useItem(item);
    
                this.state = "PLANTED";
                this.setupBasedOnState();
                break;
            case "PLANTED":
                if (item != "ToolWateringCan") {
                    this.scene.alertPrefab.alert("Select Watering Can");
                    break;
                }
    
                this.state = "WATERED";
                this.setupBasedOnState();
                break;
            default:
                break;
        }
    }

    getRandomInt(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    }

    getDistance(texture1, texture2) {
        return Phaser.Math.Distance.Between(
            texture1.x,
            texture1.y,
            texture2.x,
            texture2.y
        );
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here