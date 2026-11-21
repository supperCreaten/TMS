import type { OperLogDetail, TablePageResult } from "@/interface"
import type { TableRowData } from "tdesign-react"
import request from "@/utils/service"

export type { OperLogDetail }

export default {
  getOperLogList: <T extends TableRowData>(data: Record<string, unknown>) =>
    request.post<TablePageResult<T>>("/api/operLog/pageQuery", data),
  getOperLogDetail: (params: { operId: number | string }) =>
    request.get<OperLogDetail>("/api/operLog/detail", { params }),
  deleteOperLog: (data: { operIds: (number | string)[] }) =>
    request.post<void>("/api/operLog/delete", data),
  cleanOperLog: (data: { days: number }) => request.post<void>("/api/operLog/clean", data),
}
