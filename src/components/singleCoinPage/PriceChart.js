import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const PriceChart = ({ coinId, days }) => {
  const [data, setData] = useState();
  let interval = 'hourly';
  if (days === 365) interval = 'daily';
  if (days === 1) interval = 'minutely';

  const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=${interval}`;

  const formatData = (data) => {
    let formattedData = [];
    data.prices.forEach((step) => {
      let day = new Date(step[0]);
      if (days === 1) day = day.toLocaleTimeString().substring(0, 5);
      else if (days === 30) day = day.toLocaleDateString().substring(0, 5);
      else if (days === 365) day = day.getFullYear();
      let price = step[1];
      formattedData.push({ day, price });
    });
    setData(formattedData);
    console.log(formattedData);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      formatData(data);
    };
    fetchData();
  }, [url]);

  return (
    <ResponsiveContainer width='100%' height={400}>
      <AreaChart
        data={data}
        margin={{ top: 0, right: 10, bottom: 0, left: 25 }}
      >
        <defs>
          <linearGradient id='chart-fill' x1='0' y1='0' x='0' y2='1'>
            <stop offset='0%' stopColor='#0b1f73' stopOpacity={0.4}></stop>
            <stop offset='75%' stopColor='#0b1f73' stopOpacity={0.05}></stop>
          </linearGradient>
        </defs>
        <Area dataKey='price' stroke='#dbe6fd' fill='url(#chart-fill)' />
        <XAxis dataKey='day' axisLine={false} domain={['auto', 'auto']} />
        <YAxis
          domain={['auto', 'auto']}
          dataKey='price'
          axisLine={false}
          tickLine={false}
          tickCount={8}
          tickFormatter={(number) => `$${number.toFixed(2)}`}
        />
        <Tooltip content={<ChartTooltip />} />
        <CartesianGrid opacity={0.05} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload) {
    return (
      <div className='tooltip'>
        <h4>{label}</h4>
        <p>${payload[0].value.toFixed(4)}</p>
      </div>
    );
  }
  return null;
};

export default PriceChart;
