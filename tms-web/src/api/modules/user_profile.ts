import type { TablePageResult, UserProfileDetail } from "@/interface"
import type { TableRowData } from "tdesign-react"
import request from "@/utils/service"

export type { UserProfileDetail }

export default {
  pageQueryProfile: <T extends TableRowData>(data: Record<string, unknown>) =>
    request.post<TablePageResult<T>>("/api/service/userProfile/pageQuery", data),
  insertProfile: (id: string, data: Record<string, unknown>) =>
    request.post<void>(`/api/service/userProfile/insert/${id}`, data),
  updateProfile: (id: string, data: Record<string, unknown>) =>
    request.post<void>(`/api/service/userProfile/update/${id}`, data),
  queryByIdProfile: (id: string, data: string) =>
    request.post<UserProfileDetail>(`/api/service/userProfile/queryById/${id}`, data),
  deleteProfile: (data: Record<string, unknown>) =>
    request.post<void>("/api/service/userProfile/delete", data),
}
