import React, { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
export interface Todo {
  id: string;
  title: string;
  subtasks: Todo[];
}

interface TodoContextType {
  todos: Todo[];
  addTodo: (title: string) => void;
  addSubtask: (parentId: string, title: string) => void;
}

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  addTodo: () => {},
  addSubtask: () => {}
});

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: uuidv4(),
      title,
      subtasks: []
    };

    console.log({ newTodo });
    setTodos([...todos, newTodo]);
  };

  const addSubtask = (parentId: string, title: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === parentId) {
        const newSubtask: Todo = {
          id: uuidv4(),
          title,
          subtasks: []
        };
        return { ...todo, subtasks: [...todo.subtasks, newSubtask] };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, addSubtask }}>
      {children}
    </TodoContext.Provider>
  );
};
