import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Coins() {
  const Container = styled.div`
    padding: 0 20px;
  `;
  const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.color.accent};
  `;
  const CoinList = styled.ul``;
  const Coin = styled.li`
    background-color: #fff;
    color: ${(props) => props.theme.color.bg};
    border-radius: 15px;
    margin-bottom: 10px;
    a {
      padding: 20px;
      transition: color 0.2s ease-in;
      display: block;
    }
    &:hover {
      a {
        color: ${(props) => props.theme.color.accent};
      }
    }
  `;

  const coins = [
    {
      id: 'btc-bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      rank: 1,
      is_new: false,
      is_active: true,
      type: 'coin',
    },
    {
      id: 'eth-ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      rank: 2,
      is_new: false,
      is_active: true,
      type: 'coin',
    },
    {
      id: 'hex-hex',
      name: 'HEX',
      symbol: 'HEX',
      rank: 3,
      is_new: false,
      is_active: true,
      type: 'token',
    },
  ];

  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      <CoinList>
        {coins.map((coin) => (
          <Coin key={coin.id}>
            <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
          </Coin>
        ))}
      </CoinList>
    </Container>
  );
}

export default Coins;
