import { useMemo, useRef, useState } from "react"
import { AddIcon, FileExportIcon, FileImportIcon } from "tdesign-icons-react"
import { Button, DateRangePicker, DialogPlugin, Select, Tag, type TableProps } from "tdesign-react"
import api from "@/api"
import BasicTable, { type BasicTableRef } from "@/components/BasicTable"
import ImportDialog from "@/components/ImportDialog"
import InputText from "@/components/InputText"
import SearchBox, { type SearchBoxRef } from "@/components/SearchBox"
import TableSection from "@/components/TableSection"
import type { FormConfig } from "@/interface"
import { getParams, showMessage } from "@/utils/methods"
import {
  COOP_STATUS_OPTIONS,
  CUSTOMER_LEVEL_OPTIONS,
  SETTLE_TYPE_OPTIONS,
  labelOf,
} from "../constants"
import AddCustomer from "./components/AddCustomer"

type CustomerRow = {
  customerId: string | number
  customerNo?: string
  customerName?: string
  customerLevel?: string
  status?: string
  settleType?: string
  contactName?: string
  contactPhone?: string
  salesUserName?: string
  createTime?: string
}

type CustomerDialogState = {
  visible: boolean
  title: string
  customerId?: string
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export default function ResourceCustomer() {
  const searchRef = useRef<SearchBoxRef>(null)
  const tableRef = useRef<BasicTableRef<CustomerRow>>(null)
  const [selectedKeys, setSelectedKeys] = useState<Array<string | number>>([])
  const [dialog, setDialog] = useState<CustomerDialogState>({ visible: false, title: "" })
  const [importVisible, setImportVisible] = useState(false)

  const formConfig = useMemo<FormConfig[]>(
    () => [
      {
        label: "客户级别",
        name: "customerLevel",
        component: <Select clearable options={CUSTOMER_LEVEL_OPTIONS} placeholder="全部" />,
      },
      {
        label: "合作状态",
        name: "status",
        component: <Select clearable options={COOP_STATUS_OPTIONS} placeholder="全部" />,
      },
      {
        label: "结算方式",
        name: "settleType",
        component: <Select clearable options={SETTLE_TYPE_OPTIONS} placeholder="全部" />,
      },
      {
        label: "创建日期",
        name: "createTimeRange",
        component: <DateRangePicker clearable placeholder={["开始日期", "结束日期"]} />,
      },
      {
        label: "关键词",
        name: "keyword",
        component: <InputText clearable placeholder="名称/编号/联系人/手机" />,
      },
    ],
    [],
  )

  const columns = useMemo<TableProps<CustomerRow>["columns"]>(
    () => [
      { colKey: "row-select", type: "multiple", width: 50, fixed: "left" },
      { title: "客户编号", colKey: "customerNo", width: 150, align: "center", fixed: "left", ellipsis: true },
      { title: "客户名称", colKey: "customerName", width: 180, align: "center", ellipsis: true },
      {
        title: "客户级别",
        colKey: "customerLevel",
        width: 110,
        align: "center",
        cell: ({ row }) => labelOf(CUSTOMER_LEVEL_OPTIONS, row.customerLevel),
      },
      {
        title: "状态",
        colKey: "status",
        width: 88,
        align: "center",
        cell: ({ row }) =>
          String(row.status) === "0" ? (
            <Tag theme="success" variant="light">
              启用
            </Tag>
          ) : (
            <Tag variant="light">停用</Tag>
          ),
      },
      {
        title: "结算方式",
        colKey: "settleType",
        width: 100,
        align: "center",
        cell: ({ row }) => labelOf(SETTLE_TYPE_OPTIONS, row.settleType),
      },
      { title: "联系人", colKey: "contactName", width: 110, align: "center", ellipsis: true },
      { title: "手机号码", colKey: "contactPhone", width: 130, align: "center" },
      { title: "业务员", colKey: "salesUserName", width: 100, align: "center", ellipsis: true },
      { title: "创建时间", colKey: "createTime", width: 170, align: "center", ellipsis: true },
      {
        title: "操作",
        colKey: "operation",
        width: 160,
        align: "center",
        fixed: "right",
        cell: ({ row }) => (
          <div className="flex flex-wrap items-center justify-center gap-1">
            <Button
              theme="primary"
              variant="text"
              onClick={() =>
                setDialog({ visible: true, title: "修改客户", customerId: String(row.customerId) })
              }
            >
              修改
            </Button>
            <Button theme="danger" variant="text" onClick={() => handleDelete([row.customerId], row.customerName)}>
              删除
            </Button>
          </div>
        ),
      },
    ],
    [],
  )

  const buildSearchParams = () => {
    const raw = searchRef.current?.getFieldsValue(true) ?? {}
    const { createTimeRange, ...rest } = raw as Record<string, unknown>
    const params = getParams(rest)
    if (Array.isArray(createTimeRange) && createTimeRange.length === 2) {
      params.beginCreateTime = createTimeRange[0]
      params.endCreateTime = createTimeRange[1]
    }
    return params
  }

  const handleSearch = () => {
    void tableRef.current?.refresh({ resetCurrent: true })
  }

  const handleDelete = (ids: Array<string | number>, name?: string) => {
    const dialogInstance = DialogPlugin.confirm({
      header: "提示",
      body: name ? `是否确认删除客户「${name}」？` : `是否确认删除选中的 ${ids.length} 个客户？`,
      onConfirm: async () => {
        try {
          await api.deleteCustomer(ids)
          showMessage("删除成功", "success")
          dialogInstance.hide?.()
          setSelectedKeys([])
          void tableRef.current?.refresh()
        } catch {
          /* 请求层已提示 */
        }
      },
      onClose: () => dialogInstance.hide?.(),
    })
  }

  const handleExport = async () => {
    try {
      const blob = (await api.exportCustomer(buildSearchParams())) as Blob
      downloadBlob(blob, "客户数据.xlsx")
      showMessage("导出成功", "success")
    } catch {
      /* 请求层已提示 */
    }
  }

  return (
    <TableSection>
      <TableSection.Header>
        <SearchBox ref={searchRef} formConfig={formConfig} onSearch={handleSearch} />
      </TableSection.Header>
      <TableSection.ToolbarRight>
        <Button theme="primary" icon={<AddIcon />} onClick={() => setDialog({ visible: true, title: "新增客户" })}>
          新增
        </Button>
        <Button variant="outline" icon={<FileImportIcon />} onClick={() => setImportVisible(true)}>
          导入
        </Button>
        <Button
          theme="danger"
          variant="outline"
          disabled={!selectedKeys.length}
          onClick={() => handleDelete(selectedKeys)}
        >
          批量删除
        </Button>
        <Button variant="outline" icon={<FileExportIcon />} onClick={() => void handleExport()}>
          导出
        </Button>
      </TableSection.ToolbarRight>
      <TableSection.Content>
        <BasicTable<CustomerRow>
          ref={tableRef}
          rowKey="customerId"
          columns={columns}
          request={api.customerPageQuery}
          searchParams={buildSearchParams}
          tableProps={{
            tableLayout: "fixed",
            selectedRowKeys: selectedKeys,
            onSelectChange: (keys) => setSelectedKeys(keys as Array<string | number>),
          }}
        />
        {dialog.visible ? (
          <AddCustomer
            visible={dialog.visible}
            title={dialog.title}
            customerId={dialog.customerId}
            onClose={(submitted) => {
              setDialog({ visible: false, title: "" })
              if (submitted) void tableRef.current?.refresh()
            }}
          />
        ) : null}
        {importVisible ? (
          <ImportDialog
            visible={importVisible}
            title="导入客户"
            templateFileName="客户导入模板.xlsx"
            downloadTemplate={() => api.downloadCustomerImportTemplate() as Promise<Blob>}
            importFile={(formData) => api.importCustomer(formData)}
            onClose={(imported) => {
              setImportVisible(false)
              if (imported) void tableRef.current?.refresh()
            }}
          />
        ) : null}
      </TableSection.Content>
    </TableSection>
  )
}
