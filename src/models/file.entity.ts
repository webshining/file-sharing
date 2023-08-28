import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Link } from "./link.entity";

@Entity({ name: "files" })
export class File {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "varchar", nullable: false })
	name: string;

	@ManyToOne(() => Link, (link) => link.files, { cascade: true })
	link: Link;
}
