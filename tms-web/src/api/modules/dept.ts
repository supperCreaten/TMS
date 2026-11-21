import request from "@/utils/service"

/** 部门详情 */
export type DeptDetail = {
  parentId?: string | number
  deptName?: string
  orderNum?: number
  leader?: string
  phone?: string
  email?: string
  status?: string | number
}

export default {
  getDepts: (data?: Record<string, unknown>) => request.post("/api/dept/pageQuery", data ?? {}),
  getDeptDetail: (params: { deptId: number | string }) =>
    request.get<DeptDetail>("/api/dept/detail", { params }),
  insertDept: (data: Record<string, unknown>) => request.post("/api/dept/insert", data),
  updateDept: (data: Record<string, unknown>) => request.post("/api/dept/update", data),
  deleteDept: (params: { deptId: number | string }) => request.get("/api/dept/delete", { params }),
}
