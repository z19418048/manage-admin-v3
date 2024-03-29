import type { UserCreateRequest, UserFilter } from "./types";
import type { UserType, ListResult } from "@/api/types";
import request from "@/api/request";
import localInstance from "@/api/localRequest";

const me = (): Promise<UserType> => {
  return request.get("/users/me");
};

const list = (filter: UserFilter): Promise<ListResult<UserType>> => {
  return request.get("/users", {
    params: filter,
  });
};
const getProductTotal = () => {
  return localInstance.get("/user/getProductTotal");
};
const create = (userCreateRequest: UserCreateRequest): Promise<UserType> => {
  return request.post("/users", userCreateRequest);
};

//Todo
const edit = (
  id: string,
  userEditRequest: UserCreateRequest
): Promise<UserType> => {
  return request.post(`/user/${id}`, userEditRequest);
};
export default {
  me,
  list,
  create,
  edit,
  getProductTotal,
};
