import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopBar from "./components/TopBar";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import "./styles/style.sass";

function App() {
	return (
		<BrowserRouter>
			<TopBar />
			<Routes>
				<Route element={<Home />} path="/" />
				<Route element={<Auth />} path="/login" />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
