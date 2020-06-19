import React, { useState, useContext, useRef } from "react";
import { GlobalContext } from "../context/GlobalState";
import { motion } from "framer";

export const AddTransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);
  const { addTransaction } = useContext(GlobalContext);
  const amountRef = useRef();
  const textRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();

    if(Number(amount)===0){
      alert('Please Enter Correct Value');
      amountRef.current.value = "";
      textRef.current.value = "";
      return false;
    }

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount,
    };

    addTransaction(newTransaction);
    amountRef.current.value = "";
    textRef.current.value = "";
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={submitHandler}>
        <div className="form-control">
          <label htmlFor="text">Transaction Name</label>
          <motion.input
            whileHover={{ scale: 1.2 }}
            type="text"
            ref={textRef}
            required
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter Transaction Name..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <motion.input
            whileHover={{ scale: 1.2 }}
            type="number"
            ref={amountRef}
            required
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          className="btn"
        >
          Add transaction
        </motion.button>
      </form>
    </>
  );
};
