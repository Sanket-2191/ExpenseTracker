import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './index.css';
import App from './App.jsx';
import { store, persistor } from './store/store.js';

import ExpenseForm from './components/ExpenseForm/ExpenseForm.jsx';
import ExpenseList from './components/ExpenseList/ExpenseList.jsx';
import BudgetForm from './components/BudgetForm.jsx';
import Analytics from './components/Analytics/Analytics.jsx';
import Home from './pages/Home.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import AuthLayout from './components/AuthLayout.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "add-transaction", element: <AuthLayout><ExpenseForm /></AuthLayout> },
      { path: "transaction-history", element: <AuthLayout><ExpenseList /></AuthLayout> },
      // { path: "create-budget", element: <AuthLayout></AuthLayout><BudgetForm /> },
      { path: "analytics", element: <AuthLayout><Analytics /></AuthLayout> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
