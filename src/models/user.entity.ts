import { Exclude, classToPlain } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Link } from "./link.entity";

@Entity({ name: "users" })
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "varchar", nullable: false })
	name: string;

	@Column({ type: "varchar", nullable: true, unique: true })
	email: string;

	@Exclude()
	@Column({ type: "varchar", nullable: true })
	password: string;

	@Exclude()
	@Column({ type: "varchar", nullable: true, unique: true })
	google_id: string;

	@Exclude()
	@Column({ type: "varchar", nullable: true, unique: true })
	github_id: string;

	@OneToMany(() => Link, (link) => link.user, { lazy: true })
	links: Link[];

	toJSON() {
		return classToPlain(this);
	}
}
