import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect } from "react";

import {
  createTransaction,
  updateTransaction,
  resetEditing
} from "../../store/transactionSlice.js";

import styles from "./ExpenseForm.module.css";

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const { editing, toUpdate } = useSelector((state) => state.transactions);

  const expenseTextInput = useRef();
  const expenseAmountInput = useRef();

  useEffect(() => {
    if (toUpdate) {
      expenseTextInput.current.value = toUpdate.text;
      expenseAmountInput.current.value = toUpdate.amount;
    } else {
      expenseTextInput.current.value = "";
      expenseAmountInput.current.value = "";
    }
  }, [toUpdate]);

  const clearInput = () => {
    expenseTextInput.current.value = "";
    expenseAmountInput.current.value = "";
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const text = expenseTextInput.current.value.trim();
    const amount = parseFloat(expenseAmountInput.current.value);

    if (!text || isNaN(amount) || amount === 0) return;

    if (!editing.status) {
      dispatch(createTransaction({ text, amount }));
    } else {
      dispatch(updateTransaction({ id: toUpdate.id, text, amount }));
      dispatch(resetEditing());
    }

    clearInput();
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <h3>{editing.status ? "Edit Transaction" : "Add New Transaction"}</h3>
      <label htmlFor="expenseText">Text</label>
      <input
        id="expenseText"
        className={styles.input}
        type="text"
        placeholder="Enter text..."
        ref={expenseTextInput}
        required
      />
      <div>
        <label htmlFor="expenseAmount">Amount</label>
        <div>(negative - expense, positive - income)</div>
      </div>
      <input
        className={styles.input}
        id="expenseAmount"
        type="number"
        placeholder="Enter amount..."
        ref={expenseAmountInput}
        required
      />
      <button className={styles.submitBtn}>
        {editing.status ? "Edit Transaction" : "Add Transaction"}
      </button>
    </form>
  );
};

export default ExpenseForm;
