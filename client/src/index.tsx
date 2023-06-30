import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import store from "./storage";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/login",
				element: <Auth />,
			},
			{
				path: "/register",
				element: <Auth />,
			},
		],
	},
]);
root.render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
