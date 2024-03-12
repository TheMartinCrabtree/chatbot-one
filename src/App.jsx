import { useState } from "react";
import styled from "styled-components";
import viteLogo from "/vite.svg";
import "./App.css";
import "@chatscope/chat-ui-kit-react-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const LayoutContainer = styled.div`
  position: relative;
  height: 720px;
  width: 1280px;
`;

function App() {
  const [messages, setMessages] = useState([
    {
      message: "Hello world!",
      sender: "This is the Sender",
    },
  ]);

  const _renderMessages = (message) => {
    return <Message key={uuid()} model={message} />;
  };

  const _handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing", // display messages entered by user on the right
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
  };

  return (
    <LayoutContainer>
      <MainContainer>
        <ChatContainer>
          <MessageList>{_renderMessages()}</MessageList>
          <MessageInput
            placeholder="Type your message here."
            onSend={_handleSend}
          />
        </ChatContainer>
      </MainContainer>
    </LayoutContainer>
  );
}

export default App;
