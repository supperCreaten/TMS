import type { MenuDetail } from "@/interface"
import request from "@/utils/service"

export type { MenuDetail }

export default {
  getMenus: <T = Record<string, unknown>>(data?: Record<string, unknown>) =>
    request.post<T[]>("/api/menu/pageQuery", data ?? {}),
  getMenuDetail: (params: { menuId: number | string }) =>
    request.get<MenuDetail>("/api/menu/detail", { params }),
  insertMenu: (data: Record<string, unknown>) => request.post<void>("/api/menu/insert", data),
  updateMenu: (data: Record<string, unknown>) => request.post<void>("/api/menu/update", data),
  deleteMenu: (params: { menuId: number | string }) =>
    request.get<void>("/api/menu/delete", { params }),
}
