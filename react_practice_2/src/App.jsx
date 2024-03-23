import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
	const [showAddTask, setShowAddTask] = useState(false);
	const [tasks, setTasks] = useState([
		{ text: "Task 1", id: 1, day: "5 Fab 2024", reminder: true },
		{ text: "Task 3", id: 2, day: "5 Fab 2024", reminder: true },
		{ text: "Task 2", id: 3, day: "5 Fab 2024", reminder: false },
	]);

	// Save task
	const onSaveTask = (task) => {
		const id = Math.floor(Math.random() * 10000) + 1;
		const newTask = { id, ...task };
		setTasks([...tasks, newTask]);
	};

	// Delete a task
	const onDelete = (id) => {
		setTasks(tasks.filter((task) => task.id !== id));
	};

	// Toggle the reminder of a task
	const onToggle = (id) => {
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, reminder: !task.reminder } : task
			)
		);
	};

	return (
		<div className="container">
			<Header onAdd={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask} />
			{showAddTask && <AddTask onSaveTask={onSaveTask} />}
			{tasks.length > 0 ? (
				<Tasks tasks={tasks} onDelete={onDelete} onToggle={onToggle} />
			) : (
				"No tasks to show"
			)}
		</div>
	);
}

export default App;
