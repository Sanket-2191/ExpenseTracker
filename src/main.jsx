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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <ExpenseForm /> },
      { path: "transactions", element: <ExpenseList /> },
      { path: "budget", element: <BudgetForm /> },
      { path: "analytics", element: <Analytics /> },
    ],
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
      <Provider store={store}>
        <App />
      </Provider>
    </RouterProvider>
  </StrictMode>,
)


// TODO: on clicking of edit shift focus to transaction form