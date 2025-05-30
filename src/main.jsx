import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'


import './index.css'
import App from './App.jsx'
import { store } from './store/store.js'
import ExpenseForm from './components/ExpenseForm/ExpenseForm.jsx'
import ExpenseList from './components/ExpenseList/ExpenseList.jsx'
import BudgetForm from './components/BudgetForm.jsx'
import Analytics from './components/Analytics/Analytics.jsx'
import Home from './pages/Home.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "add-transaction", element: <ExpenseForm /> },
      { path: "transaction-history", element: <ExpenseList /> },
      { path: "create-budget", element: <BudgetForm /> },
      { path: "analytics", element: <Analytics /> },
    ],
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)

// TODO: on clicking of edit shift focus to transaction form