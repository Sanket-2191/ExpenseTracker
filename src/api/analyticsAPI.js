import axios from "axios";
const domain = import.meta.env.VITE_API_URL;

const API_URL = `${domain}/analytics-dashboard`;

export const getBudgetOverview = (month, year) =>
    axios.get(`${API_URL}/overview`, {
        withCredentials: true,
        params: { month, year },
    });

export const getOverspentCategories = (month, year) =>
    axios.get(`${API_URL}/overspent`, {
        withCredentials: true,
        params: { month, year },
    });

export const getBudgetVsTransaction = (month, year) =>
    axios.get(`${API_URL}/compare`, {
        withCredentials: true,
        params: { month, year },
    });

export const getMonthlyTrends = (year) =>
    axios.get(`${API_URL}/monthly-trends`, {
        withCredentials: true,
        params: { year },
    });