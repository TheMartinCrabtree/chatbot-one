import styled from "styled-components";

const InnerLayoutWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  height: 720px;
  width: 1280px;
`;

// position: relative;

const LayoutContainer = ({ children }) => {
  return (
    <InnerLayoutWrapper>
      <h1>Chat with a New Yorker</h1>
      <div>Using Chatscope UI and ChatGPT API</div>
      {children}
    </InnerLayoutWrapper>
  );
};

export default LayoutContainer;
