import { useParams } from 'react-router-dom';

function Coin() {
  console.log('slslsl');
  const { coinId } = useParams();
  return <h1>Coin: {coinId}</h1>;
}

export default Coin;
