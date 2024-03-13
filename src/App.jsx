import { useState } from "react";
import styled from "styled-components";
// import viteLogo from "/vite.svg";
import "./App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const API_KEY = "testing";

const LayoutContainer = styled.div`
  position: relative;
  height: 720px;
  width: 1280px;
`;

const App = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello world!",
      sender: "This is the Sender",
    },
  ]);

  const _renderMessages = (messages) => {
    return messages.map((message, index) => {
      return <Message key={index} model={message} />;
    });
  };

  const _handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing", // display messages entered by user on the right
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    setIsTyping(true);
  };

  return (
    <LayoutContainer>
      <MainContainer>
        <ChatContainer>
          <MessageList
            typingIndicator={
              isTyping ? (
                <TypingIndicator content="Please wait. A response is being written..." />
              ) : null
            }
          >
            {messages && _renderMessages(messages)}
          </MessageList>
          <MessageInput
            placeholder="Type your message here."
            onSend={_handleSend}
          />
        </ChatContainer>
      </MainContainer>
    </LayoutContainer>
  );
};

export default App;
