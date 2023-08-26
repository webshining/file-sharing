import {
	GOOGLE_AUTH_URI,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GOOGLE_REDIRECT_URI,
	GOOGLE_SCOPES,
	GOOGLE_TOKEN_URI,
	GOOGLE_USER_INFO_URI,
} from "../data/config";

class GoogleService {
	generateUrl = async (state: string): Promise<string> => {
		const params = new URLSearchParams({
			client_id: GOOGLE_CLIENT_ID,
			redirect_uri: GOOGLE_REDIRECT_URI,
			response_type: "code",
			scope: GOOGLE_SCOPES.join(" "),
			access_type: "offline",
			state: state || "",
		});
		return `${GOOGLE_AUTH_URI}?${params}`;
	};

	getToken = async (code: string): Promise<any> => {
		const response = await (
			await fetch(GOOGLE_TOKEN_URI, {
				method: "post",
				body: JSON.stringify({
					client_id: GOOGLE_CLIENT_ID,
					client_secret: GOOGLE_CLIENT_SECRET,
					code,
					grant_type: "authorization_code",
					redirect_uri: GOOGLE_REDIRECT_URI,
				}),
			})
		).json();
		return response;
	};

	getUserInfo = async (access_token: string): Promise<any> => {
		const response = await (await fetch(`${GOOGLE_USER_INFO_URI}?access_token=${access_token}`, { method: "get" })).json();
		return response;
	};
}

export default GoogleService;
