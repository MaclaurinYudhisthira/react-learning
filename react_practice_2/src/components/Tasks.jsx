import Task from "./Task";
const Tasks = ({ tasks, onDelete, onToggle }) => {
	return (
		<>
			{tasks.map((task) => (
				<Task
					key={task.id}
					task={task}
					onToggle={() => onToggle(task.id)}
					onDelete={() => onDelete(task.id)}
				></Task>
			))}
		</>
	);
};

export default Tasks;
