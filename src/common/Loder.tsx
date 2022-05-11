import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
`;

const animation = keyframes`
    0% {
    top: 8px;
    height: 64px;
  }
  50%, 100% {
    top: 24px;
    height: 32px;
  }
`;

const Loding = styled.div`
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: ${(props) => props.theme.color.text};
  animation: ${animation} 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;

  left: 32px;
  animation-delay: -0.12s;
  &:first-child {
    left: 8px;
    animation-delay: -0.24s;
  }
  &:last-child {
    left: 56px;
    animation-delay: 0s;
  }
`;

function Loader() {
  return (
    <Container>
      <Loding />
      <Loding />
      <Loding />
    </Container>
  );
}

export default Loader;
