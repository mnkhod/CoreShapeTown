import { useEffect, useRef, useState } from 'react';

import { PhaserGame } from './game/PhaserGame';
import SettingsComponent from './components/Settings';
import AchievementHUD from './components/AchievementHUD';
import InventoryHUD from './components/InventoryHUD';
import TokenTrader from './components/TokenTrader';
import QuestComponent from './components/QuestComponent';
import NavigateBack from './components/NavigateBack';
import MailInterface from './components/MailComponent';
import HelpInterface from './components/HelpAndSupport';
import SignOutModal from './components/LogoutComponent';
import LeaderboardComponent from './components/LeaderBoard';
import MerchantSellScreen from './components/TradingSell';
import MerchantBuyScreen from './components/TradingBuy';
import SeedSelector from './components/InfoSelection';
import createPlantProgressionSystem from './components/plant-progression-utility';

import { ethers } from "ethers";
import { EventBus } from "./game/EventBus";


function App() {
    const phaserRef = useRef();

    const [showAchievements, setShowAchievements] = useState(false);
    const [showInventory, setShowInventory] = useState(false);
    const [showTrader, setShowTrader] = useState(false);
    const [showQuest, setShowQuest] = useState(false);
    const [questProgress, setQuestProgress] = useState({});
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [phaserInstance, setPhaserInstance] = useState(null);
    const [showNavigateBack, setShowNavigateBack] = useState(false);
    const [showMail, setShowMail] = useState(false);
    const [showHelpSupport, setShowHelpSupport] = useState(false);
    const [showSignOutModal, setShowSignOutModal] = useState(false);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [showShopSell, setShowShopSell] = useState(false);
    const [showShopBuy, setShowShopBuy] = useState(false);
    const [merchantType, setMerchantType] = useState('farmer');
    const [showSeedEncyclopedia, setShowSeedEncyclopedia] = useState(false);
    const [plantProgression, setPlantProgression] = useState(() => createPlantProgressionSystem());

    const [gameData] = useState({});

    const currentScene = (scene) => {

    }

    const handleTrade = ({ fromAmount, fromToken, toToken }) => {
        console.log('Trading:', { fromAmount, fromToken, toToken });
    };

    const showModal = (id, modalData) => {
        console.log('App showModal received:', { id, modalData });
        setShowAchievements(false);
        setShowInventory(false);
        setShowTrader(false);
        setShowQuest(false);
        setShowSettingsModal(false);
        setShowNavigateBack(false);
        setShowMail(false);
        setShowHelpSupport(false);
        setShowLeaderboard(false);
        setShowShopSell(false);
        setShowShopBuy(false);
        setShowSeedEncyclopedia(false);
    
        switch (id) {
            case "ACHIVEMENTS":
                setShowAchievements(true);
                break;
            case "INVENTORY":
                console.log('Inventory modal data:', modalData);
                if (modalData && modalData.phaserInstance) {
                    setPhaserInstance(modalData.phaserInstance);
                    setShowInventory(true);
                }
                break;
            case "MARKET":
                setShowTrader(true);
                break;
            case "QUEST":
                setShowQuest(true);
                break;
            case "SETTINGS":
                setShowSettingsModal(true);
                break;
            case "NAVIGATE":
                setShowNavigateBack(true);
                break;
            case "MAIL":
                setShowMail(true);
                break;
            case "HELP":
                setShowHelpSupport(true);
                break;
            case "SIGNOUT":
                setShowSignOutModal(true);
                break;
            case "LEADERBOARD":
                setShowLeaderboard(true);
                break;
            case "SHOPSELL":
                if (modalData && modalData.phaserInstance) {
                    setPhaserInstance(modalData.phaserInstance);
                    if (modalData.merchantType) {
                        setMerchantType(modalData.merchantType);
                    }
                }
                setShowShopSell(true);
                break;
            case "SHOPBUY":
                if (modalData && modalData.phaserInstance) {
                    setPhaserInstance(modalData.phaserInstance);
                    if (modalData.merchantType) {
                        setMerchantType(modalData.merchantType);
                    }
                }
                setShowShopBuy(true);
                break;
            case "SEEDENCYCLOPEDIA":
                if (modalData && modalData.phaserInstance) {
                    setPhaserInstance(modalData.phaserInstance);
                }
                setShowSeedEncyclopedia(true);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        getMetamaskAccount();
        
        plantProgression.loadFromStorage();
        setPlantProgression({...plantProgression});
        
        const handleOpenMerchantBuy = (data) => {
            console.log('Opening merchant buy screen with data:', data);
            if (data && data.phaserInstance) {
                setPhaserInstance(data.phaserInstance);
                if (data.merchantType) {
                    setMerchantType(data.merchantType);
                }
                setShowShopBuy(true);
            }
        };

        const handleCloseMerchantBuy = () => {
            setShowShopBuy(false);
            setPhaserInstance(null);
        };

        const handleOpenMerchantSell = (data) => {
            console.log('Opening merchant sell screen with data:', data);
            if (data && data.phaserInstance) {
                setPhaserInstance(data.phaserInstance);
                if (data.merchantType) {
                    setMerchantType(data.merchantType);
                }
                setShowShopSell(true);
            }
        };

        const handleCloseMerchantSell = () => {
            setShowShopSell(false);
            setPhaserInstance(null);
        };
        
        const handleOpenSeedEncyclopedia = (data) => {
            console.log('Opening seed encyclopedia with data:', data);
            if (data && data.phaserInstance) {
                setPhaserInstance(data.phaserInstance);
            }
            setShowSeedEncyclopedia(true);
        };
        
        const handleCloseSeedEncyclopedia = () => {
            setShowSeedEncyclopedia(false);
            setPhaserInstance(null);
        };
        
        const handlePlantGrown = (data) => {
            if (data && data.seedId) {
                const seedId = data.seedId.toLowerCase().replace(/\s+/g, '_');
                const formattedSeedId = seedId.startsWith('seed_') ? seedId : `seed_${seedId}`;
                
                const tierIncreased = plantProgression.addPlantedCount(formattedSeedId, 1);
                plantProgression.saveToStorage();
                setPlantProgression({...plantProgression});
                
                if (tierIncreased && data.phaserInstance && data.phaserInstance.alertPrefab) {
                    const tier = plantProgression.data[formattedSeedId].tier;
                    data.phaserInstance.alertPrefab.alert(`Encyclopedia: ${formattedSeedId.replace('seed_', '')} knowledge increased to Tier ${tier}!`);
                }
            }
        };

        EventBus.on('open-merchant-buy', handleOpenMerchantBuy);
        EventBus.on('close-merchant-buy', handleCloseMerchantBuy);
        EventBus.on('open-merchant-sell', handleOpenMerchantSell);
        EventBus.on('close-merchant-sell', handleCloseMerchantSell);
        EventBus.on('open-seed-encyclopedia', handleOpenSeedEncyclopedia);
        EventBus.on('close-seed-encyclopedia', handleCloseSeedEncyclopedia);
        EventBus.on('plant-grown', handlePlantGrown);

        return () => {
            EventBus.off('open-merchant-buy', handleOpenMerchantBuy);
            EventBus.off('close-merchant-buy', handleCloseMerchantBuy);
            EventBus.off('open-merchant-sell', handleOpenMerchantSell);
            EventBus.off('close-merchant-sell', handleCloseMerchantSell);
            EventBus.off('open-seed-encyclopedia', handleOpenSeedEncyclopedia);
            EventBus.off('close-seed-encyclopedia', handleCloseSeedEncyclopedia);
            EventBus.off('plant-grown', handlePlantGrown);
        };
    }, []);
    
    useEffect(() => {
        if (showQuest && window.getQuestProgress) {
            const progress = window.getQuestProgress();
            setQuestProgress(progress);
        
            const intervalId = setInterval(() => {
                const updatedProgress = window.getQuestProgress();
                setQuestProgress(updatedProgress);
            }, 1000);
            
            return () => clearInterval(intervalId);
        }
    }, [showQuest]);
    async function getMetamaskAccount() {
        let signer = null;

        let provider;
        if (window.ethereum) {
            provider = new ethers.BrowserProvider(window.ethereum)
            signer = await provider.getSigner();

            EventBus.emit("blockchain-account", signer.address)
        }
    }

    return (
        <div id="app">
            <PhaserGame 
                ref={phaserRef} 
                currentActiveScene={currentScene} 
                showModal={showModal} 
                gameData={gameData} 
            />
            {showAchievements && (
                <AchievementHUD
                    onClose={() => setShowAchievements(false)}
                />
            )}
            {showInventory && (
                <InventoryHUD
                    phaserInstance={phaserInstance}
                    onClose={() => {
                        setShowInventory(false);
                        setPhaserInstance(null);
                    }}
                />
            )}
            {showTrader && (
                <TokenTrader
                    balance={1000}
                    onTrade={handleTrade}
                    onClose={() => setShowTrader(false)}
                />
            )}
            {showQuest && (
                <QuestComponent 
                    onClose={() => setShowQuest(false)}
                    playerProgress={questProgress}
                    onQuestUpdate={(update) => {
                        if (window.updateQuestProgress) {
                            window.updateQuestProgress(update);
                            setQuestProgress(window.getQuestProgress());
                        }
                    }}
                />
            )}
            {showSettingsModal && (
                <SettingsComponent
                    isOpen={showSettingsModal}
                    onClose={() => setShowSettingsModal(false)}
                />
            )}
            {showNavigateBack && (
                <NavigateBack
                    onClose={() => setShowNavigateBack(false)}
                    isOpen={showNavigateBack}
                />
            )}
            {showMail && (
                <MailInterface
                    onClose={() => setShowMail(false)}
                    isOpen={showMail}
                />
            )}
            {showHelpSupport && (
                <HelpInterface
                  onClose={() => setShowHelpSupport(false)}
                  isOpen={showHelpSupport}
                />
            )}
            {showSignOutModal && (
                <SignOutModal
                    onClose={() => setShowSignOutModal(false)}
                    isOpen={showSignOutModal}
                />
            )}
            {showLeaderboard && (
                <LeaderboardComponent
                    onClose={() => setShowLeaderboard(false)}
                    isOpen={showLeaderboard}
                />
            )}
            {showShopSell && (
                <MerchantSellScreen
                    phaserInstance={phaserInstance}
                    merchantType={merchantType}
                    onClose={() => {
                        setShowShopSell(false);
                        setPhaserInstance(null);
                    }}
                    isOpen={showShopSell}
                />
            )}
            {showShopBuy && (
                <MerchantBuyScreen
                    phaserInstance={phaserInstance}
                    merchantType={merchantType}
                    onClose={() => {
                        setShowShopBuy(false);
                        setPhaserInstance(null);
                    }}
                    isOpen={showShopBuy}
                />
            )}
            {showSeedEncyclopedia && (
                <SeedSelector
                    progression={plantProgression}
                    onClose={() => {
                        setShowSeedEncyclopedia(false);
                        setPhaserInstance(null);
                    }}
                    isOpen={showSeedEncyclopedia}
                />
            )}
        </div>
    )
}

export default App