
import useAuth from '../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { FaBook, FaDollarSign, FaJediOrder, FaUser } from 'react-icons/fa6';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = ({ fill, x, y, width, height }) => {
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin-stats');
      return res.data;
    },
  });

  const { data: chartData = [] } = useQuery({
    queryKey: ['order-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/order-stats');
      return res.data;
    },
  });

  console.log('Order Stats (chartData):', chartData);

  const piChartData = chartData.map((data) => ({
    name: data.category,
    value: data.revenue,
  }));

  if (!stats) {
    return <p className="text-center text-lg mt-10">Loading admin stats...</p>;
  }

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Hi, Welcome {user?.displayName || 'Back'}</h1>

      <div className="stats shadow mt-6 grid grid-cols-4 gap-4">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaDollarSign />
          </div>
          <div className="stat-title">Revenue</div>
          {/* <div className="stat-value">${stats.revenue}</div> */}
          <div className="stat-value">${stats.revenue?.toFixed(2)}</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaUser />
          </div>
          <div className="stat-title">Users</div>
          <div className="stat-value">{stats.users}</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaJediOrder />
          </div>
          <div className="stat-title">Orders</div>
          <div className="stat-value">{stats.order}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaBook />
          </div>
          <div className="stat-title">Menu Items</div>
          <div className="stat-value">{stats.menuItems}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="w-full md:w-1/2">
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </div>

        <div className="w-full md:w-1/2">
          <PieChart width={400} height={400}>
            <Pie
              data={piChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
               minAngle={30}
            >
              {piChartData.map((entry, index) => (
                <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend></Legend>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
