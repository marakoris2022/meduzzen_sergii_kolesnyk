import {
  ActionProps,
  CompaniesProps,
  CompanyIdProps,
  CompanyPropsInList,
  UserItem,
  UserProps,
  UsersProps,
} from "@/interface/interface";
import { axiosInstance } from "../axiosInstance";

export const getHealthStatus = async () => {
  const { data } = await axiosInstance.get("/");
  return data;
};

export const getMe = async () => {
  const { data } = await axiosInstance.get("/auth/me/");
  return data.result as UserProps;
};

export const getUsers = async (page: number = 1, page_size: number = 10) => {
  const { data } = await axiosInstance.get("/users/", {
    params: { page, page_size },
  });
  return data as UsersProps;
};

export const getUserById = async (userId: number) => {
  const { data } = await axiosInstance.get(`/user/${userId}/`);
  return data.result as UserProps;
};

export const getAllCompanies = async (
  page: number = 1,
  page_size: number = 8
) => {
  const { data } = await axiosInstance.get("/companies/", {
    params: { page, page_size },
  });
  return data as CompaniesProps;
};

export const getCompanyById = async (companyId: number) => {
  const { data } = await axiosInstance.get(`/company/${companyId}/`);
  return data.result as CompanyIdProps;
};

export const getCompanyListByUserId = async (user_id: number) => {
  const { data } = await axiosInstance.get(`/user/${user_id}/companies_list/`);
  return data.result.companies as CompanyPropsInList[];
};

export const getCompanyMembersList = async (company_id: number) => {
  const { data } = await axiosInstance.get(
    `/company/${company_id}/members_list/`
  );
  return data.result.users as Array<UserItem & ActionProps>;
};
export const getCompanyInvitesList = async (company_id: number) => {
  const { data } = await axiosInstance.get(
    `/company/${company_id}/invites_list/`
  );
  return data.result.users as Array<UserItem & ActionProps>;
};

export const getCompanyRequestsList = async (company_id: number) => {
  const { data } = await axiosInstance.get(
    `/company/${company_id}/requests_list/`
  );
  return data.result.users as Array<UserItem & ActionProps>;
};

export const getCompanyBlockedList = async (company_id: number) => {
  const { data } = await axiosInstance.get(
    `/company/${company_id}/blocked_list/`
  );
  return data.result.users as Array<UserItem & ActionProps>;
};

export const inviteUserToCompany = async (
  company_id: number,
  user_id: number
) => {
  const { data } = await axiosInstance.get(
    `/action/create_from_company/${company_id}/user/${user_id}/`
  );
  return data.result;
};

export const requestJoinToCompany = async (company_id: number) => {
  const { data } = await axiosInstance.get(
    `/action/create_from_user/company/${company_id}/`
  );
  return data.result;
};

export const acceptInvite = async (actionId: number) => {
  const { data } = await axiosInstance.get(
    `/action/${actionId}/accept_invite/`
  );
  return data.result;
};

export const acceptRequest = async (actionId: number) => {
  const { data } = await axiosInstance.get(
    `/action/${actionId}/accept_request/`
  );
  return data.result;
};

export const declineAction = async (actionId: number) => {
  const { data } = await axiosInstance.get(
    `/action/${actionId}/decline_action/`
  );
  return data.result;
};

export const promoteToAdmin = async (actionId: number) => {
  const { data } = await axiosInstance.get(`/action/${actionId}/add_to_admin/`);
  return data.result;
};

export const demoteFromAdmin = async (actionId: number) => {
  const { data } = await axiosInstance.get(
    `/action/${actionId}/remove_from_admin/`
  );
  return data.result;
};

export const blockUser = async (actionId: number) => {
  const { data } = await axiosInstance.get(`/action/${actionId}/add_to_block/`);
  return data.result;
};

export const unblockUser = async (actionId: number) => {
  const { data } = await axiosInstance.get(
    `/action/${actionId}/remove_from_block/`
  );
  return data.result;
};

export const leaveCompany = async (actionId: number) => {
  const { data } = await axiosInstance.get(
    `/action/${actionId}/leave_company/`
  );
  return data.result;
};

export const fetchInviteList = async (user_id: number) => {
  const { data } = await axiosInstance.get(`/user/${user_id}/invites_list/`);
  return data.result.companies as CompanyPropsInList[];
};

export const fetchRequestsList = async (user_id: number) => {
  const { data } = await axiosInstance.get(`/user/${user_id}/requests_list/`);
  return data.result.companies as CompanyPropsInList[];
};
