import { Exclude, Expose } from "class-transformer";

export class RoleEntity {
  @Exclude({ toPlainOnly: true })
  secretCode: string;

  id: number;
  name: string;

  @Expose()
  get maskedCode(): string {
    // Only show last 2 characters of secret code
    return (
      this.secretCode.slice(0, -2).replace(/./g, "*") +
      this.secretCode.slice(-2)
    );
  }

  constructor(partial: Partial<RoleEntity>) {
    Object.assign(this, partial);
  }
}
