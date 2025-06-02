import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ExpenseList.module.css";

import Transaction from "../Transaction/Transaction.jsx";
import { transactionSelector, fetchTransactions } from "../../store/transactionSlice.js";

const ExpenseList = () => {
  const { transactions: expenses } = useSelector(transactionSelector);
  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(fetchTransactions())
  }, [dispatch]);

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
