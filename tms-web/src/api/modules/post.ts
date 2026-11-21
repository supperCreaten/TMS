import type { TablePageResult } from "@/hooks/use-table-query"
import type { TableRowData } from "tdesign-react"
import request from "@/utils/service"

/** 岗位详情 */
export type PostDetail = {
  postName?: string
  postCode?: string
  deptId?: string | number
  postSort?: number
  status?: string | number
  remark?: string
}

export default {
  getPostList: <T extends TableRowData>(data: Record<string, unknown>) =>
    request.post<TablePageResult<T>>("/api/post/pageQuery", data),
  getPostDetail: (params: { postId: number | string }) =>
    request.get<PostDetail>("/api/post/detail", { params }),
  insertPost: (data: Record<string, unknown>) => request.post("/api/post/insert", data),
  updatePost: (data: Record<string, unknown>) => request.post("/api/post/update", data),
  deletePost: (params: { postId: number | string }) => request.get("/api/post/delete", { params }),
}
