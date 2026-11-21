import type { DictDetail, DictItem, TablePageResult } from "@/interface"
import type { TableRowData } from "tdesign-react"
import request from "@/utils/service"

export type { DictDetail, DictItem }

export default {
  getDictPageQuery: <T extends TableRowData>(data: Record<string, unknown>) =>
    request.post<TablePageResult<T>>("/api/dict/pageQuery", data),
  getDictByCode: (data: { dictCode: string }) => request.post<DictItem[]>("/api/dict/allDict", data),
  insertDict: (data: Record<string, unknown>) => request.post<void>("/api/dict/insert", data),
  updateDict: (data: Record<string, unknown>) => request.post<void>("/api/dict/update", data),
  getDictDetail: (id: string) => request.post<DictDetail>(`/api/dict/queryById/${id}`),
  deleteDict: (data: Record<string, unknown>) => request.post<void>("/api/dict/delete", data),
}
