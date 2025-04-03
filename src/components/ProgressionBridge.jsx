import { useEffect } from 'react';
import createPlantProgressionSystem from './plant-progression-utility';

const ProgressionBridge = ({ onProgressionUpdate }) => {
  useEffect(() => {
    if (!window.plantProgressionSystem) {
      window.plantProgressionSystem = createPlantProgressionSystem();
      window.plantProgressionSystem.loadFromStorage();
    }
    
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
          return () => {
            this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
          };
        }
      };
    }
    
    const listeners = [];
    
    listeners.push(window.EventBus.on('plant-grown', (data) => {
      if (data && data.seedId) {
        const tierIncreased = window.plantProgressionSystem.addPlantedCount(data.seedId, 1);
        window.plantProgressionSystem.saveToStorage();
        
        if (onProgressionUpdate) {
          onProgressionUpdate({
            seedId: data.seedId,
            tierIncreased,
            progression: window.plantProgressionSystem
          });
        }
      }
    }));
    
    listeners.push(window.EventBus.on('wallet-changed', () => {
      if (window.plantProgressionSystem) {
        window.plantProgressionSystem.loadFromStorage();
      }
      
      if (onProgressionUpdate) {
        onProgressionUpdate({
          walletChanged: true,
          progression: window.plantProgressionSystem
        });
      }
    }));
    
    const handleWalletChange = () => {
      if (window.plantProgressionSystem) {
        window.plantProgressionSystem.loadFromStorage();
      }
      
      if (onProgressionUpdate) {
        onProgressionUpdate({
          walletChanged: true,
          progression: window.plantProgressionSystem
        });
      }
    };
    
    window.addEventListener('wallet-changed', handleWalletChange);
    
    window.addPlantedCount = (seedId, count = 1) => {
      if (!window.plantProgressionSystem) return false;
      
      const tierIncreased = window.plantProgressionSystem.addPlantedCount(seedId, count);
      window.plantProgressionSystem.saveToStorage();
      
      if (onProgressionUpdate) {
        onProgressionUpdate({
          seedId,
          tierIncreased,
          progression: window.plantProgressionSystem
        });
      }
      
      return tierIncreased;
    };
    
    return () => {
      listeners.forEach(removeListener => removeListener());
      window.removeEventListener('wallet-changed', handleWalletChange);
    };
  }, [onProgressionUpdate]);
  
  return null;
};

export default ProgressionBridge;