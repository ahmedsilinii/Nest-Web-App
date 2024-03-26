import { TimeStampEntities } from "src/generic/timestamp.entities";
import { UserEntity } from "src/user/entities/user.entity/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('cv')
export default class CvEntity extends TimeStampEntities {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({
        name:'name',
        length: 50,
        //you cant update it
        update:false
    })
    name:string;

    @Column({
        length:50
    })    
    firstname:string;

    @Column() 
    age:number;

    @Column() 
    cin : number;

    @Column() 
    job : string;

    @Column() 
    path: string;

    @ManyToOne(
        type => UserEntity,
        user => user.cvs,
        {
            cascade: true,
            nullable: true,
            eager: true
        }
    )     
    user: UserEntity;

}
