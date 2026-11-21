import type { RoleDetail, RoleMenuConfig, RoleUserConfig, TablePageResult } from "@/interface"
import type { TableRowData } from "tdesign-react"
import request from "@/utils/service"

export default {
  getRoleList: <T extends TableRowData>(data: Record<string, unknown>) =>
    request.post<TablePageResult<T>>("/api/role/pageQuery", data),
  insertRole: (data: Record<string, unknown>) => request.post<void>("/api/role/insert", data),
  updateRole: (data: Record<string, unknown>) => request.post<void>("/api/role/update", data),
  updateRoleStatus: (data: Record<string, unknown>) =>
    request.post<void>("/api/role/updateStatus", data),
  getRoleDetail: (params: { roleId: number | string }) =>
    request.get<RoleDetail>("/api/role/detail", { params }),
  getMenuConfig: (params: { roleId: number | string }) =>
    request.get<RoleMenuConfig>("/api/role/roleToMenu", { params }),
  saveMenuToRole: (data: Record<string, unknown>) =>
    request.post<void>("/api/role/saveMenuToRole", data),
  setUserConfig: (data: Record<string, unknown>) =>
    request.post<void>("/api/role/saveUserToRole", data),
  getUserConfig: (params: { roleId: number | string }) =>
    request.get<RoleUserConfig>("/api/role/roleToUser", { params }),
  cancelUserToRole: (data: Record<string, unknown>) =>
    request.post<void>("/api/role/cancelUserToRole", data),
  deleteRole: (params: { roleId: number | string }) =>
    request.get<void>("/api/role/delete", { params }),
}