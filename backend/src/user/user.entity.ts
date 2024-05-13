import { Column, Entity,  PrimaryGeneratedColumn, TableForeignKey } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    user_id:number;

    @Column()
    nom:string;

    @Column()
    prenom:string;

    @Column()
    tele:number;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column({default:"client"})
    role:string;   

}