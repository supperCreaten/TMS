import request from "@/utils/service"

/** 操作日志详情 */
export type OperLogDetail = Record<string, unknown>

export default {
  getOperLogList: (data: Record<string, unknown>) => request.post("/api/operLog/pageQuery", data),
  getOperLogDetail: (params: { operId: number | string }) =>
    request.get<OperLogDetail>("/api/operLog/detail", { params }),
  deleteOperLog: (data: { operIds: (number | string)[] }) =>
    request.post("/api/operLog/delete", data),
  cleanOperLog: (data: { days: number }) => request.post("/api/operLog/clean", data),
}
