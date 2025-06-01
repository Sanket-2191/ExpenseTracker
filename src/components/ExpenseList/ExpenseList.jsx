import React from "react";
import { useSelector } from "react-redux";
import styles from "./ExpenseList.module.css";

import Transaction from "../Transaction/Transaction.jsx";
import { transactionSelector } from "../../store/transactionSlice.js";

const ExpenseList = () => {
  const { transactions: expenses } = useSelector(transactionSelector);

  return (
    <div className={styles.expenseListContainer}>
      <h3>Transactions</h3>
      <ul className={styles.transactionList}>
        {expenses.map((expense) => (
          <Transaction key={expense._id} expense={expense} />
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
