import { useMemo, useRef, useState } from "react"
import { AddIcon, FileExportIcon, FileImportIcon } from "tdesign-icons-react"
import { Button, DateRangePicker, DialogPlugin, Select, Tag, type TableProps } from "tdesign-react"
import api from "@/api"
import BasicTable, { type BasicTableRef } from "@/components/BasicTable"
import ImportDialog from "@/components/ImportDialog"
import InputText from "@/components/InputText"
import SearchBox, { type SearchBoxRef } from "@/components/SearchBox"
import TableSection from "@/components/TableSection"
import type { CarrierDialogState, CarrierRow, FormConfig } from "@/interface"
import { getParams, showMessage } from "@/utils/methods"
import {
  CARRIER_LEVEL_OPTIONS,
  CARRIER_TYPE_OPTIONS,
  CONTRACT_SIGNED_OPTIONS,
  COOP_STATUS_OPTIONS,
  labelOf,
} from "../constants"
import AddCarrier from "./components/AddCarrier"

type CarrierTableRow = CarrierRow & {
  companyAddress?: string
  contractSigned?: string
  driverCount?: number
  vehicleCount?: number
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export default function ResourceCarrier() {
  const searchRef = useRef<SearchBoxRef>(null)
  const tableRef = useRef<BasicTableRef<CarrierTableRow>>(null)
  const [selectedKeys, setSelectedKeys] = useState<Array<string | number>>([])
  const [dialog, setDialog] = useState<CarrierDialogState>({ visible: false, title: "" })
  const [importVisible, setImportVisible] = useState(false)

  const formConfig = useMemo<FormConfig[]>(
    () => [
      {
        label: "是否签订合同",
        name: "contractSigned",
        component: <Select clearable options={CONTRACT_SIGNED_OPTIONS} placeholder="全部" />,
      },
      {
        label: "合作状态",
        name: "status",
        component: <Select clearable options={COOP_STATUS_OPTIONS} placeholder="全部" />,
      },
      {
        label: "承运商类型",
        name: "carrierType",
        component: <Select clearable options={CARRIER_TYPE_OPTIONS} placeholder="全部" />,
      },
      {
        label: "评级",
        name: "carrierLevel",
        component: <Select clearable options={CARRIER_LEVEL_OPTIONS} placeholder="全部" />,
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

  const columns = useMemo<TableProps<CarrierTableRow>["columns"]>(
    () => [
      { colKey: "row-select", type: "multiple", width: 50, fixed: "left" },
      { title: "承运商编号", colKey: "carrierNo", width: 150, align: "center", fixed: "left", ellipsis: true },
      { title: "承运商名称", colKey: "carrierName", width: 180, align: "center", ellipsis: true },
      { title: "公司地址", colKey: "companyAddress", width: 200, align: "center", ellipsis: true },
      { title: "承运商类型", colKey: "carrierType", width: 140, align: "center", ellipsis: true },
      {
        title: "评级",
        colKey: "carrierLevel",
        width: 80,
        align: "center",
        cell: ({ row }) => labelOf(CARRIER_LEVEL_OPTIONS, row.carrierLevel),
      },
      {
        title: "是否签订合同",
        colKey: "contractSigned",
        width: 120,
        align: "center",
        cell: ({ row }) =>
          String(row.contractSigned) === "1" ? (
            <span className="text-(--td-brand-color)">是</span>
          ) : (
            "否"
          ),
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
        title: "司机数量",
        colKey: "driverCount",
        width: 100,
        align: "center",
        cell: ({ row }) => <span className="text-(--td-brand-color)">{row.driverCount ?? 0}</span>,
      },
      {
        title: "车辆数量",
        colKey: "vehicleCount",
        width: 100,
        align: "center",
        cell: ({ row }) => <span className="text-(--td-brand-color)">{row.vehicleCount ?? 0}</span>,
      },
      { title: "联系人", colKey: "contactName", width: 110, align: "center", ellipsis: true },
      { title: "手机号码", colKey: "contactPhone", width: 130, align: "center" },
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
                setDialog({ visible: true, title: "修改承运商", carrierId: String(row.carrierId) })
              }
            >
              修改
            </Button>
            <Button theme="danger" variant="text" onClick={() => handleDelete([row.carrierId], row.carrierName)}>
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
      body: name ? `是否确认删除承运商「${name}」？` : `是否确认删除选中的 ${ids.length} 个承运商？`,
      onConfirm: async () => {
        try {
          await api.deleteCarrier(ids)
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
      const blob = await api.exportCarrier(buildSearchParams())
      downloadBlob(blob, "承运商数据.xlsx")
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
        <Button theme="primary" icon={<AddIcon />} onClick={() => setDialog({ visible: true, title: "新增承运商" })}>
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
        <BasicTable<CarrierTableRow>
          ref={tableRef}
          rowKey="carrierId"
          columns={columns}
          request={api.carrierPageQuery}
          searchParams={buildSearchParams}
          tableProps={{
            tableLayout: "fixed",
            selectedRowKeys: selectedKeys,
            onSelectChange: (keys) => setSelectedKeys(keys as Array<string | number>),
          }}
        />
        {dialog.visible ? (
          <AddCarrier
            visible={dialog.visible}
            title={dialog.title}
            carrierId={dialog.carrierId}
            onClose={(submitted) => {
              setDialog({ visible: false, title: "" })
              if (submitted) void tableRef.current?.refresh()
            }}
          />
        ) : null}
        {importVisible ? (
          <ImportDialog
            visible={importVisible}
            title="导入承运商"
            templateFileName="承运商导入模板.xlsx"
            downloadTemplate={() => api.downloadCarrierImportTemplate()}
            importFile={(formData) => api.importCarrier(formData)}
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
