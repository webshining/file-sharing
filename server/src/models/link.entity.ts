import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { File } from "./file.entity";
import { User } from "./user.entity";

@Entity({ name: "links" })
export class Link {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "varchar", nullable: false })
	name: string;

	@Column({ type: "varchar", nullable: false, unique: true })
	href: string;

	@ManyToOne(() => User, (user) => user.links)
	user: User;

	@OneToMany(() => File, (file) => file.link)
	files: File[];
}
