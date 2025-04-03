/**
 * Create progression data for a single seed
 * @param {string} seedId - The seed identifier
 * @returns {Object} Progression data for the seed
 */
export const createSeedProgression = (seedId) => {
  return {
    seedId,
    plantCount: 0,
    tier: 0,
    maxTier: 5,
    tierThresholds: [0, 5, 15, 30, 50]
  };
};

/**
 * Create the complete plant progression system
 * @returns {Object} The progression system with methods
 */
export const createPlantProgressionSystem = () => {
  const seedIds = [
    'seed_bokchok', 'seed_broccoli', 'seed_carrot', 'seed_cauliflower', 'seed_chili',
    'seed_corn', 'seed_eggplant', 'seed_garlic', 'seed_greenbean', 'seed_parsnip',
    'seed_potato', 'seed_pumpkin', 'seed_radish', 'seed_red_cabbage', 'seed_artichoke',
    'seed_blueberry', 'seed_coffee', 'seed_grape', 'seed_melon', 'seed_strawberry',
    'seed_tomato'
  ];
  
  const progressionData = {};
  seedIds.forEach(seedId => {
    progressionData[seedId] = createSeedProgression(seedId);
  });
  
  return {
    data: progressionData,
    
    /**
     * Calculate overall encyclopedia level
     * @returns {number} The overall level
     */
    calculateOverallLevel() {
      let totalTiers = 0;
      Object.values(this.data).forEach(seedData => {
        totalTiers += seedData.tier;
      });
      return totalTiers;
    },
    
    /**
     * Get maximum possible level
     * @returns {number} The maximum possible level
     */
    getMaxLevel() {
      return seedIds.length * 5; // Max tier per seed * number of seeds
    },
    
    /**
     * Calculate progress percentage for current tier
     * @param {string} seedId - The seed identifier
     * @returns {number} Progress percentage (0-100)
     */
    calculateTierProgress(seedId) {
      const seed = this.data[seedId];
      if (!seed) return 0;
      
      if (seed.tier >= seed.maxTier) {
        return 100; // Already at max tier
      }
      
      const thresholds = seed.tierThresholds || [0, 5, 15, 30, 50];
      const currentThreshold = thresholds[seed.tier - 1] || 0;
      const nextThreshold = thresholds[seed.tier] || 5;
      const plantsNeeded = nextThreshold - currentThreshold;
      const plantsGrown = seed.plantCount - currentThreshold;
      
      return Math.min(100, Math.floor((plantsGrown / plantsNeeded) * 100));
    },
    
    /**
     * Add a planted count to a seed and update tier if needed
     * @param {string} seedId - The seed identifier
     * @param {number} count - Number of plants to add (default: 1)
     * @returns {boolean} Whether tier increased
     */
    addPlantedCount(seedId, count = 1) {
      if (!this.data[seedId]) {
        this.data[seedId] = createSeedProgression(seedId);
      }
      
      const seed = this.data[seedId];
      const oldTier = seed.tier;
      seed.plantCount += count;
      
      // Check if tier should increase
      const thresholds = seed.tierThresholds || [0, 5, 15, 30, 50];
      for (let i = seed.tier; i < seed.maxTier; i++) {
        if (seed.plantCount >= thresholds[i]) {
          seed.tier = i + 1;
        } else {
          break;
        }
      }
      
      return seed.tier > oldTier;
    },
    
    /**
     * Save progression data to localStorage with wallet-specific key
     */
    saveToStorage() {
      try {
        // Get wallet-specific key if available
        const walletAddress = window.ethereum && window.ethereum.selectedAddress ? 
          window.ethereum.selectedAddress : '';
        const keyPrefix = walletAddress ? 
          `plantProgression_${walletAddress}` : 'plantProgression';
          
        localStorage.setItem(`${keyPrefix}_data`, JSON.stringify(this.data));
      } catch (e) {
        console.error('Failed to save plant progression data', e);
      }
    },
    
    /**
     * Load progression data from localStorage with wallet-specific key
     * @returns {boolean} Whether data was loaded successfully
     */
    loadFromStorage() {
      try {
        // Get wallet-specific key if available
        const walletAddress = window.ethereum && window.ethereum.selectedAddress ? 
          window.ethereum.selectedAddress : '';
        const keyPrefix = walletAddress ? 
          `plantProgression_${walletAddress}` : 'plantProgression';
          
        const savedData = localStorage.getItem(`${keyPrefix}_data`);
        if (savedData) {
          const parsed = JSON.parse(savedData);
          
          // Merge saved data with current data structure
          seedIds.forEach(seedId => {
            if (parsed[seedId]) {
              this.data[seedId] = {
                ...createSeedProgression(seedId),  // Get default structure
                ...parsed[seedId]                  // Override with saved values
              };
            }
          });
          
          return true;
        }
      } catch (e) {
        console.error('Failed to load plant progression data', e);
      }
      return false;
    },
    
    /**
     * Reset all progression data
     */
    resetAllProgress() {
      seedIds.forEach(seedId => {
        this.data[seedId] = createSeedProgression(seedId);
      });
      
      try {
        const walletAddress = window.ethereum && window.ethereum.selectedAddress ? 
          window.ethereum.selectedAddress : '';
        const keyPrefix = walletAddress ? 
          `plantProgression_${walletAddress}` : 'plantProgression';
          
        localStorage.removeItem(`${keyPrefix}_data`);
      } catch (e) {
        console.error('Failed to remove plant progression data', e);
      }
    }
  };
};

export default createPlantProgressionSystem;