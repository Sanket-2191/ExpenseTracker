import React from "react";
import { useSelector } from "react-redux";
import styles from "./ExpenseInfo.module.css";

import { transactionSelector } from "../../store/transactionSlice.js";

const ExpenseInfo = () => {
  const { transactions: expenses } = useSelector(transactionSelector);

  let profit = 0;
  let loss = 0;

  const total = expenses.reduce((acc, curr) => {
    const amount = parseInt(curr.amount);
    if (amount < 0) loss += amount;
    else profit += amount;
    return acc + amount;
  }, 0);

  return (
    <div className={styles.expenseInfoContainer}>
      <div className={styles.balance}>
        <h4>YOUR BALANCE</h4>
        <h1>INR {total.toFixed(2)}</h1>
      </div>
      <div className={styles.incomeExpenseContainer}>
        <div>
          <h4>Income</h4>
          <p id="money-plus" className={`${styles.money} ${styles.plus}`}>
            +${profit}
          </p>
        </div>
        <div>
          <h4>Expense</h4>
          <p id="money-minus" className={`${styles.money} ${styles.minus}`}>
            -${Math.abs(loss)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseInfo;
