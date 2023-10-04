import { CategoryType, PriorityType } from "@/lib/enum";

export const loginJson = {
  data: {
    access_token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5NjA5MzQxMCwianRpIjoiMzI2ZTUwMDYtYzEzYy00OWUzLThmY2EtNmVmOWNmMDFlNzXXXXXXX",
    user_id: "3ecc04bf-1518-4b59-915f-4ba13a26df13",
  },
  meta: {
    message: "Success",
    statusCode: 200,
  },
};

export const registerJson = {
  data: {
    email: "lucddkypiussdd5cx0@ss.com",
    full_name: "Lucky Pius",
    id: "65731a4c-6322-4e99-a76d-b38afe71f223",
  },
  meta: {
    message: "Success",
    statusCode: 200,
  },
};

export const taskJson = {
  category: CategoryType.Fun,
  description:
    "Edin Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  dueDate: new Date("Sun, 10 Dec 2023 00:00:00 GMT"),
  id: "3b84eb5a-1179-47da-99ef-f3d0ccae4c8b",
  priority: PriorityType.Medium,
  title: "Smith",
  user_id: "3ecc04bf-1518-4b59-915f-4ba13a26df13",
};

export const userJson = {
  data: {
    email: "xxxx@ss.com",
    full_name: "Lucky Pius",
    id: "3ecc04bf-1518-4b59-915f-4ba13a26df13",
  },
  meta: {
    message: "Success",
    statusCode: 200,
  },
};

export const taskListJson = {
  data: {
    pagination: {
      limit: 20,
      page: 1,
      total_elements: 1,
      total_pages: 1,
    },
    tasks: [{ ...taskJson }],
  },
  meta: {
    message: "Success",
    statusCode: 200,
  },
};

export const singleTaskJson = {
  data: {
    ...taskJson,
  },
  meta: {
    message: "Success",
    statusCode: 200,
  },
};
