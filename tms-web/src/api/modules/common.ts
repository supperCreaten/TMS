import type { AxiosRequestConfig } from "axios"
import type { MenuInfo, UploadResult, UserInfoRes } from "@/interface"
import request from "@/utils/service"

export default {
  login: (data: Record<string, unknown>) => request.post<string>("/api/login", data),
  getAuthMenus: () => request.get<MenuInfo[]>("/api/authRoutes"),
  getUserInfo: () => request.get<UserInfoRes>("/api/userInfo"),
  refreshToken: () => request.get<string>("/api/refreshToken"),
  logout: () => request.post<void>("/api/logout"),
  changePassword: (data: Record<string, unknown>) => request.post<void>("/api/user/changePassword", data),
  /** 个人中心：修改基本资料 */
  updateProfile: (data: Record<string, unknown>) => request.put<void>("/api/user/profile", data),
  /** 个人中心：修改密码 */
  updateProfilePassword: (data: { oldPassword: string; newPassword: string }) =>
    request.put<void>("/api/user/profile/updatePwd", data),
  decryptSensitive: (data: { cipherText: string; secretKey: string }) =>
    request.post<string>("/api/decryptSensitive", data),
  uploadApi: (data: FormData, config?: AxiosRequestConfig) =>
    request.post<UploadResult>("/api/upload", data, config),
}