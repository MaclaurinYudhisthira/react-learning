import Message from "./message";
import ListGroup from "./components/ListGorup";
import Alert from "./components/Alert";

function App() {
	let items = ["Newyork", "San Fransisco", "Tokyo", "London", "Paris"];
	const onSelectItem = (item: string) => {
		console.log(item);
	};
    const text = <span>Hello World!</span>
	return (
		<div>
			<Alert text={text} />
			<ListGroup items={items} heading="Cities" onSelectItem={onSelectItem} />
		</div>
	);
}

export default App;
