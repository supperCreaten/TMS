import type { AxiosRequestConfig } from "axios"
import type { TablePageResult } from "@/hooks/use-table-query"
import type { TableRowData } from "tdesign-react"
import type { ImportCommitResult } from "@/components/ImportDialog"
import request from "@/utils/service"

/** 订单详情（扁平字段 + 货物明细） */
export type OrderDetail = Record<string, unknown> & {
  cargoList?: TableRowData[]
}

export default {
  orderPageQuery: <T extends TableRowData>(data: Record<string, unknown>) =>
    request.post<TablePageResult<T>>("/api/order/pageQuery", data),
  insertOrder: (data: Record<string, unknown>) => request.post("/api/order/insert", data),
  updateOrder: (data: Record<string, unknown>) => request.post("/api/order/update", data),
  getOrderDetail: (id: string | number) => request.post<OrderDetail>(`/api/order/queryById/${id}`),
  deleteOrder: (data: Array<string | number>) => request.post("/api/order/delete", data),
  importOrder: (data: FormData, config?: AxiosRequestConfig) =>
    request.post<ImportCommitResult>("/api/order/import", data, {
      headers: { "Content-Type": "multipart/form-data" },
      ...config,
    }),
  downloadOrderImportTemplate: () => request.post("/api/order/importTemplate", {}, { responseType: "blob" }),
  exportOrder: (data: Record<string, unknown>) =>
    request.post("/api/order/export", data, { responseType: "blob" }),
}
