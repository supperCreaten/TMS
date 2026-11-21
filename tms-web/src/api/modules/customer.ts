import type { AxiosRequestConfig } from "axios"
import type { TablePageResult } from "@/hooks/use-table-query"
import type { TableRowData } from "tdesign-react"
import type { ImportCommitResult } from "@/components/ImportDialog"
import request from "@/utils/service"

/** 客户详情 */
export type CustomerDetail = {
  customerId?: number | string
  customerName?: string
  shortName?: string
  industry?: string
  customerLevel?: string
  customerTags?: string | string[]
  region?: string | string[]
  companyAddress?: string
  status?: string | number
  customerSource?: string
  salesUserName?: string
  businessLicenseNo?: string
  businessLicenseUrl?: string
  contactName?: string
  contactPhone?: string
  contactDept?: string
  contactTitle?: string
  contactEmail?: string
  contactWechat?: string
  settleType?: string
  creditLimit?: number
  payPeriodDays?: number
  invoiceTitle?: string
  taxNo?: string
  bankName?: string
  bankAccountName?: string
  bankAccountNo?: string
  remark?: string
}

export default {
  customerPageQuery: <T extends TableRowData>(data: Record<string, unknown>) =>
    request.post<TablePageResult<T>>("/api/customer/pageQuery", data),
  /** 全量客户列表（无分页），T 为单条记录类型 */
  customerAllQuery: <
    T extends { customerId: string; customerName: string } = { customerId: string; customerName: string },
  >() => request.post<T[]>("/api/customer/allQuery", {}),
  insertCustomer: (data: Record<string, unknown>) => request.post("/api/customer/insert", data),
  updateCustomer: (data: Record<string, unknown>) => request.post("/api/customer/update", data),
  getCustomerDetail: (id: string | number) => request.post<CustomerDetail>(`/api/customer/queryById/${id}`),
  deleteCustomer: (data: Array<string | number>) => request.post("/api/customer/delete", data),
  importCustomer: (data: FormData, config?: AxiosRequestConfig) =>
    request.post<ImportCommitResult>("/api/customer/import", data, {
      headers: { "Content-Type": "multipart/form-data" },
      ...config,
    }),
  downloadCustomerImportTemplate: () => request.post("/api/customer/importTemplate", {}, { responseType: "blob" }),
  exportCustomer: (data: Record<string, unknown>) =>
    request.post("/api/customer/export", data, { responseType: "blob" }),
}
