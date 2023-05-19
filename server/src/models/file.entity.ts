import { Column, Entity, Generated, ManyToOne, PrimaryColumn } from "typeorm";
import { Link } from "./link.entity";

@Entity({ name: "files" })
export class File {
	@PrimaryColumn({type:"uuid"})
	@Generated("uuid")
	id: string;

	@Column({type: 'varchar', nullable: false})
	name: string

	@ManyToOne(() => Link, link => link.files)
	link: Link
}
