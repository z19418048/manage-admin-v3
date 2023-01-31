import { useUserStore } from "@/store/user";
import type { TokenRequest } from "@/api/types";
import { defineStore, type StoreDefinition } from "pinia";
import tokenApi from "@/api/token";

type AppState = {
  token: string;
  menuCollapse: boolean;
};
export const useAppStore = defineStore("app", {
  state: (): AppState => {
    return {
      token: "",
      menuCollapse: false,
    };
  },
  persist: true,
  actions: {
    async login(loginForm: TokenRequest): Promise<void> {
      this.token = await tokenApi.createToken(loginForm);
    },
    async logout(): Promise<void> {
      const userStore = useUserStore();
      this.token = "";
      userStore.$reset();
    },
  },
});
