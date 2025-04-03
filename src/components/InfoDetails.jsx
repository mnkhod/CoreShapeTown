import { useEffect, useRef } from 'react';

const InfoDetails = ({ seed, onClose, onBack, progression, overallLevel }) => {
  const componentRef = useRef(null);
  
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

  if (!seed) return null;
  
  const seedProgression = seed.progressionData || { tier: 0, plantCount: 0 };
  
  const getDetailedFacts = (seedId, tier) => {
    if (tier <= 0) return [];
    
    const seedFacts = {
      'seed_bokchok': [
        "Bok Choy seeds germinate within three days, making them perfect for beginners seeking quick results.",
        "Bok Choy varieties include dwarf types ideal for container growing and full-sized plants for field production.",
        "Bok Choy contains high calcium levels, providing twice the nutritional benefit of other leafy greens.",
        "When Bok Choy bolts (flowers), its yellow blooms attract beneficial pollinators to your entire garden.",
        "Ancient Bok Choy varieties from mountain regions develop frost resistance and sweeter flavor at maturity."
      ],
      'seed_broccoli': [
        "Broccoli seeds germinate best at soil temperatures between 60-70°F.",
        "Broccoli seedlings develop stronger stems when hardened off before transplanting into garden beds.",
        "Broccoli heads are actually flower buds that should be harvested before yellow petals appear.",
        "After main broccoli head harvest, side shoots will develop, producing for several additional weeks.",
        "Calabrese broccoli varieties contain specialized compounds that activate natural health defense systems."
      ],
      'seed_carrot': [
        "Carrot seeds require consistent moisture until germination, which takes 14-21 days.",
        "Young carrot seedlings must be thinned to one inch apart to prevent twisted, stunted roots.",
        "Carrots develop straightest roots in loose, stone-free soil at least 12 inches deep.",
        "Different colored carrot varieties contain unique antioxidants: orange (beta-carotene), purple (anthocyanins), red (lycopene).",
        "Wild carrot ancestors contained higher concentrations of medicinal compounds but smaller, tougher roots."
      ],
      'seed_cauliflower': [
        "Cauliflower seeds need temperatures between 65-70°F for optimal germination.",
        "Young cauliflower plants develop best with consistent soil moisture and steady fertilization.",
        "Cauliflower heads must be protected from sunlight (blanched) to maintain white color and flavor.",
        "Self-blanching cauliflower varieties have leaves that naturally cover developing heads without tying.",
        "Romanesco cauliflower forms mathematically perfect Fibonacci spirals, maximizing sunlight absorption efficiency."
      ],
      'seed_chili': [
        "Pepper seeds germinate slowly, requiring warm soil (75-85°F) for successful sprouting.",
        "Pepper seed heat level is primarily determined by genetics rather than growing conditions.",
        "Cross-pollination between hot and sweet peppers can produce unpredictably spicy fruits in future generations.",
        "Ripened peppers contain up to twice the vitamin content of their unripe green counterparts.",
        "Ghost pepper seeds produce fruits with capsaicin concentrated in specialized blisters along interior membranes."
      ],
      'seed_corn': [
        "Corn seeds fail to germinate in soil below 50°F, often rotting instead of sprouting.",
        "Sweet corn varieties lose sugar content rapidly after harvesting due to active enzymes in kernels.",
        "Corn plants form prop roots from lower stem joints to support increasing height and weight.",
        "Each corn silk connects to a single potential kernel, requiring individual pollination for full ear development.",
        "Glass Gem corn produces naturally rainbow-colored kernels through complex genetic recombination without modification."
      ],
      'seed_eggplant': [
        "Eggplant seeds require consistently warm temperatures (75-85°F) for successful germination.",
        "Eggplant varieties range from tiny egg-shaped fruits to massive two-pound teardrops.",
        "Eggplant fruits turn bitter when mature seeds inside begin developing hard black coats.",
        "Male eggplant flowers often drop without producing fruit, serving only pollination purposes.",
        "Thai eggplant varieties contain specialized alkaloids that remain stable even after prolonged cooking."
      ],
      'seed_garlic': [
        "Garlic is propagated from individual cloves, with each clove producing one new complete bulb.",
        "Hard-neck garlic varieties produce edible flower stalks called scapes with distinctive flavor.",
        "Garlic develops larger bulbs and stronger flavor when planted in fall and overwintered.",
        "Different garlic varieties develop different clove counts and arrangements based on genetic factors.",
        "Black garlic develops through controlled enzymatic breakdown, transforming compounds into complex medicinal substances."
      ],
      'seed_greenbean': [
        "Green bean seeds germinate quickly in warm soil, producing visible seedlings within one week.",
        "Bean seeds contain natural nitrogen-fixing bacteria that activate when planted in suitable soil.",
        "Pole bean varieties can produce three times the yield of bush types in the same ground space.",
        "Bean seed coats contain different colored pigments that indicate specific anthocyanin compounds.",
        "Heirloom bean varieties from isolated mountain regions contain unique drought-resistance genetics."
      ],
      'seed_parsnip': [
        "Parsley seeds are notoriously slow to germinate, often taking three full weeks to emerge.",
        "Soaking parsley seeds in warm water for 24 hours before planting speeds germination significantly.",
        "Flat-leaf parsley contains higher essential oil concentrations than curly varieties.",
        "Second-year parsley plants flower, attract beneficial insects, then produce thousands of viable seeds.",
        "Wild mountain parsley contains specialized compounds that remain active even after drying or freezing."
      ],
      'seed_potato': [
        "Potatoes grow from 'seed potatoes,' which are tuber pieces containing at least one eye.",
        "Potato eyes are actually compressed stems containing all genetic material for new plants.",
        "Different potato varieties contain varying starch types: waxy (less starch) and mealy (more starch).",
        "Blue and purple potato varieties contain anthocyanins that remain stable even after cooking.",
        "Wild potato relatives from Andean highlands contain natural frost-resistance genes absent in common varieties."
      ],
      'seed_pumpkin': [
        "Pumpkin seeds germinate best in soil temperatures above 70°F, failing in cool conditions.",
        "Different pumpkin types have distinctly shaped seeds with varying sizes and colors.",
        "Pumpkin seed viability decreases dramatically after three years even in ideal storage.",
        "Certain pumpkin varieties produce seeds with specialized drought-resistance adaptations.",
        "Ancient pumpkin varieties from Central America contain unique genetic traits for extreme heat survival."
      ],
      'seed_radish': [
        "Radish seeds germinate in just 3-4 days, making them the fastest sprouting garden vegetable.",
        "Early radish varieties mature in only 21 days from seed to harvest.",
        "Winter radish varieties grow much larger and store longer than spring types.",
        "Watermelon radishes have green exterior but bright pink interior when fully mature.",
        "Daikon radish roots can grow up to three feet long, breaking up compacted subsoil layers."
      ],
      'seed_red_cabbage': [
        "Red cabbage seeds look identical to green varieties but contain different genetic pigment instructions.",
        "Young red cabbage seedlings have distinctive burgundy stems unlike green varieties.",
        "Red cabbage develops deepest color when grown in slightly acidic soil conditions.",
        "The anthocyanins in red cabbage remain stable during cooking, unlike other vegetables.",
        "Ancient red cabbage varieties from Eastern Europe contain unique genetic traits for cold survival."
      ],
      'seed_artichoke': [
        "Artichoke seeds germinate slowly and unevenly, often taking 10-20 days to emerge.",
        "Artichoke plants are perennial thistles that can produce for up to five years.",
        "The edible artichoke bud consists of a heart, bottom, and fleshy petal bases.",
        "Purple artichoke varieties contain higher levels of antioxidants than green types.",
        "Wild artichoke ancestors produce smaller buds with specialized defense compounds absent in cultivated varieties."
      ],
      'seed_blueberry': [
        "Blueberry seeds require cold stratification period to break dormancy before germination.",
        "Blueberry plants need highly acidic soil (pH 4.5-5.5) unlike most garden plants.",
        "Wild blueberry varieties produce smaller berries but more intense flavor than cultivated types.",
        "Blueberry seeds grown from crosses between varieties produce unpredictable hybrid characteristics.",
        "Native blueberry species contain specialized compounds that remain active after freezing or drying."
      ],
      'seed_coffee': [
        "Coffee 'beans' are actually seeds found inside the cherry-like fruits of coffee plants.",
        "Coffee seeds contain caffeine as a natural insecticide to protect the developing embryo.",
        "Arabica coffee seeds contain half the caffeine but more complex flavor compounds than Robusta.",
        "Coffee seeds from high-elevation plants develop more complex flavor compounds due to stress adaptation.",
        "Wild Ethiopian coffee varieties contain unique genetic diversity absent from commercial cultivars."
      ],
      'seed_grape': [
        "Grape seeds require stratification (cold period) to break dormancy before germination.",
        "Different grape varieties produce seeds with varying levels of tannins affecting taste.",
        "Seedless grape varieties still contain trace seeds that fail to develop fully.",
        "Grape seeds from wine varieties contain higher levels of antioxidants than table types.",
        "Wild grape seeds produce vines with natural pest resistance genes absent in cultivated varieties."
      ],
      'seed_melon': [
        "Melon seeds germinate best in soil temperatures above 70°F, failing in cool conditions.",
        "Different melon types (cantaloupe, honeydew, watermelon) have distinctly shaped seeds.",
        "Melon seed viability decreases dramatically after three years even in ideal storage.",
        "Certain melon varieties produce seeds with specialized drought-resistance adaptations.",
        "Ancient melon varieties from desert regions contain unique genetic traits for extreme heat survival."
      ],
      'seed_strawberry': [
        "Strawberry seeds require light exposure during germination, unlike most garden seeds.",
        "Each strawberry contains approximately 200 seeds on its exterior surface.",
        "Alpine strawberry seeds grow into plants that don't produce runners like common varieties.",
        "Wild strawberry seeds produce plants with smaller fruits but more intense flavor compounds.",
        "White pineberry varieties develop seeds that grow into plants producing white fruits with red seeds."
      ],
      'seed_tomato': [
        "Tomato seeds germinate best at 70-80°F, emerging within 5-10 days with proper moisture.",
        "Tomato seeds surrounded by gel contain germination inhibitors requiring fermentation for removal.",
        "Determinate tomato seeds grow into compact plants with predetermined height and fruit set.",
        "Heirloom tomato seeds grow true to parent characteristics while hybrids produce unpredictable offspring.",
        "Wild tomato relative seeds contain genetic resistance to diseases absent in most cultivated varieties."
      ]
    };
    
    const facts = seedFacts[seedId] || [
      "Basic information about this plant.",
      "This plant has special growing requirements.",
      "Interesting historical fact about this plant.",
      "Culinary uses for this plant.",
      "Advanced growing techniques for this plant."
    ];
    
    return facts.slice(0, tier);
  };
  
  const unlockedFacts = getDetailedFacts(seed.id, seedProgression.tier);
  
  const getTierRequirements = () => {
    const thresholds = [0, 5, 15, 30, 50];
    
    if (seedProgression.tier >= 5) {
      return "Max tier reached";
    }
    
    const nextTier = Math.max(1, seedProgression.tier + 1);
    const currentThreshold = thresholds[Math.max(0, seedProgression.tier - 1)];
    const nextThreshold = thresholds[nextTier - 1];
    const plantsNeeded = nextThreshold - seedProgression.plantCount;
    
    if (seedProgression.tier === 0) {
      return `Plant this crop once to reach Tier 1`;
    }
    
    return `${plantsNeeded} more plants needed for Tier ${nextTier}`;
  };
  
  const calculateProgress = () => {
    if (!progression) return 0;
    
    if (seedProgression.tier <= 0) return 0;
    
    if (progression.calculateTierProgress) {
      return progression.calculateTierProgress(seed.id);
    }
    
    const thresholds = [0, 5, 15, 30, 50];
    
    if (seedProgression.tier >= 5) {
      return 100;
    }
    
    const currentThreshold = thresholds[seedProgression.tier - 1];
    const nextThreshold = thresholds[seedProgression.tier];
    const plantsNeeded = nextThreshold - currentThreshold;
    const progress = Math.min(100, Math.floor(((seedProgression.plantCount - currentThreshold) / plantsNeeded) * 100));
    
    return progress;
  };
  
  const generateTierInfo = () => {
    const tierText = seedProgression.tier === 0 ? "Tier: 0/5 (Never planted)" : `Tier: ${seedProgression.tier}/5`;
    
    return [
      tierText,
      `Plants grown: ${seedProgression.plantCount}`,
      `${getTierRequirements()}`,
      `Overall encyclopedia level: ${overallLevel || 0}`
    ];
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 font-malio">
      <div 
        ref={componentRef}
        className="relative w-full max-w-4xl mx-auto"
      >
        <div 
          className="relative overflow-hidden"
          style={{
            backgroundImage: `url('/assets/hud/Wiki/InventoryBackground.png')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '840px',
            height: '540px',
            imageRendering: 'pixelated',
            margin: '0 auto'
          }}
        >
          
          <button
            onClick={onBack}
            className="absolute top-12 right-1 z-10"
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
        
          <div className="flex justify-center items-start mt-20 pr-4">
            {/* Left panel */}
            <div
              className="w-3/5 h-96 px-12 overflow-y-auto"
              style={{
                backgroundImage: `url('/assets/hud/Wiki/Background_Information.png')`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                imageRendering: 'pixelated'
              }}
            >
              <div className="text-black p-4 overflow-y-auto overflow-x-hidden h-96" style={{ maxHeight: "340px", scrollbarWidth: 'thin', scrollbarColor: '#8B4513 transparent' }}>
                <h3 className="font-bold text-md mb-2">{seed.name}</h3>
                <p className="text-xs mb-4">
                  {seed.description}
                </p>
                
                <div className="mt-4 mb-4">
                  <h4 className="font-bold text-md mb-2">Progression</h4>
                  <ul className="text-xs space-y-1">
                    {generateTierInfo().map((info, idx) => (
                      <li key={`tier-${idx}`} className="flex">
                        <span className="mr-2">•</span>
                        <span>{info}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-bold text-xs mb-2">Plant Knowledge</h4>
                  {unlockedFacts.length > 0 ? (
                    <ul className="text-xs space-y-3">
                      {unlockedFacts.map((fact, index) => (
                        <li key={`fact-${index}`} className="flex">
                          <span className="mr-2">•</span>
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs italic">You haven't grown this plant yet. Plant it to begin unlocking knowledge.</p>
                  )}
                </div>
                
                {seedProgression.tier < 5 && (
                  <div className="mt-4 text-gray-500 italic text-xs">
                    {seedProgression.tier === 0 ? 
                      "Grow this plant to unlock knowledge entries." : 
                      `${5 - seedProgression.tier} more knowledge entries will unlock at higher tiers.`}
                  </div>
                )}
              </div>
            </div>
            
            {/* Right panel */}
            <div 
              className="w-2/5 h-96 flex flex-col items-center justify-between"
              style={{
                backgroundImage: `url('/assets/hud/Wiki/Background_photo_Section.png')`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                imageRendering: 'pixelated',
                padding: '20px'
              }}
            >
              <div className="flex flex-col items-center justify-center">
                <div 
                  className="w-40 h-40 flex items-center justify-center relative mb-4"
                  style={{
                    backgroundImage: `url('/assets/hud/Merchant/Hud_SellArea_Item_BackGround_3.png')`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    imageRendering: 'pixelated'
                  }}
                >
                  <img 
                    src={seed.iconPath} 
                    alt={seed.name} 
                    className="w-32 h-32 object-contain"
                    style={{ 
                      imageRendering: 'pixelated',
                      objectFit: 'contain'
                    }}
                  />
                </div>
                
                <div className="flex items-center mt-2 mb-4">
                  <img 
                    src="/assets/Icon/IconGoldCoin.png" 
                    alt="Gold" 
                    className="w-6 h-6 mr-2"
                    style={{ imageRendering: 'pixelated' }}
                  />
                  <span className="text-yellow-300 text-lg font-bold">{seed.buyPrice}</span>
                </div>
              </div>
              
              <div className="w-full mt-auto">
                <div className="flex flex-col items-center justify-between text-xs text-gray-800 mb-1">
                  <span>Tier {seedProgression.tier}</span>
                  <span>Progress to Tier {Math.min(5, Math.max(1, seedProgression.tier + 1))}</span>
                </div>
                
                <div className=" left-4 w-64 h-20 relative flex justify-center items-center">
                  <div 
                    className="w-full h-28"
                    style={{
                      backgroundImage: `url('/assets/hud/Wiki/Background_Progress_Bar.png')`,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      imageRendering: 'pixelated'
                    }}
                  ></div>
                  
                  <div 
                    className="absolute top-3 left-12 h-10"
                    style={{
                      width: `${calculateProgress()}%`,
                      backgroundImage: `url('/assets/hud/Wiki/Hud_Progress_Bar.png')`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      imageRendering: 'pixelated',
                      maxWidth: '64%'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoDetails;