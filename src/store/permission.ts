import { MENU_ROUTE_NAME } from "@/router/index";
import { routes } from "@/router";
import { defineStore } from "pinia";
import type { RouteRecordRaw } from "vue-router";

type PermissionState = {
  routes: Array<RouteRecordRaw>;
};

const filterRoutes = (
  routes: Array<RouteRecordRaw>,
  permissions: Array<string>
) => {
  return routes.filter((route: RouteRecordRaw) => {
    if (route.children) {
      route.children = filterRoutes(route.children, permissions);
    }
    // 1.没有定义meta的路由!route.meta
    // 2.没有定义meta里面permission ！route.meta.permission
    // 3.permission是否存在与当前permissions里面
    return (
      !route.meta ||
      (route.meta &&
        (!route.meta.permission ||
          (route.meta.permission &&
            permissions.includes(route.meta.permission))))
    );
  });
};
export const userPermissionStore = defineStore("permission", {
  state: (): PermissionState => {
    return {
      routes: [],
    };
  },
  persist: true,
  actions: {
    generateRoutes(permissions: Array<string>, admin = false) {
      this.routes = admin ? routes : filterRoutes(routes, permissions);
    },
  },
  getters: {
    menuRoutes(): Array<RouteRecordRaw> | undefined {
      return this.routes.find(
        (route: RouteRecordRaw) => route.name === MENU_ROUTE_NAME
      )?.children;
    },
  },
});
