import request from "@/utils/service"

/** 用户画像详情 */
export type UserProfileDetail = Record<string, unknown>

export default {
  pageQueryProfile: (data: Record<string, unknown>) =>
    request.post("/api/service/userProfile/pageQuery", data),
  insertProfile: (id: string, data: Record<string, unknown>) =>
    request.post(`/api/service/userProfile/insert/${id}`, data),
  updateProfile: (id: string, data: Record<string, unknown>) =>
    request.post(`/api/service/userProfile/update/${id}`, data),
  queryByIdProfile: (id: string, data: string) =>
    request.post<UserProfileDetail>(`/api/service/userProfile/queryById/${id}`, data),
  deleteProfile: (data: Record<string, unknown>) =>
    request.post("/api/service/userProfile/delete", data),
}
