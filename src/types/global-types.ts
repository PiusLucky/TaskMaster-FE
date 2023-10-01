import { CategoryType, PriorityType } from "@/lib/enum";

export interface ILogin {
  data: ILoginData;
  meta: IMeta;
}

export interface ILoginData {
  access_token: string;
  user_id: string;
}

export interface IMeta {
  message: string;
  statusCode: number;
}

export interface IUserInfo {
  data: UserData;
}

export interface UserData {
  email: string;
  full_name: string;
  id: string;
}

export interface ITaskList {
  data: Data;
  meta: IMeta;
}

export interface Data {
  pagination: Pagination;
  tasks: Task[];
}

export interface Pagination {
  limit: number;
  page: number;
  total_elements: number;
  total_pages: number;
}

export interface Task {
  category: CategoryType;
  description: string;
  dueDate: Date;
  id: string;
  priority: PriorityType;
  title: string;
  user_id: string;
}
