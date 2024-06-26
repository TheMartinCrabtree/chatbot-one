import { useState } from "react";
import styled from "styled-components";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import LayoutContainer from "./components/LayoutContainer";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const API_KEY = import.meta.env.VITE_TEST_KEY;

const App = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    // {
    //   message: "example message format",
    //   sender: "This is the Sender",
    // },
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

    await _getChatGPTUpdate(newMessages);
  };

  const _getChatGPTUpdate = async (chatMessages) => {
    // notes: object differences in chat/api messages arrays
    // chatMessages { sender: "user" or "ChatGPT", message: "message content" }
    // apiMessages { role: "user" or "assistant", content: "message content" }
    // have to transmute array from chatMessages to apiMessages before sending to API
    let apiMessages = chatMessages.map((messageObj) => {
      let newMessageObj = {
        content: messageObj.message,
      };
      newMessageObj.role =
        messageObj.sender === "ChatGPT" ? "assistant" : "user";

      return newMessageObj;
    });

    // prefix role to set style of GPT response
    const systemMessage = {
      role: "system",
      content: "Explain all concepts in the tone of a New Yorker.",
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        const newMessage =
          data &&
          data.choices &&
          data.choices[0] &&
          data.choices[0].message &&
          data.choices[0].message.content
            ? data.choices[0].message.content
            : "Sorry! There was an issue contacting ChatGPT";
        setMessages([
          ...chatMessages,
          {
            message: newMessage,
            sender: "ChatGPT",
          },
        ]);
        setIsTyping(false);
      });
  };

  return (
    <LayoutContainer>
      <MainContainer>
        <ChatContainer>
          <MessageList
            scrollBehavior="smooth"
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
