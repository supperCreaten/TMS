import request from "@/utils/service"

/** 登录日志详情 */
export type LoginLogDetail = Record<string, unknown>

export default {
  getLoginLogList: (data: Record<string, unknown>) => request.post("/api/log/pageQuery", data),
  getLoginLogDetail: (params: { infoId: number | string }) =>
    request.get<LoginLogDetail>("/api/log/detail", { params }),
  deleteLoginLog: (data: { infoIds: (number | string)[] }) => request.post("/api/log/delete", data),
  cleanLoginLog: (data: { days: number }) => request.post("/api/log/clean", data),
}
