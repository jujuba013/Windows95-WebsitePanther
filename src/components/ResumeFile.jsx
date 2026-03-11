import UseContext from '../Context'
import { useContext, useState } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import resumefile from '../assets/resume.png'
import '../css/ResumeFile.css'



function Arte() {

  const { 
    themeDragBar,
    ArteExpand, setArteExpand,
    lastTapTime, setLastTapTime,
    StyleHide,
    isTouchDevice,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    deleteTap,

   } = useContext(UseContext);

   const [ downloadBox, setDownloadBox ] = useState(false)

      function handleDragStop(event, data) {
        const positionX = data.x 
        const positionY = data.y
        setArteExpand(prev => ({
          ...prev,
          x: positionX,
          y: positionY
        }))

      }

   function handleExpandStateToggle() {
    setArteExpand(prevState => ({
      ...prevState,
      expand: !prevState.expand
    }));
  }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    if (now - lastTapTime < 300) {
        setArteExpand(prevState => ({
            ...prevState,
            expand: !prevState.expand
        }));
    }
    setLastTapTime(now);
}

  return (
    <>
      <Draggable
        axis="both" 
        handle={'.folder_dragbar-resumefile'}
        grid={[1, 1]}
        scale={1}
        disabled={ArteExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
          x: window.innerWidth <= 500 ? 5 : 80,
          y: window.innerWidth <= 500 ? 100 : 90,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={() => handleSetFocusItemTrue('Arte')}
      >
        <div className='folder_folder-resumefile' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue('Arte');
            }}
            style={ ArteExpand.expand ? inlineStyleExpand('Arte') : inlineStyle('Arte')}>
          <div className="folder_dragbar-resumefile"
              onDoubleClick={handleExpandStateToggle}
              onTouchStart={handleExpandStateToggleMobile}
             style={{ background: ArteExpand.focusItem? themeDragBar : '#757579'}}
          >
            <div className="folder_barname-resumefile">
              <img src={resumefile} alt="resumefile" />
              <span>Arte para o lucas</span>
            </div>
            <div className="folder_barbtn-resumefile">
              <div onClick={ !isTouchDevice? (e) => {
                e.stopPropagation()
                setArteExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('Arte') 
              } : undefined
            }
                   onTouchEnd={(e) => {
                    e.stopPropagation()
                    setArteExpand(prev => ({...prev, hide: true, focusItem: false}))
                    StyleHide('Arte')
                  }}
                  onTouchStart={(e) => e.stopPropagation()}
              >
                <p className='dash-resumefile'></p>
              </div>
              <div
                onClick={ !isTouchDevice ? () => handleExpandStateToggle() : undefined}
                onTouchEnd={handleExpandStateToggle}
              >
                <motion.div className={`expand-resumefile ${ArteExpand.expand ? 'full' : ''}`}>
                </motion.div>
                {ArteExpand.expand ? 
                (
                <div className="expand_2-resumefile"></div>
                )
                :
                (null)}
              </div>
              <div>
                <p className='x-resumefile'
                 onClick={!isTouchDevice ? () => {
                  deleteTap('Arte')
                  setDownloadBox(false)
                 }: undefined
                }
                onTouchEnd={() => {
                  deleteTap('Arte')
                  setDownloadBox(false)
              }}
                >×</p>
              </div>
            </div>
          </div>

          <div className="folder_content-resumefile"
            style={ArteExpand.expand ? 
              { height: 'calc(100svh - 72px)'} /// fullscreen btm nav
              : 
              {}
            }

          >
            {ArteExpand.show ? (
              <iframe 
              onClick={() => setDownloadBox(false)}
              src="https://drive.google.com/file/d/1PEbCOp-QFSuZclZfAlRaGCV_J2TgvnvZ/preview" 
              frameBorder='0'
            >
            </iframe>
            ):(null)}
            
          </div>
        </div>
      </Draggable>

    </>
  )
}          




export default Arte;









