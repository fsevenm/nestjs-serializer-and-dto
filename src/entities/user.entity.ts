import { Exclude, Expose, Type } from "class-transformer";
import { RoleEntity } from "./role.entity";

export enum UserEntityGroups {
  SINGLE = "single",
  LIST = "list",
}

export class UserEntity {
  id: number;

  // toPlainOnly: true is not for the groups
  // @Expose({ toPlainOnly: true, groups: [UserEntityGroups.SINGLE] })
  @Expose({ groups: [UserEntityGroups.SINGLE] })
  firstName: string;

  @Expose({ groups: [UserEntityGroups.SINGLE] })
  lastName: string;

  @Expose({
    name: "balance",
    toPlainOnly: true, // For `name`
    groups: [UserEntityGroups.SINGLE],
  })
  coinBalance: number;

  @Exclude()
  password: string;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Expose({ groups: [UserEntityGroups.SINGLE] })
  @Type(() => RoleEntity)
  role: RoleEntity;

  @Expose({ groups: [UserEntityGroups.LIST] })
  get roleName(): string {
    return this.role.name;
  }

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
