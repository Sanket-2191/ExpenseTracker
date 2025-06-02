import React from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { transactionSelector } from "../../store/transactionSlice";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#009688", "#9C27B0", "#795548"];

const CategoryTrends = () => {
    const { transactions } = useSelector(transactionSelector);

    // Group by category and sum
    const categoryTotals = transactions.reduce((acc, txn) => {
        if (txn.type === "expense") {
            acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
        }
        return acc;
    }, {});

    const data = Object.entries(categoryTotals).map(([category, amount]) => ({
        category,
        amount
    }));

    return (
        <div style={{ width: "100%", height: 300 }}>
            <h4 className="mb-2">Category-wise Spending</h4>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="amount"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CategoryTrends;
