import { createContext, useContext } from 'react';
const ChatContext = createContext();

const chatProvider = ({ children }) => {
    return <ChatContext.Provider>{children}</ChatContext.Provider>
}

useContext(ChatContext);

export default chatProvider;