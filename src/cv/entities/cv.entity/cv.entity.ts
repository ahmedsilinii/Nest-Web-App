import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cv')
export default class CvEntity {
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
}
