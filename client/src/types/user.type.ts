export interface User {
	name: string;
	email: string;
}
export interface UserState {
	user: User | null;
}
