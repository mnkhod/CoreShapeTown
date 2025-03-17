import { useNavigate } from "react-router";
import { useEffect, useRef } from 'react';
import { ethers } from "ethers";

function Login() {
    let navigate = useNavigate();
    const backgroundMusicRef = useRef(null);
    const openSoundRef = useRef(null);

    useEffect(() => {
        const openSound = new Audio("/assets/SFX/Theme song/Main menu/Main_Menu_Open.mp3");
        
        const backgroundMusic1 = new Audio("/assets/SFX/Theme song/Main menu/Main_Menu_Loop.mp3");
        const backgroundMusic2 = new Audio("/assets/SFX/Theme song/Main menu/Main_Menu_Loop.mp3");
        backgroundMusic1.volume = 0.5;
        backgroundMusic2.volume = 0.5;
        
        let currentBackgroundMusic = backgroundMusic1;
        let nextBackgroundMusic = backgroundMusic2;
        
        backgroundMusicRef.current = backgroundMusic1;
        openSoundRef.current = openSound;
        
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
                console.log("Opening sound playback was prevented:", error);
                currentBackgroundMusic.play().then(() => {
                    setupNextLoop();
                }).catch(e => console.log("Loop playback was also prevented:", e));
            });
        };
        
        openSound.addEventListener('ended', () => {
            currentBackgroundMusic.play().then(() => {
                setupNextLoop();
            }).catch(error => {
                console.log("Loop playback was prevented:", error);
            });
        });
        
        playOpeningSound();

        if(window.ethereum){
            if(window.ethereum.selectedAddress && window.ethereum.selectedAddress.length > 0){
                navigate("/customize");
            }
        }

        return () => {
            openSound.pause();
            openSound.currentTime = 0;
            openSound.removeEventListener('ended', () => {});
        };
    }, [navigate]);

    async function openLogin(){
        if(openSoundRef.current) {
            openSoundRef.current.play().catch(error => {
                console.log("Open sound playback was prevented: ", error);
            });
        }

        if(window.ethereum){
            let provider = new ethers.BrowserProvider(window.ethereum);
            try {
                await provider.getSigner();
                navigate("/customize");
            } catch (e) {
                console.error("Error getting signer:", e);
            }
        } else {
            alert("No Metamask Detected");
        }
    }

    return (
        <div className="">
            <img src="/assets/ShapeTownBg.png" className='absolute top-0 left-0 z-0 object-cover h-full w-full' />

            <div className='z-10 relative h-screen flex items-center ml-32'>
                <div className='relative'>
                    <img src="/assets/shapeTownSign.png" className='relative' height={"920"} width={"705"} />
                    <button className='absolute bottom-6 left-0 w-full flex justify-center' onClick={() => { openLogin() }}>
                        <img src="/assets/loginConnect.png" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;