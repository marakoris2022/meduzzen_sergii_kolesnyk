export enum PATHS {
  MAIN = "/",
  PROFILE = "/profile",
  PROFILE_EDIT = "/profile/edit",
  USERS = "/users",
  COMPANIES = "/companies",
  ABOUT = "/about",
  SIGNIN = "/signin",
  SIGNUP = "/signup",
  QUIZ = "/quiz",
}

export enum TOKEN {
  NAME = "authToken",
}

export type UpdateStatusType = {
  text: string;
  color: "green" | "red";
};

export type UserProps = UserItem & AdditionalUserPropsCardProps;

export type AdditionalUserPropsCardProps = {
  user_status: string;
  user_city: string;
  user_phone: string;
  user_links: string[];
  is_superuser: boolean;
};

export type ActionProps = {
  action_id: 0;
  action: string;
};

export type UserItem = {
  user_id: number;
  user_email: string;
  user_firstname: string;
  user_lastname: string;
  user_avatar: string;
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

export type CompanyPropsInList = CompanyProps & {
  action_id: number;
  action: string;
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

export type BaseCompanyFormProps = {
  company_name: string;
  company_title: string;
  company_description: string;
  company_city: string;
  company_phone: string;
};

export type RequestCompanyProps = BaseCompanyFormProps & {
  company_links: string[];
};

export type FormCompanyProps = BaseCompanyFormProps & {
  company_links: string;
};

export type ValidationProps = (t: (key: string) => string) => {
  required?: string;
  pattern?: {
    value: RegExp;
    message: string;
  };
  validate?: (value: string) => string | true;
  minLength?: {
    value: number;
    message: string;
  };
  maxLength?: {
    value: number;
    message: string;
  };
};

export enum ButtonColor {
  Primary = "primary",
  Warning = "warning",
  Error = "error",
  Success = "success",
}

export type CompanyActionsModalProps = {
  callback: () => Promise<void>;
  onClose: () => void;
  actionName: string;
  actionText: string;
  triggerRenderUpdate: () => Promise<void>;
};

export type MemberBadgeAction = {
  callback: () => void;
  color: ButtonColor;
  icon: JSX.Element;
};

export type QuizItem = {
  quiz_id: number;
  quiz_name: string;
  quiz_title: string;
  quiz_description: string;
};

export type QuizQuestionsProps = {
  question_text: string;
  question_answers: string[];
  question_correct_answer: number;
};

export type CreateQuizProps = {
  quiz_name: string;
  quiz_frequency: number;
  company_id: number;
  questions_list: QuizQuestionsProps[];
};

export type UpdateQuizProps = {
  quiz_description: string;
  quiz_frequency: number;
  quiz_name: string;
  quiz_title: string;
};

export type QuizByIdProps = QuizItem & {
  quiz_frequency: number;
  created_by: UserItem;
  questions_list: {
    question_id: number;
    question_text: string;
    question_answers: string[];
  }[];
};
