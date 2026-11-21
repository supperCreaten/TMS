import type { PostDetail, TablePageResult } from "@/interface"
import type { TableRowData } from "tdesign-react"
import request from "@/utils/service"

export type { PostDetail } from "@/interface"

export default {
  getPostList: <T extends TableRowData>(data: Record<string, unknown>) =>
    request.post<TablePageResult<T>>("/api/post/pageQuery", data),
  getPostDetail: (params: { postId: number | string }) =>
    request.get<PostDetail>("/api/post/detail", { params }),
  insertPost: (data: Record<string, unknown>) => request.post<void>("/api/post/insert", data),
  updatePost: (data: Record<string, unknown>) => request.post<void>("/api/post/update", data),
  deletePost: (params: { postId: number | string }) =>
    request.get<void>("/api/post/delete", { params }),
}