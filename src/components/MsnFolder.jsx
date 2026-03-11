import UseContext from '../Context';
import { useContext, useState, useRef, useEffect } from "react";
import Draggable from 'react-draggable';
import { motion } from 'framer-motion';
import msnPic from '../assets/msn.png';
import chat from '../assets/chat.png';
import nudge from '../assets/nudge.png';
import nudgeSound from '../assets/nudgeSound.mp3';
import '../css/MSN.css';

function MsnFolder() {

  const {
    chatBotActive, setChatBotActive,
    loadedMessages, setLoadedMessages,
    chatValue, setChatValue,
    userNameValue, setUserNameValue,
    chatData, createChat,
    MSNExpand, setMSNExpand,
    lastTapTime, setLastTapTime,
    themeDragBar,
    sendDisable,
    endOfMessagesRef,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    deleteTap,
    isTouchDevice,
    StyleHide,
  } = useContext(UseContext);

  const timeoutRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [userName, setUserName] = useState(false);
  const hasScrolledRef = useRef(false);

  const lastMessage =
  chatData.length > 0 && chatData[chatData.length - 1]?.date
    ? chatData[chatData.length - 1].date.slice(0, 10)
    : "No messages yet";

  useEffect(() => {
    // Scroll to bottom when MSN expands
    if (MSNExpand.show) {
      endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [MSNExpand.show]);

  function handleDragStop(event, data) {
    setMSNExpand(prev => ({
      ...prev,
      x: data.x,
      y: data.y
    }));
  }

  function handleExpandStateToggle() {
    setMSNExpand(prev => ({
      ...prev,
      expand: !prev.expand
    }));
  }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    if (now - lastTapTime < 300) {
      setMSNExpand(prev => ({
        ...prev,
        expand: !prev.expand
      }));
    }
    setLastTapTime(now);
  }

  return (
    <Draggable
      axis="both"
      handle={'.folder_dragbar-MSN'}
      grid={[1, 1]}
      scale={1}
      disabled={MSNExpand.expand}
      bounds={{ top: 0 }}
      defaultPosition={{
        x: window.innerWidth <= 500 ? 20 : 50,
        y: window.innerWidth <= 500 ? 40 : 120,
      }}
      onStop={handleDragStop}
      onStart={() => handleSetFocusItemTrue('MSN')}
    >
      <div className="folder_folder-MSN"
        style={MSNExpand.expand ? inlineStyleExpand('MSN') : inlineStyle('MSN')}
      >
        {/* ---------- Username Popup ---------- */}
        <div className={userName ? 'Username_input_div_active' : 'Username_input_div_disabled'}>
          <div className="container_username">
            <div className="form_banner" style={{ background: MSNExpand.focusItem ? themeDragBar : '#757579' }}>
              <img src={chat} alt="chat" />
              <p className='username_text_banner'>Username</p>
              <div className="close_form_banner" onClick={() => setUserName(false)}>
                <p>×</p>
              </div>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <p>Username:</p>
              <input type="text" maxLength={20} placeholder='Enter your username here...'
                value={userNameValue}
                onChange={(e) => setUserNameValue(e.target.value)}
              />
              <div className="ok_cancel_username">
                <button onClick={() => {
                  setUserName(false)
                  localStorage.setItem('username', userNameValue)
                }}>Ok</button>
                <button onClick={() => {
                  setUserName(false);
                  const localName = localStorage.getItem('username')
                  setUserNameValue(localName || '');
                }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>

        {/* ---------- Drag Bar ---------- */}
        <div className="folder_dragbar-MSN"
          onDoubleClick={handleExpandStateToggle}
          onTouchStart={handleExpandStateToggleMobile}
          style={{ background: MSNExpand.focusItem ? themeDragBar : '#757579' }}
        >
          <div className="folder_barname-MSN">
            <img src={msnPic} alt="msnPic" />
            <span>MSN</span>
          </div>
          <div className="folder_barbtn-MSN">
            <div onClick={!isTouchDevice ? (e) => {
              e.stopPropagation();
              setMSNExpand(prev => ({ ...prev, hide: true, focusItem: false }));
              StyleHide('MSN');
            } : undefined}>
              <p className='dash-MSN'></p>
            </div>
            <div onClick={!isTouchDevice ? handleExpandStateToggle : undefined} onTouchEnd={handleExpandStateToggle}>
              <motion.div className={`expand-MSN ${MSNExpand.expand ? 'full' : ''}`}></motion.div>
              {MSNExpand.expand && <div className="expand_2-MSN"></div>}
            </div>
            <div>
              <p className='x-MSN'
                onClick={!isTouchDevice ? () => { deleteTap('MSN'); setChatValue('') } : undefined}
                onTouchEnd={() => { deleteTap('MSN'); setChatValue('') }}
              >×</p>
            </div>
          </div>
        </div>

        {/* ---------- Menu ---------- */}
        <div className="file_edit_container-MSN">
          <p>File<span style={{ left: '-23px' }}>_</span></p>
          <p>Edit<span style={{ left: '-24px' }}>_</span></p>
          <p>View<span style={{ left: '-32px' }}>_</span></p>
          <p>Help<span style={{ left: '-30px' }}>_</span></p>
        </div>

        {/* ---------- Groove Icons ---------- */}
        <div className='groove_div'>
          <div className="chat_name_msn_div" onClick={() => setUserName(true)}>
            <img src={chat} alt="chat" />
          </div>
          <span>Username: {userNameValue || 'Anonymous'}</span>
          <div className={`activate_bot ${chatBotActive ? 'active' : ''}`}
            onClick={() => setChatBotActive(!chatBotActive)}>
            <span>{chatBotActive ? 'Bot Online' : 'Bot Offline'}</span>
          </div>
        </div>

        {/* ---------- Online Users ---------- */}
        <div className="chat_to_div">
          <span>Online User: <span>{1}</span></span>
        </div>

        {/* ---------- Chat Content ---------- */}
        <div className='folder_content-MSN'>
          {loadedMessages.length === 0 && (
            <span style={{ fontSize: '13px' }}>LOADING...</span>
          )}

          {loadedMessages.map((msg, index) => (
            <div className='text_container' key={index}>
              <p>
                <span style={{ color: msg.bot ? 'purple' : '#171616' }}>
                  &lt;{msg.name}&gt;:
                </span> {msg.chat}
              </p>
            </div>
          ))}
          <div ref={endOfMessagesRef} />
        </div>

        {/* ---------- Input Area ---------- */}
        <div className="enter_text_div">
          <textarea
            maxLength={100}
            placeholder='Escreva sua mensagem aqui...'
            value={chatValue}
            onChange={(e) => setChatValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') createChat(); }}
          />
          <button disabled={sendDisable} onClick={createChat}>Send</button>
        </div>

        {/* ---------- Status ---------- */}
        <div className="status_div">
          <p>
            {chatValue.trim().length > 0 ? `${userNameValue} is typing...` : `Last message received on ${lastMessage}`}
          </p>
        </div>
      </div>
    </Draggable>
  );
}

export default MsnFolder;