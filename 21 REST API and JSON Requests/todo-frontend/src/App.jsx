import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import WelcomeMessage from "./components/WelcomeMessage";
import { useState, useEffect } from "react";
import { addItemToServer, deleteItemFromServer, getItemsFromServer } from "./services/itemsService";

function App() {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    getItemsFromServer().then(initialItems => {
      setTodoItems(initialItems);
    });
  }, []);

  const handleNewItem = async (itemName, itemDueDate) => {
    const item = await addItemToServer(itemName, itemDueDate);
    const newTodoItems = [...todoItems, item];
    setTodoItems(newTodoItems);
  };

  const handleDeleteItem = async (id) => {
    const deletedId = await deleteItemFromServer(id);
    const newTodoItems = todoItems.filter((item) => item.id !== deletedId);
    setTodoItems(newTodoItems);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header Section with gradient background */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
          <AppName />
        </div>
        
        {/* Content Section */}
        <div className="p-6 space-y-6">
          <AddTodo onNewItem={handleNewItem} />
          
          {todoItems.length === 0 && <WelcomeMessage />}
          
          <TodoItems
            todoItems={todoItems}
            onDeleteClick={handleDeleteItem}
          />
        </div>
      </div>
    </div>
  );
}

export default App;