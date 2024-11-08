export enum PATHS {
  MAIN = "/",
  PROFILE = "/profile",
  PROFILE_EDIT = "/profile/edit",
  USERS = "/users",
  COMPANIES = "/companies",
  ABOUT = "/about",
  SIGNIN = "/signin",
  SIGNUP = "/signup",
}

export enum TOKEN {
  NAME = "authToken",
}

export type UserProps = UserItem & AdditionalUserPropsCardProps;

export type AdditionalUserPropsCardProps = {
  user_status: string;
  user_city: string;
  user_phone: string;
  user_links: string[];
  is_superuser: boolean;
};

type UserItem = {
  user_id: number;
  user_email: string;
  user_firstname: string;
  user_lastname: string;
  user_avatar: string | null;
};

export type UsersProps = {
  status_code: number;
  detail: string;
  result: {
    users: UserItem[];
    pagination: Pagination;
  };
};

type Pagination = {
  current_page: number;
  total_page: number;
  total_results: number;
};

export type CompanyIdProps = CompanyProps & {
  company_description: string;
  company_city: string;
  company_phone: string;
  company_links: string[];
  company_owner: UserItem;
};

export type CompanyProps = {
  company_id: number;
  company_name: string;
  company_title: string;
  company_avatar: string;
  is_visible: boolean;
};

export type CompaniesProps = {
  status_code: number;
  detail: string;
  result: {
    companies: CompanyProps[];
    pagination: Pagination;
  };
};
