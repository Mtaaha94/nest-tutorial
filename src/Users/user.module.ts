/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { UserController, UsersController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule  } from "@nestjs/typeorm";
import { User } from "./user.entity" ;

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController,UsersController],
    providers: [UserService],
})

export class UserModule {}