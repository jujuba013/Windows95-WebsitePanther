// Context.js sem JSX
import { createContext, useState } from 'react';
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Estados do chat
  const [chatData, setChatData] = useState([]);          
  const [loadedMessages, setLoadedMessages] = useState([]); 
  const [chatValue, setChatValue] = useState('');        
  const [userNameValue, setUserNameValue] = useState('Anonymous'); 




const createChat = async () => {
  if (chatValue.trim() === '') return;

  const newMessage = {
    name: userNameValue || 'Anonymous',
    chat: chatValue,
    date: new Date().toISOString(),
    bot: false
  };

  try {
    await axios.post("http://localhost:5000/chat/send", newMessage);

    setChatData(prev => [...prev, newMessage]);
    setLoadedMessages(prev => [...prev, newMessage]);
    setChatValue('');
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
  }
};



  // Retorna o Provider com todos os valores e funções
  return React.createElement(
    UserContext.Provider,
    {
      value: {
        chatData,
        setChatData,
        loadedMessages,
        setLoadedMessages,
        chatValue,
        setChatValue,
        userNameValue,
        setUserNameValue,
        createChat
      }
    },
    children
  );
};

export default UserContext;