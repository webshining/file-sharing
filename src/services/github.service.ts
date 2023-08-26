import {
	GITHUB_AUTH_URI,
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	GITHUB_REDIRECT_URI,
	GITHUB_TOKEN_URI,
	GITHUB_USER_INFO_URI,
	GOOGLE_SCOPES,
} from "../data/config";

class GithubService {
	generateUrl = async (state: string): Promise<string> => {
		const params = new URLSearchParams({
			client_id: GITHUB_CLIENT_ID,
			redirect_uri: GITHUB_REDIRECT_URI,
			scope: GOOGLE_SCOPES.join(" "),
			state: state || "",
		});
		return `${GITHUB_AUTH_URI}?${params}`;
	};

	getToken = async (code: string): Promise<any> => {
		const params = new URLSearchParams({
			client_id: GITHUB_CLIENT_ID,
			client_secret: GITHUB_CLIENT_SECRET,
			redirect_uri: GITHUB_REDIRECT_URI,
			code,
		});
		const response = await (await fetch(`${GITHUB_TOKEN_URI}?${params}`, { method: "post", headers: { Accept: "application/json" } })).json();
		return response;
	};

	getUserInfo = async (access_token: string): Promise<any> => {
		const response = await (await fetch(`${GITHUB_USER_INFO_URI}`, { headers: { Authorization: `Bearer ${access_token}` } })).json();
		return response;
	};
}

export default GithubService;
