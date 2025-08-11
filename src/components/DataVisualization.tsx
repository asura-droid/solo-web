import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const sampleData = [
  { name: 'Jan', value: 400, growth: 240 },
  { name: 'Feb', value: 300, growth: 139 },
  { name: 'Mar', value: 200, growth: 980 },
  { name: 'Apr', value: 278, growth: 390 },
  { name: 'May', value: 189, growth: 480 },
  { name: 'Jun', value: 239, growth: 380 },
];

const pieData = [
  { name: 'Category A', value: 35, color: 'hsl(var(--chart-1))' },
  { name: 'Category B', value: 25, color: 'hsl(var(--chart-2))' },
  { name: 'Category C', value: 20, color: 'hsl(var(--chart-3))' },
  { name: 'Category D', value: 20, color: 'hsl(var(--chart-4))' },
];

export const DataVisualization = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <Card className="p-6 bg-glass backdrop-blur-glass border-glass">
        <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sampleData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }} 
            />
            <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Line Chart */}
      <Card className="p-6 bg-glass backdrop-blur-glass border-glass">
        <h3 className="text-lg font-semibold text-foreground mb-4">Growth Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sampleData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="growth" 
              stroke="hsl(var(--chart-2))" 
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--chart-2))', strokeWidth: 2, r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Pie Chart */}
      <Card className="p-6 bg-glass backdrop-blur-glass border-glass">
        <h3 className="text-lg font-semibold text-foreground mb-4">Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Stats Card */}
      <Card className="p-6 bg-glass backdrop-blur-glass border-glass">
        <h3 className="text-lg font-semibold text-foreground mb-4">Key Metrics</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-accent">
            <span className="text-foreground">Total Records</span>
            <span className="text-xl font-bold text-ai-primary">12,543</span>
          </div>
          <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-accent">
            <span className="text-foreground">Data Quality</span>
            <span className="text-xl font-bold text-ai-secondary">94.5%</span>
          </div>
          <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-accent">
            <span className="text-foreground">Missing Values</span>
            <span className="text-xl font-bold text-ai-accent">127</span>
          </div>
          <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-accent">
            <span className="text-foreground">Outliers Detected</span>
            <span className="text-xl font-bold text-chart-3">8</span>
          </div>
        </div>
      </Card>
    </div>
  );
};