export interface LinkCreateDto {
	name: string;
	href: string;
}

export interface LinkUpdateDto {
	id: number;
	name: string;
	href: string;
}

export interface LinkDeleteDto {
	id: number;
}
