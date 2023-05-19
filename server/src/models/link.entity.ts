import { Entity, Generated, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { File } from "./file.entity";
import { User } from './user.entity';

@Entity({ name: "links" })
export class Link {
	@PrimaryColumn({type:"uuid"})
	@Generated("uuid")
	id: string;

    @ManyToOne(() => User, user => user.links)
    user: User

    @OneToMany(() => File, file => file.link)
    files: File[]
}
