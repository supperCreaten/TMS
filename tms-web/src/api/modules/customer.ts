import type { AxiosRequestConfig } from "axios"
import type { TablePageResult } from "@/hooks/use-table-query"
import type { TableRowData } from "tdesign-react"
import type { ImportCommitResult } from "@/components/ImportDialog"
import request from "@/utils/service"

export default {
  customerPageQuery: <T extends TableRowData>(data: Record<string, unknown>) =>
    request.post<TablePageResult<T>>("/api/customer/pageQuery", data),
  insertCustomer: (data: Record<string, unknown>) => request.post("/api/customer/insert", data),
  updateCustomer: (data: Record<string, unknown>) => request.post("/api/customer/update", data),
  getCustomerDetail: (id: string | number) => request.post(`/api/customer/queryById/${id}`),
  deleteCustomer: (data: Array<string | number>) => request.post("/api/customer/delete", data),
  importCustomer: (data: FormData, config?: AxiosRequestConfig) =>
    request.post<ImportCommitResult>("/api/customer/import", data, {
      headers: { "Content-Type": "multipart/form-data" },
      ...config,
    }),
  downloadCustomerImportTemplate: () =>
    request.post("/api/customer/importTemplate", {}, { responseType: "blob" }),
  exportCustomer: (data: Record<string, unknown>) =>
    request.post("/api/customer/export", data, { responseType: "blob" }),
}
