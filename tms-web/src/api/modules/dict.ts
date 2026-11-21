import request from "@/utils/service"

/** 字典详情 */
export type DictDetail = Record<string, unknown>

export default {
  getDictPageQuery: (data: Record<string, unknown>) => request.post("/api/dict/pageQuery", data),
  getDictByCode: (data: { dictCode: string }) => request.post("/api/dict/allDict", data),
  insertDict: (data: Record<string, unknown>) => request.post("/api/dict/insert", data),
  updateDict: (data: Record<string, unknown>) => request.post("/api/dict/update", data),
  getDictDetail: (id: string) => request.post<DictDetail>(`/api/dict/queryById/${id}`),
  deleteDict: (data: Record<string, unknown>) => request.post("/api/dict/delete", data),
}
