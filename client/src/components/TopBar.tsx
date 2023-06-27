import { Link } from "react-router-dom";
import "../styles/topbar.sass";

const TopBar = () => {
	return (
		<div className="topbar">
			<div className="container">
				<div className="topbar__logo">FSharing</div>
				<div className="topbar__buttons">
					<Link to="/login" className="topbar__buttons_login">
						Login
					</Link>
				</div>
			</div>
		</div>
	);
};

export default TopBar;
