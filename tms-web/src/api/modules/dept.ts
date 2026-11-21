import type { DeptDetail } from "@/interface"
import request from "@/utils/service"

export type { DeptDetail } from "@/interface"

export default {
  getDepts: <T = Record<string, unknown>>(data?: Record<string, unknown>) =>
    request.post<T[]>("/api/dept/pageQuery", data ?? {}),
  getDeptDetail: (params: { deptId: number | string }) =>
    request.get<DeptDetail>("/api/dept/detail", { params }),
  insertDept: (data: Record<string, unknown>) => request.post<void>("/api/dept/insert", data),
  updateDept: (data: Record<string, unknown>) => request.post<void>("/api/dept/update", data),
  deleteDept: (params: { deptId: number | string }) =>
    request.get<void>("/api/dept/delete", { params }),
}