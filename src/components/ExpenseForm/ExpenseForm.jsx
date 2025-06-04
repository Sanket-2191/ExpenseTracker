import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  createTransaction,
  updateTransaction,
  resetEditing,
} from "../../store/transactionSlice.js";

import styles from "./ExpenseForm.module.css";
import Button from "../Button.jsx";
import Select from "../Select.jsx";
import Input from "../Input.jsx";

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const { editing, toUpdate } = useSelector((state) => state.transactions);

  const descriptionInput = useRef();
  const amountInput = useRef();

  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);

  const expenseCategories = [
    "food",
    "transport",
    "shopping",
    "utilities",
    "entertainment",
    "investment",
    "vehicle maintainence",
    "other",
  ];
  const incomeCategories = ["salary", "freelance", "gift", "other"];
  const categoryOptions = type === "income" ? incomeCategories : expenseCategories;

  useEffect(() => {
    if (toUpdate) {
      descriptionInput.current.value = toUpdate.note || "";
      amountInput.current.value = toUpdate.amount;
      setType(toUpdate.type);
      setCategory(toUpdate.category);
      setDate(toUpdate.date?.split("T")[0] || new Date().toISOString().split("T")[0]);
    } else {
      clearInputs();
    }
  }, [toUpdate]);

  const clearInputs = () => {
    descriptionInput.current.value = "";
    amountInput.current.value = "";
    setType("expense");
    setCategory("food");
    setDate(new Date().toISOString().split("T")[0]);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const description = descriptionInput.current.value.trim();
    const amount = parseFloat(amountInput.current.value);

    if (!description || isNaN(amount) || amount === 0) return;

    const payload = {
      note: description,
      amount,
      category,
      type,
      date,
      userId: toUpdate?.userId || null
    };

    // console.log("Submitting payload:", payload);


    if (!editing.status) {
      dispatch(createTransaction(payload))
        .unwrap()
        .then(() => toast.success("Transaction added! ✅"))
        .catch((err) => toast.error(err || "Failed to add transaction ❌"));
    } else {
      // console.log("Updating transaction with ID:", toUpdate._id);
      dispatch(updateTransaction({ id: toUpdate._id, ...payload }))
        .unwrap()
        .then(() => toast.success("Transaction updated! ✏️"))
        .catch((err) => toast.error("Update failed ❌"));

      dispatch(resetEditing());
    }

    clearInputs();
  };

  return (
    <form
      className={`${styles.form} md:w-[50%] lg:w-[45%] border border-dashed border-[#00bcff]`}
      onSubmit={onSubmitHandler}
    >
      <h3>{editing.status ? "Edit Transaction" : "Add New Transaction"}</h3>

      <Input
        label="Description"
        placeholder="Enter description..."
        ref={descriptionInput}
        className={styles.input}
        required
      />

      <Input
        label="Amount"
        type="number"
        placeholder="Enter amount..."
        ref={amountInput}
        className={styles.input}
        required
      />

      <Select
        label="Type"
        options={["expense", "income"]}
        value={type}
        onChange={(e) => setType(e.target.value)}
        className={styles.input}
      />

      <Select
        label="Category"
        options={categoryOptions}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={styles.input}
      />

      <Input
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        // className={styles.input}
        required
      />

      <Button className={styles.submitBtn} type="submit">
        {editing.status ? "Update" : "Add"}
      </Button>
    </form>
  );
};

export default ExpenseForm;
