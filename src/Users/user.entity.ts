/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn , OneToMany, CreateDateColumn, DeleteDateColumn, BeforeInsert, OneToOne, JoinColumn } from 'typeorm';

const bcrypt = require("bcrypt");

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    firstName: string;

    @Column({length: 50})
    middleName: string;

    @Column({length: 50})
    lastName: string;

    @Column()
    DOB: string;
    /* change */
    @Column({default: 'M'})
    gender: string;
    
    @Column({unique: true})
    email: string ;

    @Column({ 
        type: 'varchar', 
        nullable: false 
    }) 
    password: string; 

    @Column({length: 10, unique:true})
    mobile: string ;
    
    @Column()
    permanent_addr: string;

    @Column()
    city: string;

    @Column()
    pincode: string;

    @Column()
    state: string;

    @Column()
    country: string;

    @CreateDateColumn()
    registrationDate: Date;

    @Column()
    cardId: string ;

    @DeleteDateColumn()
    deleteTime: Date;

  
@BeforeInsert()
    

    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);  
    }

}  