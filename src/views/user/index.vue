<template>
  <t-card>
    <div class="action-area">
      <t-button
        v-permission="PermissionEnum.USER_LIST_CREATE"
        @click="handleCreate"
        >创建用户
      </t-button>
    </div>
    <div class="search-area">
      <t-input
        class="search-input"
        v-model="searchKey.name"
        placeholder="请输入用户名"
      ></t-input>
      <t-button @click="fetchData">
        <template #icon>
          <icon name="search"></icon>
        </template>
      </t-button>
    </div>
    <t-table
      :loading="loading"
      row-key="index"
      :columns="columns"
      :data="data"
      :pagination="pagination"
      @page-change="onPageChange"
    >
      <template #operation="slotProps">
        <t-button
          v-permission="PermissionEnum.USER_LIST_EDIT"
          variant="text"
          theme="primary"
          @click="handleEdit(slotProps)"
        >
          <icon name="edit"></icon>
          编辑
        </t-button>
      </template>
      <template #roles="slotProps">
        <t-tag
          v-for="(role, index) in slotProps.row.roles"
          :key="index"
          theme="primary"
          variant="light"
          style="margin-right: 8px; cursor: pointer"
          >{{ ROLE_DICT[role] }}
        </t-tag>
      </template>
    </t-table>
  </t-card>
  <!-- 编辑弹窗组件-->
  <edit-dialog
    :show="showDialog"
    :data="editData"
    @close="onDialogClose"
    @confirm="handleConfirm"
  ></edit-dialog>
</template>

<script lang="ts" setup>
import { PermissionEnum } from "@/config/permission.config";
import { Icon } from "tdesign-vue-next";
import { useSearch } from "@/composables/useSearch";
import userApi from "@/api/user";
import { reactive } from "vue";
import type { UserCreateRequest, UserType } from "@/api/types";
import EditDialog from "@/views/user/edit-dialog.vue";
import { useEditDialog } from "@/composables/useEditDialog";
import { ROLE_DICT } from "@/config/role.config";

const columns = [
  { colKey: "id", title: "ID" },
  { colKey: "username", title: "用户名" },
  { colKey: "nickname", title: "昵称" },
  { colKey: "roles", title: "角色" },
  { colKey: "operation", title: "操作" },
];

const searchKey = reactive({
  name: "",
});
const { data, fetchData, pagination, loading, onPageChange } = useSearch<
  UserType,
  {
    name: string;
  }
>(userApi, searchKey);
const defaultData: UserType = {
  id: "",
  username: "",
  nickname: "",
  roles: [],
  permissions: [],
};
// 弹窗组件的CURD
// showDialog => 显示弹框
const {
  showDialog,
  editData,
  handleCreate,
  handleEdit,
  onDialogClose,
  handleConfirm,
} = useEditDialog<UserType, UserCreateRequest>(userApi, "用户");
</script>

user.list()
<style lang="less" scoped></style>
