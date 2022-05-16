import { useOutletContext } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import styled, { css } from 'styled-components';
import moment from 'moment';

interface IContext {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const Container = styled.div``;

const Table = styled.table`
  width: 100%;
  border: 1px solid #222;
  margin-bottom: 30px;
`;
const Th = styled.th`
  font-size: 13px;
  border: 1px solid #222;
  padding: 8px 5px;
  background-color: ${(props) => props.theme.color.accent};
`;

const Td = styled.td`
  font-size: 13px;
  border: 1px solid #222;
  text-align: center;
  padding: 8px 5px;
`;

function Price() {
  const { coinId } = useOutletContext<IContext>();
  const { isLoading, data } = useQuery<IHistorical[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 10000 }
  );

  return (
    <Container>
      {isLoading ? (
        'Loading Price...'
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>날짜</Th>
              <Th>최고가</Th>
              <Th>최저가</Th>
              <Th>종가</Th>
            </tr>
          </thead>
          {data?.map((coinInfo, index) => (
            <tbody key={index} style={{ borderRadius: 10 }}>
              <tr>
                <Td>
                  {moment(coinInfo.time_close).utc().format('YYYY.MM.DD')}
                </Td>
                <Td>${coinInfo.high.toFixed(2)}</Td>
                <Td>${coinInfo.low.toFixed(2)}</Td>
                <Td>${coinInfo.close.toFixed(2)}</Td>
              </tr>
            </tbody>
          ))}
        </Table>
      )}
    </Container>
  );
}
export default Price;
