
// import React, { useState, useEffect } from "react";

// function TaskForm({ onAdd }) {
//   const [title, setTitle] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!endTime) {
//       alert("End time is required.");
//       return;
//     }

//     onAdd({
//       id: Date.now(),
//       title: title.trim(),
//       startTime: startTime || null,
//       endTime,
//       completed: false,
//     });

//     setTitle("");
//     setStartTime("");
//     setEndTime("");
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="flex flex-col sm:flex-row gap-4 mb-6"
//     >
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Enter a task"
//         className="flex-1 p-2 border border-gray-300 rounded w-full"
//         required
//       />
//       <input
//         type="datetime-local"
//         value={startTime}
//         onChange={(e) => setStartTime(e.target.value)}
//         className="border p-2 rounded w-full sm:w-auto"
//       />
//       <input
//         type="datetime-local"
//         value={endTime}
//         onChange={(e) => setEndTime(e.target.value)}
//         className="border p-2 rounded w-full sm:w-auto"
//         required
//       />
//       <button
//         type="submit"
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         Add Task
//       </button>
//     </form>
//   );
// }

// function TaskItem({ task, onComplete, onDelete }) {
//   const [expired, setExpired] = useState(false);

//   useEffect(() => {
//     const checkExpiration = () => {
//       const now = new Date();
//       const end = new Date(task.endTime);
//       setExpired(now > end);
//     };

//     const interval = setInterval(checkExpiration, 1000);
//     return () => clearInterval(interval);
//   }, [task.endTime]);

//   return (
//     <div
//       className={`flex justify-between items-start border p-3 rounded-lg mb-2 transition-all ${
//         expired ? "bg-red-100 border-red-400" : "bg-white"
//       }`}
//     >
//       <div className="flex-1 overflow-x-auto pr-4">
//         <p
//           className={`font-medium break-words ${
//             task.completed ? "line-through text-gray-500" : ""
//           }`}
//         >
//           {task.title}
//         </p>
//         <small className="text-gray-500 block">
//           {task.startTime &&
//             `Start: ${new Date(task.startTime).toLocaleString()} | `}
//           End: {new Date(task.endTime).toLocaleString()}
//         </small>
//       </div>
//       <div className="flex flex-col items-center gap-2">
//         {!task.completed && (
//           <button
//             onClick={() => onComplete(task.id)}
//             title="Complete"
//             className="text-green-600"
//           >
//             ✅
//           </button>
//         )}
//         <button
//           onClick={() => onDelete(task.id)}
//           title="Delete"
//           className="text-red-600"
//         >
//           ❌
//         </button>
//       </div>
//     </div>
//   );
// }

// function TaskApp() {
//   const [tasks, setTasks] = useState([]);

//   const handleAddTask = (task) => {
//     setTasks((prev) => [...prev, task]);
//   };

//   const handleCompleteTask = (id) => {
//     setTasks((prev) =>
//       prev.map((task) => (task.id === id ? { ...task, completed: true } : task))
//     );
//   };

//   const handleDeleteTask = (id) => {
//     setTasks((prev) => prev.filter((task) => task.id !== id));
//   };

//   const activeTasks = tasks.filter((task) => !task.completed);
//   const completedTasks = tasks.filter((task) => task.completed);

//   return (
//     <div className="max-w-3xl mx-auto mt-10 px-4 pb-20">
//       <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
//         Task Manager
//       </h1>

//       <TaskForm onAdd={handleAddTask} />

//       <div>
//         <h2 className="text-xl font-semibold mb-2">Active Tasks</h2>
//         {activeTasks.length === 0 && (
//           <p className="text-gray-500 italic mb-4">No active tasks.</p>
//         )}
//         {activeTasks.map((task) => (
//           <TaskItem
//             key={task.id}
//             task={task}
//             onComplete={handleCompleteTask}
//             onDelete={handleDeleteTask}
//           />
//         ))}
//       </div>

//       <div className="mt-8">
//         <h2 className="text-xl font-semibold mb-2">Completed Tasks</h2>
//         {completedTasks.length === 0 && (
//           <p className="text-gray-500 italic">No completed tasks yet.</p>
//         )}
//         {completedTasks.map((task) => (
//           <TaskItem
//             key={task.id}
//             task={task}
//             onComplete={handleCompleteTask}
//             onDelete={handleDeleteTask}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default TaskApp;

import React, { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TaskApp = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [text, setText] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Timer update
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prev) => [...prev]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const handleAddTask = () => {
    if (!endTime.trim()) {
      alert("End time is required.");
      return;
    }

    const now = new Date();
    const start = startTime ? new Date(startTime) : null;
    const end = new Date(endTime);

    if (start && start < now) {
      alert("Start time cannot be in the past.");
      return;
    }

    if (end <= now) {
      alert("End time must be in the future.");
      return;
    }

    if (start && end <= start) {
      alert("End time must be after start time.");
      return;
    }

    const newTask = {
      id: uuidv4(),
      text,
      completed: false,
      startTime: startTime || null,
      endTime,
      createdAt: now.toISOString(),
    };

    setTasks([...tasks, newTask]);
    setText("");
    setStartTime("");
    setEndTime("");
  };
  
  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggle = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const reorderedTasks = Array.from(tasks);
    const [moved] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, moved);
    setTasks(reorderedTasks);
  };

  const remaining = tasks.filter((t) => !t.completed).length;

  const isExpired = (end) => {
    return new Date(end) < new Date();
  };

  const formatCountdown = (end) => {
    const diff = new Date(end) - new Date();
    if (diff <= 0) return "Expired";

    const mins = Math.floor(diff / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Task Manager</h1>

      <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
        <input
          type="text"
          placeholder="Enter a task"
          className="flex-1 px-4 py-2 border rounded shadow-sm w-full"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
        />
        <input
          type="datetime-local"
          className="px-3 py-2 border rounded"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          type="datetime-local"
          className="px-3 py-2 border rounded"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-1"
        >
          <Plus size={18} /> Add Task
        </button>
      </div>

      <p className="mb-4 text-gray-600 font-medium">
        {remaining} task(s) remaining
      </p>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["Active", "Completed"].map((section, index) => (
            <Droppable key={section} droppableId={section}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-100 p-4 rounded-md min-h-[200px]"
                >
                  <h2 className="text-xl font-semibold mb-4">
                    {section} Tasks
                  </h2>

                  {tasks
                    .filter((task) =>
                      section === "Active" ? !task.completed : task.completed
                    )
                    .map((task, i) => (
                      <Draggable key={task.id} draggableId={task.id} index={i}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`flex items-start justify-between bg-white shadow p-3 mb-3 rounded transition-all duration-300 ${
                              isExpired(task.endTime) && !task.completed
                                ? "border-l-4 border-red-600"
                                : ""
                            }`}
                          >
                            <div className="flex-1 pr-2">
                              <div
                                className={`break-words ${
                                  task.completed
                                    ? "line-through text-gray-400"
                                    : ""
                                }`}
                              >
                                {task.text}
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                {task.startTime && (
                                  <span>
                                    <strong>Start:</strong>{" "}
                                    {new Date(task.startTime).toLocaleString()}{" "}
                                  </span>
                                )}
                                <strong>End:</strong>{" "}
                                {new Date(task.endTime).toLocaleString()}
                              </div>
                              {!task.completed && (
                                <div
                                  className={`text-sm font-medium mt-1 ${
                                    isExpired(task.endTime)
                                      ? "text-red-600"
                                      : "text-green-600"
                                  }`}
                                >
                                  {formatCountdown(task.endTime)}
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => handleToggle(task.id)}
                              />
                              <button
                                onClick={() => handleDelete(task.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskApp;
