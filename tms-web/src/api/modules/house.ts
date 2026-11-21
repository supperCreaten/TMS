import request from "@/utils/service"

/** 房源详情 */
export type HouseDetail = Record<string, unknown>

export default {
  getHousePageQuery: (data: Record<string, unknown>) => request.post("/api/house/pageQuery", data),
  insertHouse: (data: Record<string, unknown>) => request.post("/api/house/insert", data),
  updateHouse: (data: Record<string, unknown>) => request.post("/api/house/update", data),
  getHouseDetail: (id: string) => request.post<HouseDetail>(`/api/house/queryById/${id}`),
  deleteHouse: (data: string[]) => request.post("/api/house/delete", data),
}
