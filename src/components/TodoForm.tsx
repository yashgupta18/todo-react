import React, { useState, useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import Button from "./Button";

const TodoForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const { addTodo } = useContext(TodoContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo(title);
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{display:'flex', flexDirection:'column'}}>
        <input
          style={{height:"30px", margin: '10px' }}
          type="text"
          placeholder="Enter a new todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />
        <Button type="submit" title="Add Todo" />
      </div>
    </form>
  );
};

export default TodoForm;
