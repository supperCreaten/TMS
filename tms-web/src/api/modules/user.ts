import type { TablePageResult, UserAvatarResult, UserDetail } from "@/interface"
import type { TableRowData } from "tdesign-react"
import request from "@/utils/service"

export type { UserDetail, UserAvatarResult } from "@/interface"

export default {
  getUserList: <T extends TableRowData>(data: Record<string, unknown>) =>
    request.post<TablePageResult<T>>("/api/user/pageQuery", data),
  getUserDetail: (params: { userId: number | string }) =>
    request.get<UserDetail>("/api/user/detail", { params }),
  insertUser: (data: Record<string, unknown>) => request.post<void>("/api/user/insert", data),
  updateUser: (data: Record<string, unknown>) => request.post<void>("/api/user/update", data),
  updateUserStatus: (data: Record<string, unknown>) => request.post<void>("/api/user/updateStatus", data),
  resetUserPassword: (data: Record<string, unknown>) =>
    request.post<void>("/api/user/resetPassword", data),
  authUserRole: (data: Record<string, unknown>) => request.post<void>("/api/user/authRole", data),
  deleteUser: (params: { userId: number | string }) =>
    request.get<void>("/api/user/delete", { params }),
  uploadUserAvatar: (data: FormData) => request.post<UserAvatarResult>("/api/user/avatar", data),
}
