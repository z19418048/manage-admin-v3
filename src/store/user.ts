import { userPermissionStore } from "./permission";
import type { UserType } from "@/api/types";
import userApi from "@/api/user";
import { defineStore } from "pinia";

type UserState = {
  currentUser: UserType | null;
};
export const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {
      currentUser: null,
    };
  },
  persist: true,
  actions: {
    async fetchCurrentUser() {
      this.currentUser = await userApi.me();
      // Todo: 超级管理员机制
      userPermissionStore().generateRoutes(this.currentUser.permissions);
    },
  },
});
