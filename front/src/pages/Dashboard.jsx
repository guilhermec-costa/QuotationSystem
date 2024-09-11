import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Box, Briefcase, BarChart as BarChartIcon } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const Dashboard = () => {
    const projectInfo = {
        name: "Quotation System",
        description: "A platform to manage and track quotations efficiently.",
        version: "v1.0.0",
        contributors: ["Guilherme China"],
        repository: "https://github.com/GuiC0506/quotation-system"
    };

    const chartData = [
        { name: 'Jan', quotations: 40, suppliers: 24, products: 100, users: 50 },
        { name: 'Feb', quotations: 30, suppliers: 21, products: 120, users: 45 },
        { name: 'Mar', quotations: 20, suppliers: 22, products: 80, users: 60 },
        { name: 'Apr', quotations: 27, suppliers: 20, products: 90, users: 70 },
        { name: 'May', quotations: 18, suppliers: 21, products: 110, users: 55 },
        { name: 'Jun', quotations: 23, suppliers: 25, products: 130, users: 65 },
        { name: 'Jul', quotations: 34, suppliers: 21, products: 140, users: 75 },
    ];

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-start items-center mb-8">
                <h1 className="text-3xl font-bold">{projectInfo.name} Dashboard</h1>
                <BarChartIcon className="ml-3" size={32}/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-secondary text-secondary-foreground">
                    <CardHeader>
                        <CardTitle>Total Quotations</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <span className="text-xl font-bold">120</span>
                        <FileText className="w-6 h-6" />
                    </CardContent>
                </Card>
                <Card className="bg-secondary text-secondary-foreground">
                    <CardHeader>
                        <CardTitle>Total Suppliers</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <span className="text-xl font-bold">50</span>
                        <Briefcase className="w-6 h-6" />
                    </CardContent>
                </Card>
                <Card className="bg-secondary text-secondary-foreground">
                    <CardHeader>
                        <CardTitle>Total Users</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <span className="text-xl font-bold">350</span>
                        <Users className="w-6 h-6" />
                    </CardContent>
                </Card>
                <Card className="bg-secondary text-secondary-foreground">
                    <CardHeader>
                        <CardTitle>Total Products</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <span className="text-xl font-bold">75</span>
                        <Box className="w-6 h-6" />
                    </CardContent>
                </Card>
            </div>

            {/* Sales & Revenue Over Time */}
            <div className="bg-card p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Quotations & Suppliers Over Time</h2>
                <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="quotations" stroke="#8884d8" fill="#8884d8" />
                        <Area type="monotone" dataKey="suppliers" stroke="#82ca9d" fill="#82ca9d" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Products & Users Over Time */}
            <div className="bg-card p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Products & Users Over Time</h2>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="products" fill="#8884d8" />
                        <Bar dataKey="users" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Quotations vs Suppliers Line Chart */}
            <div className="bg-card p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Quotations vs Suppliers</h2>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="quotations" stroke="#8884d8" />
                        <Line type="monotone" dataKey="suppliers" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Project Information */}
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
