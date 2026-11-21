import type { AxiosRequestConfig } from "axios"
import type { CustomerDetail, ImportCommitResult, TablePageResult } from "@/interface"
import type { TableRowData } from "tdesign-react"
import request from "@/utils/service"

export type { CustomerDetail }

export default {
  customerPageQuery: <T extends TableRowData>(data: Record<string, unknown>) =>
    request.post<TablePageResult<T>>("/api/customer/pageQuery", data),
  /** 全量客户列表（无分页），T 为单条记录类型 */
  customerAllQuery: <
    T extends { customerId: string; customerName: string } = {
      customerId: string
      customerName: string
    },
  >() => request.post<T[]>("/api/customer/allQuery", {}),
  insertCustomer: (data: Record<string, unknown>) => request.post<void>("/api/customer/insert", data),
  updateCustomer: (data: Record<string, unknown>) => request.post<void>("/api/customer/update", data),
  getCustomerDetail: (id: string | number) =>
    request.post<CustomerDetail>(`/api/customer/queryById/${id}`),
  deleteCustomer: (data: Array<string | number>) => request.post<void>("/api/customer/delete", data),
  importCustomer: (data: FormData, config?: AxiosRequestConfig) =>
    request.post<ImportCommitResult>("/api/customer/import", data, {
      headers: { "Content-Type": "multipart/form-data" },
      ...config,
    }),
  downloadCustomerImportTemplate: () =>
    request.post<Blob>("/api/customer/importTemplate", {}, { responseType: "blob" }),
  exportCustomer: (data: Record<string, unknown>) =>
    request.post<Blob>("/api/customer/export", data, { responseType: "blob" }),
}
