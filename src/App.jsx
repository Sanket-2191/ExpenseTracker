

import "./App.css";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm.jsx";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo.jsx";
import ExpenseList from "./components/ExpenseList/ExpenseList.jsx";

function App() {
  return (
    <>
      <h2 className="mainHeading">Expense Tracker</h2>

      <div className="App">
        <ExpenseForm />
        <div className="expenseContainer">
          <ExpenseInfo />
          <ExpenseList />
        </div>
      </div>
    </>
  );
}

export default App;
