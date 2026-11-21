import type { AxiosRequestConfig } from "axios"
import type { CarrierDetail, ImportCommitResult, TablePageResult } from "@/interface"
import type { TableRowData } from "tdesign-react"
import request from "@/utils/service"

export type { CarrierDetail } from "@/interface"

export default {
  carrierPageQuery: <T extends TableRowData>(data: Record<string, unknown>) =>
    request.post<TablePageResult<T>>("/api/carrier/pageQuery", data),
  insertCarrier: (data: Record<string, unknown>) => request.post<void>("/api/carrier/insert", data),
  updateCarrier: (data: Record<string, unknown>) => request.post<void>("/api/carrier/update", data),
  getCarrierDetail: (id: string | number) => request.post<CarrierDetail>(`/api/carrier/queryById/${id}`),
  deleteCarrier: (data: Array<string | number>) => request.post<void>("/api/carrier/delete", data),
  importCarrier: (data: FormData, config?: AxiosRequestConfig) =>
    request.post<ImportCommitResult>("/api/carrier/import", data, {
      headers: { "Content-Type": "multipart/form-data" },
      ...config,
    }),
  downloadCarrierImportTemplate: () =>
    request.post<Blob>("/api/carrier/importTemplate", {}, { responseType: "blob" }),
  exportCarrier: (data: Record<string, unknown>) =>
    request.post<Blob>("/api/carrier/export", data, { responseType: "blob" }),
}