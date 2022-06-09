import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { fetchCoins } from '../api';
import { isDarkAtom } from '../atoms';
import Loader from '../common/Loder';

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50%;
`;
const Title = styled.h1`
  font-size: 36px;
  color: ${(props) => props.theme.color.accent};
`;
const Toggle = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px 30px;
  border-radius: 10px;
  border: transparent;
  background-color: ${(props) => props.theme.color.box};
  color: ${(props) => props.theme.color.text};
  box-shadow: 10px 20px rgba(${(props) => props.theme.color.box} 0.8);
`;
const CoinList = styled.ul``;
const Coin = styled.li`
  background-color: ${(props) => props.theme.color.box};
  color: ${(props) => props.theme.color.text};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
    line-height: 1px;
    &:hover {
      color: ${(props) => props.theme.color.accent};
    }
  }
`;
const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
function Coins() {
  const setDarkTheme = useSetRecoilState(isDarkAtom);
  const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins);
  const toggleDarkTheme = () => setDarkTheme((prev: boolean) => !prev);

  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>코인</title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <Title>코인</Title>
        <Toggle onClick={toggleDarkTheme}>Toggle Mode</Toggle>
      </Header>
      {isLoading ? (
        <LoadingContainer>
          <Loader />
        </LoadingContainer>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  alt={coin.symbol}
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
