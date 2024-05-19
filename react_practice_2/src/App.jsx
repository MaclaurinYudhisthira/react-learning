import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
	const [showAddTask, setShowAddTask] = useState(false);
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const getTasks = async () => {
			const data = await fetchTasks();
			setTasks(data);
		};

		getTasks();
	}, []);

	// Fetch Tasks
	const fetchTasks = async () => {
		const res = await fetch("http://localhost:8000/tasks");
		const data = await res.json();
		return data;
	};


	// Fetch Task
	const fetchTask = async (id) => {
		const res = await fetch(`http://localhost:8000/tasks/${id}`);
		const data = await res.json();
		return data;
	};

	// Save task
	const onSaveTask = async (task) => {
		// const id = Math.floor(Math.random() * 10000) + 1;
		// const newTask = { id, ...task };
		const res = await fetch("http://localhost:8000/tasks",{
			method:"POST",
			headers:{
				'Content-type':'application/json'
			},
			body:JSON.stringify(task)
		});
		const newTask = await res.json()
		setTasks([...tasks, newTask]);
	};

	// Delete a task
	const onDelete = async (id) => {
		const res = await fetch(`http://localhost:8000/tasks/${id}`,{method:"DELETE"})
		const success = await res.json()
		if (success==true)
		{
			setTasks(tasks.filter((task) => task.id !== id));
		}

	};

	// Toggle the reminder of a task
	const onToggle = async (id) => {
		const taskToUpdate =await fetchTask(id)
		const updatedTask = { ...taskToUpdate, reminder: !taskToUpdate.reminder }

		const res  = await fetch(`http://localhost:8000/tasks`,{
			method:"PUT",
			headers:{
				'Content-type':'application/json'
			},
			body:JSON.stringify(updatedTask)
		});

		const data = await res.json()

		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, reminder: !data.reminder } : task
			)
		);
	};

	return (
		<div className="container">
			<Header
				onAdd={() => setShowAddTask(!showAddTask)}
				showAddTask={showAddTask}
			/>
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
