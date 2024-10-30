export enum PATHS {
  MAIN = "/",
  PROFILE = "/profile",
  USERS = "/users",
  COMPANIES = "/companies",
  ABOUT = "/about",
  SIGNIN = "/signin",
  SIGNUP = "/signup",
}

export enum TOKEN {
  NAME = "authToken",
}

export type UserProps = {
  user_id: number;
  user_email: string;
  user_firstname: string;
  user_lastname: string;
  user_avatar: string;
  user_status: string;
  user_city: string;
  user_phone: string;
  user_links: string[];
  is_superuser: true;
};
