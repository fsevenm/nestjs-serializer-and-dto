import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  SerializeOptions,
  UseInterceptors,
} from "@nestjs/common";
import { UserEntity, UserEntityGroups } from "./entities/user.entity";
import { plainToInstance } from "class-transformer";

const users = [
  {
    id: 1,
    firstName: "Kamil",
    lastName: "Mysliwiec",
    password: "password",
    coinBalance: 10,
    role: {
      secretCode: "secret",
      id: 1,
      name: "admin",
    },
  },
  {
    id: 2,
    firstName: "Ava",
    lastName: "Bell",
    password: "password",
    coinBalance: 40,
    role: {
      secretCode: "secret",
      id: 2,
      name: "user",
    },
  },
] as any[];

const GROUP_ALL = [UserEntityGroups.SINGLE, UserEntityGroups.LIST];

@Controller()
@UseInterceptors(ClassSerializerInterceptor) // 2️⃣ TO PLAIN 👈
export class AppController {
  @Get()
  @SerializeOptions({ groups: [UserEntityGroups.LIST] })
  findAll() {
    // 1️⃣ TO CLASS 👈
    // return new UserEntity(users);
    return plainToInstance(UserEntity, users, {
      groups: GROUP_ALL,
    });
  }

  @Get(":id")
  @SerializeOptions({ groups: [UserEntityGroups.SINGLE] })
  findOne(@Param("id") id: string) {
    const user = users.find((user) => user.id === Number(id));

    // 1️⃣ TO CLASS 👈
    // return new UserEntity(user);
    return plainToInstance(UserEntity, user, {
      groups: GROUP_ALL,
    });
  }
}
