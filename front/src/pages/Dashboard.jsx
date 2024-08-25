import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Users, Activity, DollarSign } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    const projectInfo = {
        name: "Quotation System",
        description: "A platform to manage and track quotations efficiently.",
        version: "v1.0.0",
        contributors: ["Guilherme China"],
        repository: "https://github.com/GuiC0506/quotation-system"
    };

    const chartData = [
        { name: 'Jan', sales: 4000, revenue: 2400 },
        { name: 'Feb', sales: 3000, revenue: 2210 },
        { name: 'Mar', sales: 2000, revenue: 2290 },
        { name: 'Apr', sales: 2780, revenue: 2000 },
        { name: 'May', sales: 1890, revenue: 2181 },
        { name: 'Jun', sales: 2390, revenue: 2500 },
        { name: 'Jul', sales: 3490, revenue: 2100 },
    ];

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">{projectInfo.name} Dashboard</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-secondary text-secondary-foreground">
                    <CardHeader>
                        <CardTitle>Total Sales</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <span className="text-xl font-bold">1200</span>
                        <ShoppingCart className="w-6 h-6" />
                    </CardContent>
                </Card>
                <Card className="bg-secondary text-secondary-foreground">
                    <CardHeader>
                        <CardTitle>Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <span className="text-xl font-bold">$24,000</span>
                        <DollarSign className="w-6 h-6" />
                    </CardContent>
                </Card>
                <Card className="bg-secondary text-secondary-foreground">
                    <CardHeader>
                        <CardTitle>Active Users</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <span className="text-xl font-bold">350</span>
                        <Users className="w-6 h-6" />
                    </CardContent>
                </Card>
                <Card className="bg-secondary text-secondary-foreground">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <span className="text-xl font-bold">75</span>
                        <Activity className="w-6 h-6" />
                    </CardContent>
                </Card>
            </div>

            <div className="bg-card p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Sales & Revenue Over Time</h2>
                <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="sales" stroke="#8884d8" fill="#8884d8" />
                        <Area type="monotone" dataKey="revenue" stroke="#82ca9d" fill="#82ca9d" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Project Information</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>Name:</strong> {projectInfo.name}</li>
                    <li><strong>Description:</strong> {projectInfo.description}</li>
                    <li><strong>Version:</strong> {projectInfo.version}</li>
                    <li><strong>Contributors:</strong> {projectInfo.contributors.join(", ")}</li>
                </ul>
            </div>
        </div>
    );
}

export default memo(Dashboard);
