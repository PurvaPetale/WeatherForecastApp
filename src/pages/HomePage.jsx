import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  border-radius: 5px;
  background-color: #e1e5fc;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

function HomePage() {
  return (
    <>
      <Container>
        <Header>
          <h1>Welcome to Your Weather App</h1>
        </Header>
        <p>
          This is a simple weather forecast application. Click on the links
          above to navigate.
        </p>
      </Container>
    </>
  );
}

export default HomePage;
