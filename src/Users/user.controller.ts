/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Post ,Body, Get ,Param,Patch,Delete,  } from "@nestjs/common";
import { UserService } from "./user.service";
import { Request } from '@nestjs/common' ;

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) {}
   
    @Get()
    getallUsers() {
        return this.userService.getAll();
    }
}

@Controller('user') 
export class UserController {

    constructor(private readonly userService: UserService) {}

    
    @Get()
    getUser(@Request() req) {
        return this.userService.findUser(req.user.id) ;
    }
    
    @Post()
    addUser(@Body('firstName') firstname:string,  @Body('middleName') middlename: string,@Body('lastName') lastname:string, @Body('DOB') dob:string, @Body('email') email:string, @Body('mobile') mobile:string ,@Body('password') password:string, @Body('permanent_addr') permaddr:string, @Body('city') city:string, @Body('pincode') pincode:string, @Body('state') state:string, @Body('country') country:string, @Body('cardId') cardID:string ,@Body('gender') gender:string) {
        return this.userService.insertUser(firstname,middlename,lastname,dob,email,mobile,password,permaddr,city,pincode,state,country,cardID,gender);
              
    }

    
    @Patch()
    updateUser(@Request() req, @Body('email') email:string, @Body('mobile') mobile:string, @Body('permanent_addr') permaddr:string, @Body('city') city:string, @Body('pincode') pincode:string, @Body('state') state:string, @Body('country') country:string) {
        return this.userService.updateById(req.user.id,email,mobile,permaddr,city,pincode,state,country);
    }

    @Delete() 
    deleteUser(@Request() req) {
        return this.userService.deleteById(req.user.id);
        
    }

    
    @Patch('/changepassword')
    changePassword(@Request() req, @Body('oldpassword') oldpassword:string , @Body('newpassword') newpassword:string) {
        // console.log('User ', req.user.id) ;
        return this.userService.changePassword(req.user.id, oldpassword, newpassword) ;
    }
    
  

}