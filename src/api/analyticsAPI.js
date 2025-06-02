import axios from "axios";
const domain = import.meta.env.VITE_API_URL;

const API_URL = `${domain}/analytics-dashboard`;

export const getBudgetOverview = (month, year) =>
    axios.get(`${domain}/overview`, {
        withCredentials: true,
        params: { month, year },
    });

export const getOverspentCategories = (month, year) =>
    axios.get(`${domain}/overspent`, {
        withCredentials: true,
        params: { month, year },
    });

export const getBudgetVsTransaction = (month, year) =>
    axios.get(`${domain}/compare`, {
        withCredentials: true,
        params: { month, year },
    });

export const getMonthlyTrends = (year) =>
    axios.get(`${domain}/monthly-trends`, {
        withCredentials: true,
        params: { year },
    });