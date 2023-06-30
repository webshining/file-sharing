import { Exclude, classToPlain } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Link } from "./link.entity";

@Entity({ name: "users" })
export class User {
	@PrimaryGeneratedColumn()
	id: string;

	@Column({ type: "varchar", nullable: false })
	name: string;

	@Column({ type: "varchar", nullable: false, unique: true })
	email: string;

	@Exclude()
	@Column({ type: "varchar", nullable: true, unique: true })
	google_id: string;

	@Exclude()
	@Column({ type: "varchar", nullable: true, unique: true })
	github_id: string;

	@Exclude()
	@Column({ type: "varchar", nullable: true })
	password: string;

	@OneToMany(() => Link, (link) => link.user)
	links: Link[];

	toJSON() {
		return classToPlain(this);
	}
}
