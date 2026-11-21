import type { LoginLogDetail, TablePageResult } from "@/interface"
import type { TableRowData } from "tdesign-react"
import request from "@/utils/service"

export type { LoginLogDetail }

export default {
  getLoginLogList: <T extends TableRowData>(data: Record<string, unknown>) =>
    request.post<TablePageResult<T>>("/api/log/pageQuery", data),
  getLoginLogDetail: (params: { infoId: number | string }) =>
    request.get<LoginLogDetail>("/api/log/detail", { params }),
  deleteLoginLog: (data: { infoIds: (number | string)[] }) =>
    request.post<void>("/api/log/delete", data),
  cleanLoginLog: (data: { days: number }) => request.post<void>("/api/log/clean", data),
}
