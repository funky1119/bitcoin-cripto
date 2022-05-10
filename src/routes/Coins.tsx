import styled from 'styled-components';

function Coins() {
  const Title = styled.h1`
    color: ${(props) => props.theme.color.accent};
  `;

  return <Title>Coins</Title>;
}

export default Coins;
