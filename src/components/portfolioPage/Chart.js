import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from 'recharts';

const colors = ['#E8505B', '#F9D56E', '#F3ECC2', '#14B1AB'];

const Chart = ({ data }) => {
  const renderLabel = (entry) => {
    return entry.name.toUpperCase();
  };
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx='50%'
          cy='50%'
          innerRadius={60}
          outerRadius={80}
          fill='#8884d8'
          dataKey='value'
          label={renderLabel}
          nameKey='name'
          stroke='#020925'
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Chart;
