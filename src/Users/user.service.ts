/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository,DeepPartial } from "typeorm";
import { User } from './user.entity'
import { passwordStrength } from 'check-password-strength' ;

import { isEmail, isMobilePhone } from "class-validator";
const bcrypt = require('bcrypt') ;


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly usersRepo: Repository<User>,
        
        
    ) {}

    getAll() {
        return this.usersRepo.find() ;        
    }

    async insertUser(firstName:string,middleName:string,lastName:string,dob:string,email:string,mobile:string, password: string, permaddr: string,city:string, pincode: string,state:string,country:string,cardID:string,gender:string) {
        if(!firstName || !dob || !email || !mobile || !password || !permaddr || !city || !state || !gender || !cardID) {
            throw new BadRequestException('Request body format: \
            { \
                firstName: string ,\
                middleName: string(optional),\
                lastName: string(optional),\
                DOB: string,\
                email: string,\
                mobile: string,\
                password: string,\
                permanent_addr: string,\
                city: string,\
                pincode: string,\
                state: string(default: India),\
                country: string,\
                cardId: string,\
                gender: string\
            ') ;
        }
        const val = this.checkPassword(password) ;
        if(val == 'Weak' || val=='Too weak') {
            throw new BadRequestException('Use a stronger password !!');
        }
        const usr: DeepPartial<User> = {
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            DOB: dob,
            email: email,
            mobile: mobile,
            password: password,
            permanent_addr: permaddr,
            city: city,
            state: state,
            pincode: pincode,
            country: country,
            cardId: cardID,
            gender: gender,
            registrationDate: new Date(),
        };
        
        
        
        await this.usersRepo.save(usr) ;

        return 'User account created' ;

    }

    async findUser(Id: number): Promise<any> {
        const usr = await this.usersRepo.findOne({ where: { id: Id } });
        if (!usr) {
            throw new NotFoundException('User not found');
        }
        const { password, ...result } = usr;
        return result;
    }
    
   
    async updateById(id: number, email: string, mobile: string, permaddr: string, city: string, pincode: string, state: string, country: string) {
        const updatedUser = await this.usersRepo.findOne({ where: { id } });
        if (!updatedUser) {
            // Handle case where user with given id is not found
            return; // or throw an error, depending on your requirements
        }
        if (email && isEmail(email)) updatedUser.email = email;
        if (mobile && isMobilePhone(mobile, 'en-IN')) updatedUser.mobile = mobile;
        if (permaddr) updatedUser.permanent_addr = permaddr;
        if (city) updatedUser.city = city;
        if (pincode) updatedUser.pincode = pincode;
        if (state) updatedUser.state = state;
        if (country) updatedUser.country = country;
    
        await this.usersRepo.save(updatedUser);
    }
    

    async deleteById(userID : number) {
        
        await this.usersRepo.delete({id: userID}) ;

        return 'Your account is deleted !' ;

    }

    private checkPassword(password:string) {
        console.log('Password is ',passwordStrength(password).value)
        return passwordStrength(password).value ;
    }

    async changePassword(userId: number, oldpassword: string, newpassword: string) {
        const user = await this.usersRepo.findOne(userId as any);
    
        if (!user) {
            throw new NotFoundException('User not found');
        }
    
        const match = await bcrypt.compare(oldpassword, user.password);
    
        if (!match) {
            throw new BadRequestException('Incorrect Credentials');
        }
    
        const val = this.checkPassword(newpassword);
        if (val === 'Weak' || val === 'Too weak') {
            throw new BadRequestException('Use a stronger password !!');
        }
    
        user.password = newpassword;
        await this.usersRepo.save(user);
        return 'Password changed !!';
    }
    
    


}