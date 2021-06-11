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

const PriceChart = ({ coinId }) => {
  const [data, setData] = useState();

  const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30&interval=daily`;

  const formatData = (data) => {
    let formattedData = [];
    data.prices.map((step) => {
      let day = new Date(step[0]);
      day = day.toLocaleDateString().substring(0, 5);
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
  }, []);

  return (
    <ResponsiveContainer width='100%' height={400}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id='chart-fill' x1='0' y1='0' x='0' y2='1'>
            <stop offset='0%' stopColor='#0b1f73' stopOpacity={0.4}></stop>
            <stop offset='75%' stopColor='#0b1f73' stopOpacity={0.05}></stop>
          </linearGradient>
        </defs>
        <Area dataKey='price' stroke='#dbe6fd' fill='url(#chart-fill)' />
        <XAxis dataKey='day' axisLine={false} />
        <YAxis
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
  if (active) {
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
