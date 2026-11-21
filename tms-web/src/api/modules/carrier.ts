import type { AxiosRequestConfig } from "axios"
import type { TablePageResult } from "@/hooks/use-table-query"
import type { TableRowData } from "tdesign-react"
import type { ImportCommitResult } from "@/components/ImportDialog"
import request from "@/utils/service"

/** 承运商详情 */
export type CarrierDetail = {
  carrierId?: number | string
  carrierName?: string
  shortName?: string
  legalPerson?: string
  carrierType?: string
  carrierLevel?: string
  taxRegNo?: string
  region?: string | string[]
  companyAddress?: string
  companyEmail?: string
  status?: string | number
  businessLicenseNo?: string
  businessLicenseUrl?: string
  roadPermitNo?: string
  roadPermitUrl?: string
  contactName?: string
  contactPhone?: string
  contactDept?: string
  contactTitle?: string
  contactEmail?: string
  contactWechat?: string
  settleType?: string
  invoiceTitle?: string
  taxNo?: string
  bankName?: string
  bankAccountName?: string
  bankAccountNo?: string
  contractSigned?: string
  contractFileUrl?: string
  contractExpireDate?: string
  remark?: string
}

export default {
  carrierPageQuery: <T extends TableRowData>(data: Record<string, unknown>) =>
    request.post<TablePageResult<T>>("/api/carrier/pageQuery", data),
  insertCarrier: (data: Record<string, unknown>) => request.post("/api/carrier/insert", data),
  updateCarrier: (data: Record<string, unknown>) => request.post("/api/carrier/update", data),
  getCarrierDetail: (id: string | number) => request.post<CarrierDetail>(`/api/carrier/queryById/${id}`),
  deleteCarrier: (data: Array<string | number>) => request.post("/api/carrier/delete", data),
  importCarrier: (data: FormData, config?: AxiosRequestConfig) =>
    request.post<ImportCommitResult>("/api/carrier/import", data, {
      headers: { "Content-Type": "multipart/form-data" },
      ...config,
    }),
  downloadCarrierImportTemplate: () =>
    request.post("/api/carrier/importTemplate", {}, { responseType: "blob" }),
  exportCarrier: (data: Record<string, unknown>) =>
    request.post("/api/carrier/export", data, { responseType: "blob" }),
}
