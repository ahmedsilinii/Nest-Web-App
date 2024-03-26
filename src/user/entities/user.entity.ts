import { TimeStampEntities } from "src/generic/timestamp.entities";
import CvEntity from "src/cv/entities/cv.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRoleEnum } from "src/enums/user-role.enum";

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

    @Column()
    password: string;

    @Column()
    salt: string;
    
    @Column({
        type: 'enum',
        enum: UserRoleEnum,
        default: UserRoleEnum.USER
    })
    role: string;

    @OneToMany(
        type => CvEntity,
        cv => cv.user,
        {
            cascade: ['insert', 'update'],
            nullable: true,
        }
    )
    cvs: CvEntity[];

}
