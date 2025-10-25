function TodoItem({ id, todoName, todoDate, completed, onDeleteClick, onToggleCompleted }) {
  // Format date as YYYY-MM-DD or locale string
  const formattedDate = todoDate
    ? new Date(todoDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
    : "";

  return (
    <div className={`flex items-center justify-between rounded-lg px-4 py-3 shadow ${completed ? "bg-green-50 opacity-70" : "bg-purple-50"}`}>
      <div className="flex items-center flex-1">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggleCompleted(id)}
          className="mr-3 accent-purple-600 w-5 h-5"
        />
        <div>
          <span className={`block text-lg font-medium ${completed ? "line-through text-gray-400" : "text-gray-800"}`}>{todoName}</span>
          <span className="block text-sm text-gray-500">{formattedDate}</span>
        </div>
      </div>
      <button
        type="button"
        className="ml-4 px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
        onClick={() => onDeleteClick(id)}
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem;