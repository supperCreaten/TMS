import request from "@/utils/service"

/** 菜单详情 */
export type MenuDetail = {
  parentId?: string | number
  menuType?: number
  icon?: string
  menuName?: string
  orderNum?: number
  path?: string
  perms?: string
  isFrame?: string | number
  visible?: string | number
  hidden?: string | number
  status?: string | number
  isCache?: string | number
  keepAlive?: string | number
}

export default {
  getMenus: (data?: Record<string, unknown>) => request.post("/api/menu/pageQuery", data ?? {}),
  getMenuDetail: (params: { menuId: number | string }) =>
    request.get<MenuDetail>("/api/menu/detail", { params }),
  insertMenu: (data: Record<string, unknown>) => request.post("/api/menu/insert", data),
  updateMenu: (data: Record<string, unknown>) => request.post("/api/menu/update", data),
  deleteMenu: (params: { menuId: number | string }) => request.get("/api/menu/delete", { params }),
}
