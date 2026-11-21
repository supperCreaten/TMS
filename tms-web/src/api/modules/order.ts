import type { AxiosRequestConfig } from "axios"
import type { ImportCommitResult, OrderCargoItem, OrderDetail, TablePageResult } from "@/interface"
import type { TableRowData } from "tdesign-react"
import request from "@/utils/service"

export type { OrderCargoItem, OrderDetail }

export default {
  orderPageQuery: <T extends TableRowData>(data: Record<string, unknown>) =>
    request.post<TablePageResult<T>>("/api/order/pageQuery", data),
  insertOrder: (data: Record<string, unknown>) => request.post<void>("/api/order/insert", data),
  updateOrder: (data: Record<string, unknown>) => request.post<void>("/api/order/update", data),
  getOrderDetail: (id: string | number) => request.post<OrderDetail>(`/api/order/queryById/${id}`),
  deleteOrder: (data: Array<string | number>) => request.post<void>("/api/order/delete", data),
  importOrder: (data: FormData, config?: AxiosRequestConfig) =>
    request.post<ImportCommitResult>("/api/order/import", data, {
      headers: { "Content-Type": "multipart/form-data" },
      ...config,
    }),
  downloadOrderImportTemplate: () =>
    request.post<Blob>("/api/order/importTemplate", {}, { responseType: "blob" }),
  exportOrder: (data: Record<string, unknown>) =>
    request.post<Blob>("/api/order/export", data, { responseType: "blob" }),
}
