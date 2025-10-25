import { useState } from "react";

function AddTodo({ onNewItem }) {
  const [todoName, setTodoName] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleNameChange = (event) => {
    setTodoName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleAddButtonClicked = () => {
    if (!todoName.trim() || !dueDate) return;
    onNewItem(todoName, dueDate);
    setDueDate("");
    setTodoName("");
  };

  return (
    <form
      className="flex flex-col sm:flex-row gap-3 mb-6"
      onSubmit={(e) => {
        e.preventDefault();
        handleAddButtonClicked();
      }}
    >
      <input
        type="text"
        placeholder="Enter Todo Here"
        value={todoName}
        onChange={handleNameChange}
        className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
      />
      <input
        type="date"
        value={dueDate}
        onChange={handleDateChange}
        className="px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
      />
      <button
        type="submit"
        className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg active:scale-95"
      >
        Add
      </button>
    </form>
  );
}

export default AddTodo;