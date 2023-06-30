import { Box, Container } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/topbar.sass";

const TopBar = () => {
	return (
		<div className="topbar">
			<Container style={{ display: "flex", justifyContent: "space-between" }} className="container">
				<Link to="/" className="topbar__logo">
					FSharing
				</Link>
				<Box display={"flex"} gap={"10px"}>
					<Link to="/login">Login</Link>
					<Link to="/register">Register</Link>
				</Box>
			</Container>
		</div>
	);
};

export default TopBar;
