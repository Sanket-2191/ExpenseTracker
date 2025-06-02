import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTransaction, setEditing, setToUpdate } from "../../store/transactionSlice.js";
import styles from "./Transaction.module.css";
import EditImage from "../../images/edit.png";
import DeleteImage from "../../images/trash-bin.png";
import { useNavigate } from "react-router-dom";

const Transaction = ({ expense }) => {
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const handleEdit = () => {
    dispatch(setToUpdate(expense));
    dispatch(setEditing({ id: expense._id, status: true }));
    navigate('/add-transaction');
  };

  return (
    <li
      className={` w-[90%] flex my-1.5 px-2 border-b-1 border-dashed border-[#0099ff]
         pb-1 justify-between items-center ${expense.type == "income" ? styles.profit : styles.loss}`}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div>{expense.note}</div>
      <div className={styles.transactionOptions}>
        <div className={`${styles.amount} `}> {/*${hover ? styles.movePrice : ""}*/}
          ${expense.amount}
        </div>
        <div className={`scale-5 mt-0 mb-5`}> {/*${hover ? styles.active : ""}*/}
          <div className={styles.edit} onClick={handleEdit}>
            <img src={EditImage} height="100%" alt="Edit" />
          </div>
          {/* <div className="" onClick={() => dispatch(deleteTransaction(expense._id))}>
            <img src={DeleteImage} height="100%" alt="Delete" />
          </div> */}
        </div>
      </div>
    </li>
  );
};

export default Transaction;
