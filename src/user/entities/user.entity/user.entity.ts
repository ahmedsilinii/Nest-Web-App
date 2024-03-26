import { TimeStampEntities } from "generic/timestamp.entities";
import CvEntity from "src/cv/entities/cv.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity extends TimeStampEntities{
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

    @OneToMany(
        type => CvEntity,
        cv => cv.user,
        {
            cascade: ['insert', 'update'],
            nullable: true,
            eager: true
        }
    )
    cvs: CvEntity[];

}
