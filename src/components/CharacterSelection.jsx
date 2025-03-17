import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { characterConfig } from "./CharacterConfig";

const CharacterCustomizer = () => {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState('Player');
  const backgroundMusicRef = useRef(null);
  
  const options = {
    skin: characterConfig.skin.getOptions(),
    hair: characterConfig.hair.getOptions(),
    clothing: characterConfig.clothing.getOptions()
  };

  const [customization, setCustomization] = useState({
    skin: options.skin[0],
    hair: options.hair[2],
    clothing: options.clothing[0]
  });
  
  const spriteSheetMap = [0, 2, 1, 3];
  const [direction, setDirection] = useState(0);

  const SPRITE_SIZE = 24;
  const SPRITE_SCALE = 10;
  const ROWS = 4;
  const COLS = 6;

  useEffect(() => {
    const openSound = new Audio("/assets/SFX/Theme song/Main menu/Main_Menu_Open.mp3");
    
    const backgroundMusic1 = new Audio("/assets/SFX/Theme song/Main menu/Main_Menu_Loop.mp3");
    const backgroundMusic2 = new Audio("/assets/SFX/Theme song/Main menu/Main_Menu_Loop.mp3");
    backgroundMusic1.volume = 0.5;
    backgroundMusic2.volume = 0.5;
    
    let currentBackgroundMusic = backgroundMusic1;
    let nextBackgroundMusic = backgroundMusic2;
    
    backgroundMusicRef.current = backgroundMusic1;
    
    window.menuBackgroundMusic1 = backgroundMusic1;
    window.menuBackgroundMusic2 = backgroundMusic2;
    
    const handleLoopTransition = () => {
      nextBackgroundMusic.currentTime = 0;
      nextBackgroundMusic.play();
      
      const temp = currentBackgroundMusic;
      currentBackgroundMusic = nextBackgroundMusic;
      nextBackgroundMusic = temp;
    };
    
    const setupNextLoop = () => {
      const buffer = 0.05;
      const duration = currentBackgroundMusic.duration;
      if (duration && duration > buffer) {
        setTimeout(() => {
          handleLoopTransition();
          setupNextLoop();
        }, (duration - buffer) * 1000);
      }
    };

    const playOpeningSound = () => {
      openSound.play().catch(error => {
        console.warn("Opening sound playback was prevented:", error);
        currentBackgroundMusic.play().then(() => {
          setupNextLoop();
        }).catch(e => console.warn("Loop playback was also prevented:", e));
      });
    };
    
    openSound.addEventListener('ended', () => {
      currentBackgroundMusic.play().then(() => {
        setupNextLoop();
      }).catch(error => {
        console.warn("Loop playback was prevented:", error);
      });
    });
    
    playOpeningSound();
    
    document.addEventListener('click', () => {
      if (openSound.paused && currentBackgroundMusic.paused) {
        playOpeningSound();
      }
    }, { once: true });

    return () => {
      openSound.pause();
      openSound.currentTime = 0;
      openSound.removeEventListener('ended', () => {});
    };
  }, []);

  const handleNameChange = (e) => {
    const value = e.target.value.slice(0, 12);
    setPlayerName(value);
  };

  const cycleOption = (category, forward = true) => {
    const currentIndex = options[category].indexOf(customization[category]);
    let newIndex;
    
    if (forward) {
      newIndex = (currentIndex + 1) % options[category].length;
    } else {
      newIndex = (currentIndex - 1 + options[category].length) % options[category].length;
    }

    setCustomization(prev => ({
      ...prev,
      [category]: options[category][newIndex]
    }));
  };

  const rotateCharacter = (clockwise) => {
    setDirection((prev) => {
      if (clockwise) {
        return (prev + 1) % 4;
      } else {
        return (prev - 1 + 4) % 4;
      }
    });
  };

  // No toggle function needed

  const SpriteLayer = ({ src, alt }) => (
    <div 
      className="absolute overflow-hidden"
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${SPRITE_SCALE})`,
        width: `${SPRITE_SIZE}px`,
        height: `${SPRITE_SIZE}px`,
        imageRendering: 'pixelated'
      }}
    >
      <div
        style={{
          width: `${SPRITE_SIZE * COLS}px`,
          height: `${SPRITE_SIZE * ROWS}px`,
          background: `url(/assets/Character/Walking/${src === 'PlayerWalking_V01.png' || src === 'PlayerWalking_V02.png' || src === 'PlayerWalking_V03.png' ? 
            'BaseModel/' : src.startsWith('PlayerHairWalking') ? 
            'Hair/' : 'Clothing/'}${src})`,
          backgroundPosition: `0 -${spriteSheetMap[direction] * SPRITE_SIZE}px`,
          backgroundSize: '100% 100%',
          imageRendering: 'pixelated'
        }}
      />
    </div>
  );

  const CustomizationOption = ({ category, value }) => (
    <div className="flex items-center justify-between w-full mb-4 font-malio text-xs">
      <button 
        onClick={() => cycleOption(category, false)}
        className="w-8 h-8 flex items-center justify-center"
      >
        <img src="/assets/hud/Customize/leftArrow.png" alt="Previous" className="w-full h-full" />
      </button>
      <div 
        className="px-6 py-2 font-bold text-black min-w-48 text-center bg-center bg-no-repeat bg-contain"
        style={{
          backgroundImage: "url('/assets/hud/Customize/selectionBackground.png')",
          minHeight: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {category === 'skin' ? `SKIN ${options[category].indexOf(value) + 1}` : 
         category === 'hair' ? `HAIR STYLE ${options[category].indexOf(value) + 1}` :
         `OUTFIT ${options[category].indexOf(value) + 1}`}
      </div>
      <button 
        onClick={() => cycleOption(category, true)}
        className="w-8 h-8 flex items-center justify-center"
      >
        <img src="/assets/hud/Customize/rightArrow.png" alt="Next" className="w-full h-full" />
      </button>
    </div>
  );

  return (
    <div 
      className="min-h-screen flex items-center justify-center font-malio"
      style={{
        backgroundImage: "url('/assets/hud/Customize/CharacterSelectFrame.png')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#2d2d2d"
      }}
    >
      {/* No audio controls */}

      <div className="flex gap-8 p-8">
        <div className="flex flex-col w-64">
          <div className="mb-4">
            <div className="text-white font-bold mb-2 text-center">NAME</div>
            <div 
              className="relative"
              style={{
                backgroundImage: "url('/assets/hud/Customize/selectionBackground.png')",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                padding: "2px"
              }}
            >
              <input
                type="text"
                value={playerName}
                onChange={handleNameChange}
                className="w-full px-4 py-2 bg-transparent font-bold text-black text-center"
                placeholder="Enter name..."
                maxLength={12}
              />
            </div>
          </div>
          <div className="text-white font-bold mb-2 text-center">SKIN</div>
          <CustomizationOption 
            category="skin"
            value={customization.skin}
          />
          <div className="text-white font-bold mb-2 text-center">HAIR</div>
          <CustomizationOption 
            category="hair"
            value={customization.hair}
          />
          <div className="text-white font-bold mb-2 text-center">CLOTHING</div>
          <CustomizationOption 
            category="clothing"
            value={customization.clothing}
          />
        </div>

        <div className="flex flex-col items-center">
          <div className="relative w-[200px] h-[200px] rounded-lg mb-4 flex items-center justify-center">
            <div className="absolute transform translate-x-4 translate-y-4" style={{ 
              width: `${SPRITE_SIZE * SPRITE_SCALE}px`, 
              height: `${SPRITE_SIZE * SPRITE_SCALE}px`
            }}>
              <SpriteLayer src={customization.skin} alt="base" />
              <SpriteLayer src={customization.hair} alt="hair" />
              <SpriteLayer src={customization.clothing} alt="clothing" />
            </div>
            
            <button 
              onClick={() => rotateCharacter(false)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center"
            >
              <img src="/assets/hud/Customize/leftArrow.png" alt="Rotate Left" className="w-full h-full" />
            </button>
            <button 
              onClick={() => rotateCharacter(true)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center"
            >
              <img src="/assets/hud/Customize/rightArrow.png" alt="Rotate Right" className="w-full h-full" />
            </button>
          </div>

          <button 
            onClick={() => {
              const savedData = {
                skin: customization.skin.replace('PlayerWalking_', '').split('.')[0],
                hair: customization.hair.replace('PlayerHairWalking_', '').split('.')[0],
                clothing: customization.clothing.replace('CharacterOutfit_', '').split('.')[0],
                playerName: playerName.trim() || 'Player'
              };
              localStorage.setItem('playerCustomization', JSON.stringify(savedData));
              navigate('/game');
            }}
            className="w-full py-3 bg-green-500 rounded-lg text-white font-bold hover:bg-green-600 tracking-wider"
          >
            PLAY
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterCustomizer;