import React, { useState, useEffect } from "react";
import axios from "axios";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const limitedData = response.data.slice(0, 10);
      setTodos(limitedData);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        {
          title: newTodo,
          completed: false,
        }
      );
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const updateTodo = async (id) => {
    try {
      const updatedTodos = [...todos];
      const todoToUpdate = updatedTodos.find((todo) => todo.id === id);
      todoToUpdate.completed = !todoToUpdate.completed;
      await axios.put(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        todoToUpdate
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        placeholder="Add a new task"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <div key={todo.id}>
            <div
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
              onClick={() => updateTodo(todo.id)}
            >
              {todo.title}
            </div>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
