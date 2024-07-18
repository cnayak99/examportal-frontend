export type Authority = {
  authority: string;
};

export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: number | null;
  enabled: boolean;
  profile: string;
  authorities: Authority[];
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;

  constructor(data: any) {
    this.id = data.id;
    this.username = data.username;
    this.password = data.password;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.phone = data.phone;
    this.enabled = data.enabled;
    this.profile = data.profile;
    this.authorities = data.authorities;
    this.credentialsNonExpired = data.credentialsNonExpired;
    this.accountNonExpired = data.accountNonExpired;
    this.accountNonLocked = data.accountNonLocked;
  }
}
