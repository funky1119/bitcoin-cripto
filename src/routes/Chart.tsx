import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';

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

function Chart() {
  const { coinId } = useOutletContext<IContext>();
  const { isLoading, data } = useQuery<IHistorical[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 10000 }
  );
  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: 'Price',
              data: data?.map((price) => price.close) || [],
            },
          ]}
          options={{
            theme: { mode: 'dark' },
            chart: {
              toolbar: { show: false },
              width: 500,
              height: 500,
              background: 'transparent',
            },
            stroke: { curve: 'smooth', width: 3 },
            grid: { show: false },
            xaxis: {
              labels: { show: false },
              type: 'datetime',
              axisTicks: { show: false },
              axisBorder: { show: false },
              categories: data?.map((price) => price.time_close),
            },
            yaxis: { show: false },
            fill: {
              type: 'gradient',
              gradient: { gradientToColors: ['blue'], stops: [0, 100] },
            },
            colors: ['red'],
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}
export default Chart;
