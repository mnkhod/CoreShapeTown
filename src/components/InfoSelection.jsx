import { useState, useEffect, useRef, useCallback } from 'react';
import InfoDetails from './InfoDetails';
import ProgressionBridge from './ProgressionBridge';

const createPlantProgressionData = () => {
  const progressionData = {};
  
  const seeds = [
    'seed_bokchok', 'seed_broccoli', 'seed_carrot', 'seed_cauliflower', 'seed_chili',
    'seed_corn', 'seed_eggplant', 'seed_garlic', 'seed_greenbean', 'seed_parsnip',
    'seed_potato', 'seed_pumpkin', 'seed_radish', 'seed_red_cabbage', 'seed_artichoke',
    'seed_blueberry', 'seed_coffee', 'seed_grape', 'seed_melon', 'seed_strawberry',
    'seed_tomato'
  ];
  
  seeds.forEach(seedId => {
    progressionData[seedId] = {
      plantCount: 0,
      tier: 5,
      maxTier: 5,
      facts: [
        "Basic information about this plant.",
        "This plant has special growing requirements.",
        "Interesting historical fact about this plant.",
        "Culinary uses for this plant.",
        "Advanced growing techniques for this plant."
      ]
    };
  });
  
  progressionData.calculateOverallLevel = () => {
    let totalTiers = 0;
    
    seeds.forEach(seedId => {
      totalTiers += progressionData[seedId].tier;
    });
    
    return totalTiers;
  };
  
  progressionData.calculateTierProgress = (seedId) => {
    const data = progressionData[seedId];
    
    const thresholds = [0, 5, 15, 30, 50];
    
    if (data.tier >= data.maxTier) {
      return 100;
    }
    
    const currentThreshold = thresholds[data.tier - 1];
    const nextThreshold = thresholds[data.tier];
    const plantsNeeded = nextThreshold - currentThreshold;
    const progress = Math.min(100, Math.floor(((data.plantCount - currentThreshold) / plantsNeeded) * 100));
    
    return progress;
  };
  
  return progressionData;
};

const SeedSelector = ({ onClose }) => {
  const [progression, setProgression] = useState(() => {
    if (window.plantProgressionSystem) {
      return window.plantProgressionSystem;
    }
    
    const newProgression = createPlantProgressionSystem();
    newProgression.loadFromStorage();
    
    window.plantProgressionSystem = newProgression;
    
    return newProgression;
  });
  
  const handleProgressionUpdate = useCallback((data) => {
    console.log('Progression update received in SeedSelector', data);
    
    if (data.walletChanged) {
      console.log('Wallet changed, forcing full UI update');
      // Force a complete re-render
      setProgression({...window.plantProgressionSystem});
      setSelectedSeed(null);
      setHoveredSeed(null);
      setShowDetails(false);
    } else {
      setProgression(prev => ({...prev}));
    }
    
    setOverallLevel(window.plantProgressionSystem.calculateOverallLevel());
  }, []);
  
  const seeds = [
    {
      id: 'seed_bokchok',
      name: 'Bok chok seeds',
      iconPath: '/assets/InventoryIcons/crops-bokchok.png',
      buyPrice: 40,
      sellPrice: 20,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_broccoli',
      name: 'Broccoli seeds',
      iconPath: '/assets/InventoryIcons/crops-broccoli.png',
      buyPrice: 55,
      sellPrice: 30,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_carrot',
      name: 'Carrot seeds',
      iconPath: '/assets/InventoryIcons/crops-carrot.png',
      buyPrice: 10,
      sellPrice: 5,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_cauliflower',
      name: 'Cauliflower seeds',
      iconPath: '/assets/InventoryIcons/crops-cauliflower.png',
      buyPrice: 30,
      sellPrice: 10,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_chili',
      name: 'Chili seeds',
      iconPath: '/assets/InventoryIcons/crops-chili.png',
      buyPrice: 70,
      sellPrice: 35,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_corn',
      name: 'Corn seeds',
      iconPath: '/assets/InventoryIcons/crops-corn.png',
      buyPrice: 50,
      sellPrice: 25,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_eggplant',
      name: 'Eggplant seeds',
      iconPath: '/assets/InventoryIcons/crops-eggplant.png',
      buyPrice: 65,
      sellPrice: 30,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_garlic',
      name: 'Garlic seeds',
      iconPath: '/assets/InventoryIcons/crops-garlic.png',
      buyPrice: 35,
      sellPrice: 15,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_greenbean',
      name: 'Greenbean seeds',
      iconPath: '/assets/InventoryIcons/crops-green bean.png',
      buyPrice: 25,
      sellPrice: 10,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_parsnip',
      name: 'Parsnip seeds',
      iconPath: '/assets/InventoryIcons/crops-parsnip.png',
      buyPrice: 12,
      sellPrice: 5,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_potato',
      name: 'Potato seeds',
      iconPath: '/assets/InventoryIcons/crops-potato.png',
      buyPrice: 20,
      sellPrice: 10,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_pumpkin',
      name: 'Pumpkin seeds',
      iconPath: '/assets/InventoryIcons/crops-pumpkin.png',
      buyPrice: 125,
      sellPrice: 50,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_radish',
      name: 'Radish seeds',
      iconPath: '/assets/InventoryIcons/crops-radish.png',
      buyPrice: 15,
      sellPrice: 5,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_red_cabbage',
      name: 'Red Cabbage seeds',
      iconPath: '/assets/InventoryIcons/crops-red cabagge.png',
      buyPrice: 45,
      sellPrice: 20,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_artichoke',
      name: 'Artichoke seeds',
      iconPath: '/assets/InventoryIcons/crops-artichoke.png',
      buyPrice: 180,
      sellPrice: 90,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_blueberry',
      name: 'Blueberry seeds',
      iconPath: '/assets/InventoryIcons/crops-blueberry.png',
      buyPrice: 110,
      sellPrice: 50,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_coffee',
      name: 'Coffee Bean seeds',
      iconPath: '/assets/InventoryIcons/crops-coffee.png',
      buyPrice: 200,
      sellPrice: 100,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_grape',
      name: 'Grape seeds',
      iconPath: '/assets/InventoryIcons/crops-grape.png',
      buyPrice: 140,
      sellPrice: 70,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_melon',
      name: 'Melon seeds',
      iconPath: '/assets/InventoryIcons/crops-melon.png',
      buyPrice: 160,
      sellPrice: 80,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_strawberry',
      name: 'Strawberry seeds',
      iconPath: '/assets/InventoryIcons/crops-strawberry.png',
      buyPrice: 100,
      sellPrice: 50,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_tomato',
      name: 'Tomato seeds',
      iconPath: '/assets/InventoryIcons/crops-tomato.png',
      buyPrice: 60,
      sellPrice: 30,
      description: 'Crop Seed',
      category: 'seeds'
    }
  ];
  
  const seedsWithProgression = seeds.map(seed => ({
    ...seed,
    progressionData: progression.data[seed.id] || { tier: 0, plantCount: 0 }
  }));
  
  const componentRef = useRef(null);
  const [selectedSeed, setSelectedSeed] = useState(null);
  const [hoveredSeed, setHoveredSeed] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [overallLevel, setOverallLevel] = useState(() => progression.calculateOverallLevel());
  
  useEffect(() => {
    const handleWalletChange = () => {
      console.log('Wallet changed event detected in SeedSelector');
      if (window.plantProgressionSystem) {
        window.plantProgressionSystem.loadFromStorage();
        setProgression({...window.plantProgressionSystem});
        setOverallLevel(window.plantProgressionSystem.calculateOverallLevel());
        setSelectedSeed(null);
        setHoveredSeed(null);
        setShowDetails(false);
      }
    };
    
    window.addEventListener('wallet-changed', handleWalletChange);
    
    return () => {
      window.removeEventListener('wallet-changed', handleWalletChange);
    };
  }, []);

  const handleMouseLeave = () => {
    setHoveredSeed(null);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (componentRef.current && !componentRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleSeedClick = (seed) => {
    const freshProgData = window.plantProgressionSystem ? 
      window.plantProgressionSystem.data[seed.id] : null;
    
    const seedWithProgressionData = {
      ...seed,
      progressionData: freshProgData || progression.data[seed.id] || { tier: 0, plantCount: 0 }
    };
    
    setSelectedSeed(seedWithProgressionData);
    setShowDetails(true);
  };
  
  const handleSeedHover = (seed) => {
    setHoveredSeed(seed);
  };
  
  const handleBackFromDetails = () => {
    setShowDetails(false);
  };
  
  const getProgressBarWidth = (seedId) => {
    if (!hoveredSeed) return 0;
    return progression.calculateTierProgress(seedId);
  };

  if (showDetails && selectedSeed) {
    return (
      <>
        <ProgressionBridge onProgressionUpdate={handleProgressionUpdate} />
        <InfoDetails 
          seed={selectedSeed} 
          onClose={onClose} 
          onBack={handleBackFromDetails} 
          progression={progression}
          overallLevel={overallLevel}
        />
      </>
    );
  }

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 font-malio" 
      onMouseLeave={handleMouseLeave}
    >
      <ProgressionBridge onProgressionUpdate={handleProgressionUpdate} />
      
      <div 
        ref={componentRef}
        className="relative w-full max-w-3xl mx-auto"
      >
        <div 
          className="relative"
          style={{
            backgroundImage: `url('/assets/hud/Wiki/InventoryBackground.png')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '800px',
            height: '500px',
            imageRendering: 'pixelated',
            margin: '0 auto'
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-9 right-1 z-10"
            style={{
              width: '30px',
              height: '30px',
              cursor: 'pointer'
            }}
          >
            <img 
              src="/assets/files/image 35.png"
              alt="Close"
              className="w-full h-full"
              style={{ imageRendering: 'pixelated' }}
            />
          </button>
          
          <div className="flex justify-center pt-20 px-12">
            {/* Left side */}
            <div className="w-3/5 pr-4">
              <div 
                className="grid grid-cols-4 gap-4 h-80 overflow-y-auto overflow-x-hidden pr-2"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#8B4513 transparent',
                  maskImage: 'linear-gradient(to bottom, transparent, black 1%, black 99%, transparent)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 1%, black 99%, transparent)'
                }}
              >
                {seedsWithProgression.map((seed) => (
                  <button 
                    key={seed.id} 
                    className="w-16 h-16 flex items-center justify-center hover:opacity-80 transition-opacity relative"
                    style={{
                      backgroundImage: `url('/assets/hud/Wiki/seed_slot_lighter.png')`,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      imageRendering: 'pixelated'
                    }}
                    onClick={() => handleSeedClick(seed)}
                    onMouseEnter={() => handleSeedHover(seed)}
                  >
                    <img 
                      src={seed.iconPath} 
                      alt={seed.name} 
                      className="-ml-2 -mt-2 w-12 h-12 object-contain" 
                      style={{ imageRendering: 'pixelated' }}
                    />
                    
                    <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 rounded-full w-5 h-5 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{seed.progressionData.tier}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Right side */}
            <div className="w-2/5">
              <div 
                className="w-[90%] h-80 flex flex-col items-center justify-center text-center px-4"
                style={{
                  backgroundImage: `url('/assets/hud/Wiki/Background_Picture.png')`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  imageRendering: 'pixelated'
                }}
              >
                {hoveredSeed ? (
                  <div className="flex flex-col items-center justify-start w-full h-full py-6">
                    <h3 className="text-black text-lg font-bold mb-1">{hoveredSeed.name}</h3>
                    
                    <img 
                      src={hoveredSeed.iconPath} 
                      alt={hoveredSeed.name} 
                      className="w-24 h-24 object-contain my-2" 
                      style={{ imageRendering: 'pixelated' }}
                    />
                    
                    {/* Price */}
                    <div className="flex items-center mt-1">
                      <img 
                        src="/assets/Icon/IconGoldCoin.png" 
                        alt="Gold" 
                        className="w-5 h-5 mr-1"
                        style={{ imageRendering: 'pixelated' }}
                      />
                      <span className="text-yellow-500 font-bold">{hoveredSeed.buyPrice}</span>
                    </div>
                    
                    <div className="mt-4 text-xs text-gray-800">
                      <div className="flex justify-between w-full">
                        <span>Tier: {hoveredSeed.progressionData.tier}/5</span>
                        <span>Planted: {hoveredSeed.progressionData.plantCount}</span>
                      </div>
                      
                      <div className="w-full mt-2 relative h-4 bg-gray-300 rounded-full overflow-hidden">
                        <div 
                          className="absolute top-0 left-0 h-full bg-green-500"
                          style={{ width: `${getProgressBarWidth(hoveredSeed.id)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <span className="text-gray-600 text-xs mt-auto mb-1">Click to view details</span>
                  </div>
                ) : (
                  <div className="text-black text-lg font-pixel mb-12">
                    Select a seed to view details
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeedSelector;