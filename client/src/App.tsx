import { Outlet } from "react-router-dom";
import TopBar from "./components/TopBar";
import "./styles/style.sass";

function App() {
	return (
		<>
			<TopBar />
			<Outlet />
		</>
	);
}

export default App;
