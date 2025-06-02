import React, { useEffect, useState } from "react";


import MonthlyTrendsChart from "./MonthlyTrendsChart";
import CategoryTrends from "./CategoryTrends";
import { getMonthlyTrends } from "../../api/analyticsAPI.js";

const Analytics = () => {
    const [monthlyData, setMonthlyData] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const fetchMonthlyTrends = async () => {
            try {
                const res = await getMonthlyTrends(year);
                setMonthlyData(res.data.data);
                // console.log("Monthly Trends Data:", res.data.data);


            } catch (err) {
                console.error("Failed to load trends", err);
            }
        };

        fetchMonthlyTrends();
    }, [year]);

    return (
        <div className="w-full p-4 flex flex-col gap-4 mb-10 h-fit">
            <h2 className="text-xl font-semibold">Analytics</h2>
            <MonthlyTrendsChart data={monthlyData} />
            <CategoryTrends />
        </div>
    );
};

export default Analytics;
