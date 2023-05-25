import { Exclude, classToPlain } from "class-transformer";
import { Column, Entity, Generated, OneToMany, PrimaryColumn } from "typeorm";
import { Link } from "./link.entity";

@Entity({ name: "users" })
export class User {
	@PrimaryColumn({type:"uuid"})
	@Generated("uuid")
	id: string;

	@Column({type: 'varchar', nullable: true})
	name: string

	@Column({type: 'varchar', nullable: true, unique: true})
	email: string

	@Column({type: 'boolean', default: false})
	google: boolean

	@Column({type: 'varchar', nullable: true, unique: true})
	github_id: string

	@Exclude()
	@Column({type: 'varchar', nullable: true})
	password: string

	@OneToMany(() => Link, link => link.user)
	links: Link[]

	toJSON() {
	  return classToPlain(this);
	}
}
