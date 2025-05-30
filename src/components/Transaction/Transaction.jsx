import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTransaction, setEditing, setToUpdate } from "../../store/transactionSlice.js";
import styles from "./Transaction.module.css";
import EditImage from "../../images/edit.png";
import DeleteImage from "../../images/trash-bin.png";

const Transaction = ({ expense }) => {
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);

  const handleEdit = () => {
    dispatch(setToUpdate(expense));
    dispatch(setEditing({ id: expense.id, status: true }));
  };

  return (
    <li
      className={`${styles.transaction} ${expense.amount > 0 ? styles.profit : styles.loss}`}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div>{expense.text}</div>
      <div className={styles.transactionOptions}>
        <div className={`${styles.amount} ${hover && styles.movePrice}`}>
          ${expense.amount}
        </div>
        <div className={`${styles.btnContainer} ${hover && styles.active}`}>
          <div className={styles.edit} onClick={handleEdit}>
            <img src={EditImage} height="100%" alt="Edit" />
          </div>
          <div className={styles.delete} onClick={() => dispatch(deleteTransaction(expense.id))}>
            <img src={DeleteImage} height="100%" alt="Delete" />
          </div>
        </div>
      </div>
    </li>
  );
};

export default Transaction;
