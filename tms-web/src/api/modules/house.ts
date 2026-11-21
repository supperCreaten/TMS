import type { HouseDetail, TablePageResult } from "@/interface"
import type { TableRowData } from "tdesign-react"
import request from "@/utils/service"

export type { HouseDetail }

export default {
  getHousePageQuery: <T extends TableRowData>(data: Record<string, unknown>) =>
    request.post<TablePageResult<T>>("/api/house/pageQuery", data),
  insertHouse: (data: Record<string, unknown>) => request.post<void>("/api/house/insert", data),
  updateHouse: (data: Record<string, unknown>) => request.post<void>("/api/house/update", data),
  getHouseDetail: (id: string) => request.post<HouseDetail>(`/api/house/queryById/${id}`),
  deleteHouse: (data: string[]) => request.post<void>("/api/house/delete", data),
}
