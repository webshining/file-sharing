import { Route, Routes } from "react-router-dom";
import Root from "./pages/Root";
import "./styles/style.scss";

function App() {
	return (
		<Routes>
			<Route element={<Root />} path="/" />
		</Routes>
	);
}

export default App;
