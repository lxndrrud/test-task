export class ServiceCreateUserDto {
  constructor(
    public username: string,
    public password: string,
    public email: string,
    public firstname?: string,
    public middlename?: string,
    public lastname?: string,
    public dateOfBirth?: string,
  ) {}
}
