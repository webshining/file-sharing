import { Exclude, classToPlain } from "class-transformer";
import { Column, Entity, Generated, OneToMany, PrimaryColumn } from "typeorm";
import { Link } from "./link.entity";

@Entity({ name: "users" })
export class User {
	@PrimaryColumn({type:"uuid"})
	@Generated("uuid")
	id: string;

	@Column({type: 'varchar', nullable: false, default: 'email'})
	auth: 'google' | 'email' | 'github'

	@Column({type: 'varchar', nullable: true})
	name: string

	@Column({type: 'varchar', nullable: false, unique: true})
	email: string

	@Exclude()
	@Column({type: 'varchar', nullable: true})
	password: string

	@OneToMany(() => Link, link => link.user)
	links: Link[]

	toJSON() {
	  return classToPlain(this);
	}
}
