import { useEffect, useRef, useContext, useState } from 'react';
import UseContext from '../Context'
import Webamp from 'webamp';
import mp3 from '../assets/never-gonna-give-you-up.mp3';
import mp32 from '../assets/Kavinsky-Nightcall.mp3';
import mp33 from '../assets/RASTAKNOT-Wait and-Bleed-(Slipknot-Reggae).mp3';
import mp34 from '../assets/Nirvana - Smells Like Teen Spirit.mp3';
import mp35 from '../assets/Xtract - AT Day 2016.mp3';
import mp36 from '../assets/A.L.I.S.O.N - Space Echo.mp3';
import mp37 from '../assets/Volt Age - Volts Theme.mp3';
import mp38 from '../assets/Lucy In Disguise - Southboun.mp3';
import mp39 from '../assets/Lucy In Disguise - Echoes In Time.mp3';
import mp40 from '../assets/HOME-Flood.mp3';
import mp41 from '../assets/De Lorra Augustus Wright   Let Us - SUPRA RW.mp3';
import mp42 from '../assets/bl00dwave - Encounters.mp3';
import mp43 from '../assets/Emil Rottmayer - T.I.M.E.mp3';
import mp44 from '../assets/oDDling - Early Bird.mp3';
import mp45 from '../assets/Hello Meteor - At Last Light.mp3';






const WebampPlayer = () => {

    const [focus, setFocus] = useState(false)

    const { 
        ObjectState,
        maxZindexRef,
        WinampExpand, setWinampExpand,

        deleteTap,
      } = useContext(UseContext);

    const appRef = useRef(null);

    useEffect(() => {
        let webampInstance;
        let disposed = false; 
    
        const startWebamp = () => {
            if (Webamp.browserIsSupported()) {
                const options = {
                    initialTracks: [
                    
                    
                    {
                        metaData: {
                            artist: "Kavinsky",
                            title: "Nightcall"
                        },
                        url: mp32,
                        duration: 213
                    },

                        {
                        metaData: {
                            artist: "RASTAKNOT",
                            title: "Wait and Bleed"
                        },
                        url: mp33,
                        duration: 182
                    },

                         {
                        metaData: {
                            artist: "NirvanaWave",
                            title: "Smells Like Teen Spirit"
                        },
                        url: mp34,
                        duration: 451
                    },

                         {
                        metaData: {
                            artist: "Xtract",
                            title: "AT Day 2016"
                        },
                        url: mp35,
                        duration: 238
                    },

                         {
                        metaData: {
                            artist: "A.L.I.S.O.N",
                            title: "Space Echo"
                        },
                        url: mp36,
                        duration: 211
                    },

                         {
                        metaData: {
                            artist: "Volt Age",
                            title: "Volt's Theme"
                        },
                        url: mp37,
                        duration: 344
                    },

                         {
                        metaData: {
                            artist: "Lucy In Disguise",
                            title: "Southboun"
                        },
                        url: mp38,
                        duration: 295
                    },

                         {
                        metaData: {
                            artist: "Lucy In Disguise",
                            title: "Echoes In Time"
                        },
                        url: mp39,
                        duration: 309
                    },

                         {
                        metaData: {
                            artist: "HOME",
                            title: "Flood"
                        },
                        url: mp40,
                        duration: 216
                    },

                         {
                        metaData: {
                            artist: "De Lorra/Augustus Wright",
                            title: "Let Us"
                        },
                        url: mp41,
                        duration: 256
                    },

                         {
                        metaData: {
                            artist: "bl00dwave",
                            title: "Encounters"
                        },
                        url: mp42,
                        duration:163
                    },

                         {
                        metaData: {
                            artist: "Emil Rottmayer",
                            title: "T.I.M.E"
                        },
                        url: mp43,
                        duration: 381
                    },

                         {
                        metaData: {
                            artist: "oDDling",
                            title: "Early Bird"
                        },
                        url: mp44,
                        duration: 188
                    },

                         {
                        metaData: {
                            artist: "Hello Meteor",
                            title: "At Last Light"
                        },
                        url: mp44,
                        duration: 154
                    }
                
              
                
                ],
                    zIndex: 999
                };
                const webamp = new Webamp(options);
                webampInstance = webamp;
    
                const handleClose = () => {
                    if (!disposed) {
                        disposed = true; 
                        webamp.dispose();
                        deleteTap('Winamp')
                    }
                };
    
                webamp.onClose(handleClose);
    
                webamp.onMinimize(() => {
                    const webampElement = document.querySelector('#webamp');
      
                    if (webampElement) {
                        webampElement.style.opacity = 0;
                        webampElement.style.pointerEvent = 'none'
                        webampElement.style.touchAction = 'none'
                        webampElement.style.zIndex = -1
                        setWinampExpand(prev => ({...prev, hide: true, focusItem: false}));
                        setFocus(false)
                    }
                });
    
                webamp.renderWhenReady(appRef.current);
            }
        };
    
        startWebamp();
    
        return () => {
            if (webampInstance && !disposed) {
                disposed = true; 
                webampInstance.dispose();
            }
        };
    }, []);


    useEffect(() => {
        const webampElement = document.querySelector('#webamp');
    
        if (webampElement) {

            if (WinampExpand.focusItem) {
                webampElement.style.zIndex = 999;
            } 

            // if(WinampExpand.focusItem && WinampExpand.hide) {
            //     webampElement.style.touchAction = 'none'
            //     webampElement.style.zIndex = -1;
            // }
            
            if(!WinampExpand.focusItem && !WinampExpand.hide) {
                const maxZindex = (maxZindexRef.current || 0 ) + 1;
                webampElement.style.zIndex = maxZindex;
                maxZindexRef.cururent = maxZindex;
            }
               
        } 
    }, [WinampExpand.focusItem]);
    
    useEffect(() => {
        
        const handleFocusWinamp = (event) => {

            if (event.target.closest('#webamp' || event.target.closest('#winamp-container')) && !focus) {
                const allState = ObjectState()
                allState.forEach(item => {
                    item.setter(prev => ({...prev, focusItem: item.name === 'Winamp'}))
                })
            }
        };
    
        document.addEventListener('click', () => {
            handleFocusWinamp()
            setFocus(true)
        });
        document.addEventListener('touchstart', handleFocusWinamp);
        document.addEventListener('mousedown', handleFocusWinamp);
    
        return () => {
            document.removeEventListener('click', handleFocusWinamp);
            document.removeEventListener('touchstart', handleFocusWinamp);
            document.removeEventListener('mousedown', handleFocusWinamp);
        };
    }, []);
    
    
    

    return(   
        <div ref={appRef} className='winampRef'></div>
    );
};

export default WebampPlayer;
