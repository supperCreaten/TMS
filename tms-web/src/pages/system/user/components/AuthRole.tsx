import { useEffect, useReducer } from "react"
import { Checkbox, Loading } from "tdesign-react"
import api from "@/api"
import BasicDialog from "@/components/BasicDialog"
import type { AuthRoleProps, AuthRoleState as AuthRoleStateBase } from "@/interface"
import { showMessage } from "@/utils/methods"

export type { AuthRoleProps } from "@/interface"

type AuthRoleState = AuthRoleStateBase & { submitting: boolean }

const initialState: AuthRoleState = {
  loading: false,
  submitting: false,
  roleOptions: [],
  roleIds: [],
}

function authRoleReducer(state: AuthRoleState, patch: Partial<AuthRoleState>): AuthRoleState {
  return { ...state, ...patch }
}

export default function AuthRole(props: AuthRoleProps) {
  const { visible, userId, userName, onClose } = props
  const [state, dispatch] = useReducer(authRoleReducer, initialState)
  const { loading, submitting, roleOptions, roleIds } = state

  useEffect(() => {
    if (!visible || !userId) return
    const init = async () => {
      dispatch({ loading: true })
      try {
        const [roleRes, detail] = await Promise.all([
          api.getRoleList<{ roleId: string | number; roleName: string; roleKey?: string }>({
            pageNum: 1,
            pageSize: 500,
            status: "0",
          }),
          api.getUserDetail({ userId }),
        ])
        const rows = Array.isArray(roleRes?.rows) ? roleRes.rows : []
        dispatch({
          roleOptions: rows.map((item) => ({
            roleId: String(item.roleId),
            roleName: item.roleName,
            roleKey: item.roleKey,
          })),
          roleIds: ((detail as { roleIds?: Array<string | number> })?.roleIds ?? []).map(String),
        })
      } finally {
        dispatch({ loading: false })
      }
    }
    void init()
  }, [visible, userId])

  const handleSubmit = async () => {
    if (!userId) return
    dispatch({ submitting: true })
    try {
      await api.authUserRole({
        userId,
        roleIds: roleIds.map((id) => Number(id)),
      })
      showMessage("授权成功", "success")
      onClose(true)
    } finally {
      dispatch({ submitting: false })
    }
  }

  return (
    <BasicDialog
      visible={visible}
      header={userName ? `分配角色 - ${userName}` : "分配角色"}
      width={520}
      confirmLoading={submitting}
      confirmText="保存"
      onClose={() => onClose()}
      onConfirm={() => void handleSubmit()}
    >
      <Loading loading={loading} showOverlay>
        <div className="min-h-40">
          <Checkbox.Group
            value={roleIds}
            onChange={(value) =>
              dispatch({ roleIds: (value as Array<string | number>).map(String) })
            }
            className="flex flex-col gap-2"
          >
            {roleOptions.map((item) => (
              <Checkbox key={item.roleId} value={item.roleId}>
                {item.roleName}
                {item.roleKey ? `（${item.roleKey}）` : ""}
              </Checkbox>
            ))}
          </Checkbox.Group>
          {!loading && roleOptions.length === 0 ? (
            <div className="py-8 text-center text-[var(--td-text-color-placeholder)]">暂无角色数据</div>
          ) : null}
        </div>
      </Loading>
    </BasicDialog>
  )
}
