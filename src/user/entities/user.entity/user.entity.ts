import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        length: 50
    })
    username: string;

    @Column({
        unique: true,
    })
    email:string;

}
