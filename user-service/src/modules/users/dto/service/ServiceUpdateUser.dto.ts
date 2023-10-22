export class ServiceUpdateUserDto {
  constructor(
    public email?: string,
    public firstname?: string,
    public middlename?: string,
    public lastname?: string,
    public dateOfBirth?: string,
  ) {}
}
