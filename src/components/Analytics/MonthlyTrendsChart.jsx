import React from "react";
import {
    LineChart, Line, XAxis, YAxis,
    Tooltip, Legend, CartesianGrid,
    ResponsiveContainer
} from "recharts";

const MonthlyTrendsChart = ({ data }) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedData = data.map(item => ({
        month: monthNames[item.month - 1],
        income: item.income,
        expense: item.expense
    }));

    return (
        <div className="w-full h-96 p-4 bg-transparent rounded-lg shadow-md">
            MonthlyTrends
            <ResponsiveContainer>
                <LineChart data={formattedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="income" stroke="#4CAF50" />
                    <Line type="monotone" dataKey="expense" stroke="#F44336" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MonthlyTrendsChart;
