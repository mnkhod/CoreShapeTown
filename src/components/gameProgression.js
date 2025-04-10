const getStorageKeyPrefix = () => {
    // Get the current wallet address if available
    let walletAddress = '';
    
    // Check for MetaMask or similar wallet
    if (window.ethereum && window.ethereum.selectedAddress) {
      walletAddress = window.ethereum.selectedAddress;
    }
    
    // If no wallet is connected, use a default key
    return walletAddress ? `plantProgression_${walletAddress}` : 'plantProgression';
  };
  
  // Create the Event Bus if it doesn't exist
  if (!window.EventBus) {
    window.EventBus = {
      listeners: {},
      emit: function(event, data) {
        if (this.listeners[event]) {
          this.listeners[event].forEach(callback => callback(data));
        }
      },
      on: function(event, callback) {
        if (!this.listeners[event]) {
          this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
        
        // Return a function to remove the listener
        return () => {
          this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
        };
      }
    };
  }
  
  // Initialize the plant progression system
  export const initializeGameProgression = (scene) => {
    // Ensure the progression system exists
    if (!window.plantProgressionSystem) {
      window.plantProgressionSystem = {
        data: {},
      addPlantedCount: function(seedId, count = 1) {
        if (!this.data[seedId]) {
          this.data[seedId] = { plantCount: 0, tier: 0, maxTier: 5 };
        }
        
        const oldTier = this.data[seedId].tier;
        this.data[seedId].plantCount += count;
        
        // Calculate new tier based on thresholds
        const thresholds = [0, 1, 2, 3, 4];
        for (let i = this.data[seedId].tier; i < 5; i++) {
          if (this.data[seedId].plantCount >= thresholds[i]) {
            this.data[seedId].tier = i + 1;
          } else {
            break;
          }
        }
        
        this.saveToStorage();
        return this.data[seedId].tier > oldTier;
      },
      
      calculateOverallLevel: function() {
        let totalTiers = 0;
        Object.values(this.data).forEach(seedData => {
          totalTiers += seedData.tier;
        });
        return totalTiers;
      },
      
      calculateTierProgress: function(seedId) {
        const seed = this.data[seedId];
        if (!seed) return 0;
        
        if (seed.tier >= 5) return 100;
        
        const thresholds = [0, 1, 2, 3, 4];
        const currentThreshold = thresholds[seed.tier - 1] || 0;
        const nextThreshold = thresholds[seed.tier] || 5;
        const plantsNeeded = nextThreshold - currentThreshold;
        const plantsGrown = seed.plantCount - currentThreshold;
        
        return Math.min(100, Math.floor((plantsGrown / plantsNeeded) * 100));
      },
      
      saveToStorage: function() {
        try {
          const keyPrefix = getStorageKeyPrefix();
          localStorage.setItem(`${keyPrefix}_data`, JSON.stringify(this.data));
        } catch (e) {
          // Silent error handling
        }
      },
      
      loadFromStorage: function() {
        try {
          const keyPrefix = getStorageKeyPrefix();
          const savedData = localStorage.getItem(`${keyPrefix}_data`);
          if (savedData) {
            this.data = JSON.parse(savedData);
            return true;
          }
        } catch (e) {
          // Silent error handling
        }
        return false;
      }
    };
    
    // Load existing data
    window.plantProgressionSystem.loadFromStorage();
    
    // Set up a listener for wallet changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => {
        // Reload data for the new account
        window.plantProgressionSystem.loadFromStorage();
        
        // Emit events to notify components
        window.EventBus.emit('wallet-changed', { progression: window.plantProgressionSystem });
        window.dispatchEvent(new Event('wallet-changed'));
      });
    }
  }
  
  // Connect the scene to the event system if provided
  if (scene) {
    if (!scene.reactEvent) {
      scene.reactEvent = {
        emit: function(event, data) {
          if (window.EventBus) {
            window.EventBus.emit(event, data);
          }
        }
      };
    }
    
    scene.updatePlantProgress = (seedId, count = 1) => {
      if (window.plantProgressionSystem) {
        return window.plantProgressionSystem.addPlantedCount(seedId, count);
      }
      return false;
    };
    
    scene.triggerQuestEvent = (eventName, data) => {
      scene.reactEvent.emit(eventName, data);
      if (window.EventBus) {
        window.EventBus.emit(eventName, data);
      }
    };
  }
  
  return window.plantProgressionSystem;
};

window.addPlantedCount = (seedId, count = 1) => {
  if (window.plantProgressionSystem) {
    return window.plantProgressionSystem.addPlantedCount(seedId, count);
  }
  return false;
};

export default initializeGameProgression;