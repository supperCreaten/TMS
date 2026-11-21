import BasicTable, { BasicTableRef } from "@/components/BasicTable"
import TableSection from "@/components/TableSection"
import { useMemo, useRef, useState } from "react"
import { AddIcon, DeleteIcon, FileExportIcon } from "tdesign-icons-react"
import { Button, TableProps, Tag } from "tdesign-react"
import type { FormConfig } from "@/interface"
import api from "@/api"
import { getParams } from "@/utils/methods"
import SearchBox, { SearchBoxRef } from "@/components/SearchBox"
import MoreActions from "@/components/MoreActions"
import InputText from "@/components/InputText"
import { useNavigate } from "react-router-dom"
import useDict, { getDictLabel } from "@/hooks/use-dict"
import { ORDER_DICT } from "./constants"
interface OrderRow {
  orderId: number
  orderNo?: string
  waybillNo?: string
  origin?: string
  destination?: string
  customerId?: number | string
  customerName?: string
  orderStatus?: string
  orderStatusText?: string
  senderName?: string
  senderPhone?: string
  senderAddress?: string
  receiverName?: string
  receiverPhone?: string
  receiverAddress?: string
  expectArriveTime?: string
  transportType?: string
  cargoType?: string
  totalQuantity?: number
  totalWeight?: number
  totalFee?: number
  orderSource?: string
  remark?: string
  createBy?: string
  createTime?: string
}
export default function order() {
  const searchRef = useRef<SearchBoxRef>(null)
  const tableRef = useRef<BasicTableRef<OrderRow>>(null)
  const [selectedKeys, setSelectedKeys] = useState<Array<string | number>>([])
  const navigate = useNavigate()
  const dict = useDict([ORDER_DICT.cargoType, ORDER_DICT.transportType, ORDER_DICT.orderSource])
  const cargoTypeOptions = dict[ORDER_DICT.cargoType] ?? []
  const transportTypeOptions = dict[ORDER_DICT.transportType] ?? []
  const orderSourceOptions = dict[ORDER_DICT.orderSource] ?? []
  const formConfig = useMemo<FormConfig[]>(
    () => [
      {
        label: "账号",
        name: "account",
        component: <InputText clearable placeholder="请输入账号" />,
      },
      {
        label: "昵称",
        name: "nickName",
        component: <InputText clearable placeholder="请输入昵称" />,
      },
      {
        label: "手机号码",
        name: "phone",
        component: <InputText clearable placeholder="请输入手机号码" />,
      },
    ],
    [],
  )
  const columns = useMemo<TableProps<OrderRow>["columns"]>(
    () => [
      { colKey: "row-select", type: "multiple", width: 50, fixed: "left" },
      {
        title: "订单编号",
        colKey: "orderNo",
        width: 150,
        align: "center",
        fixed: "left",
        ellipsis: true,
        cell: ({ row }) => (
          <Button theme="primary" variant="text" style={{ padding: 0 }}>
            {row.orderNo || "-"}
          </Button>
        ),
      },
      {
        title: "关联运单号",
        colKey: "waybillNo",
        width: 150,
        align: "center",
        ellipsis: true,
        cell: ({ row }) =>
          row.waybillNo ? (
            <Button theme="primary" variant="text" style={{ padding: 0 }}>
              {row.waybillNo}
            </Button>
          ) : (
            "-"
          ),
      },
      {
        title: "始发地",
        colKey: "origin",
        width: 160,
        align: "center",
        ellipsis: true,
        cell: ({ row }) => (Array.isArray(row.origin) ? row.origin.join("/") : row.origin) || "-",
      },
      {
        title: "目的地",
        colKey: "destination",
        width: 160,
        align: "center",
        ellipsis: true,
        cell: ({ row }) => (Array.isArray(row.destination) ? row.destination.join("/") : row.destination) || "-",
      },
      { title: "客户名称", colKey: "customerName", width: 140, align: "center", ellipsis: true },
      {
        title: "订单状态",
        colKey: "orderStatus",
        width: 110,
        align: "center",
        cell: ({ row }) => {
          return <Tag variant="light">{row?.orderStatusText}</Tag>
        },
      },
      {
        title: "发货信息",
        colKey: "senderInfo",
        width: 200,
        ellipsis: true,
        cell: ({ row }) => (
          <div style={{ lineHeight: 1.6 }}>
            <div>联系人：{row.senderName || "-"}</div>
            <div>联系电话：{row.senderPhone || "-"}</div>
            <div>发货地址：{row.senderAddress || "-"}</div>
          </div>
        ),
      },
      {
        title: "收货信息",
        colKey: "receiverInfo",
        width: 200,
        ellipsis: true,
        cell: ({ row }) => (
          <div style={{ lineHeight: 1.6 }}>
            <div>联系人：{row.receiverName || "-"}</div>
            <div>联系电话：{row.receiverPhone || "-"}</div>
            <div>收货地址：{row.receiverAddress || "-"}</div>
          </div>
        ),
      },
      {
        title: "客户期望送达时间",
        colKey: "expectArriveTime",
        width: 170,
        align: "center",
        ellipsis: true,
      },
      {
        title: "订单类型",
        colKey: "transportType",
        width: 100,
        align: "center",
        ellipsis: true,
        cell: ({ row }) => getDictLabel(transportTypeOptions, row.transportType),
      },
      {
        title: "货物类型",
        colKey: "cargoType",
        width: 100,
        align: "center",
        ellipsis: true,
        cell: ({ row }) => getDictLabel(cargoTypeOptions, row.cargoType),
      },
      { title: "货物数量", colKey: "totalQuantity", width: 100, align: "center" },
      { title: "总重量", colKey: "totalWeight", width: 100, align: "center" },
      { title: "运费合计", colKey: "totalFee", width: 110, align: "center" },
      {
        title: "订单来源",
        colKey: "orderSource",
        width: 110,
        align: "center",
        ellipsis: true,
        cell: ({ row }) => getDictLabel(orderSourceOptions, row.orderSource),
      },
      { title: "订单备注", colKey: "remark", width: 160, align: "center", ellipsis: true },
      { title: "下单时间", colKey: "createTime", width: 170, align: "center", ellipsis: true },
      { title: "创建人", colKey: "createBy", width: 100, align: "center", ellipsis: true },
      {
        title: "操作",
        colKey: "operation",
        width: 110,
        align: "center",
        fixed: "right",
        cell: ({ row }) => (
          <MoreActions
            actionButtonProps={{ size: "small", style: { padding: "0 4px" } }}
            moreButtonProps={{ size: "small", style: { padding: "0 4px" } }}
            items={[
              {
                key: "edit",
                label: "修改",
                onClick: () => {
                  navigate(`/order/edit/?orderId=${row?.orderId}`)
                },
              },
              { key: "dispatch", label: "调度", onClick: () => {} },
              { key: "detail", label: "详情", theme: "danger", onClick: () => {} },
            ]}
          />
        ),
      },
    ],
    [cargoTypeOptions, transportTypeOptions, orderSourceOptions],
  )
  const handleSearch = () => {
    tableRef.current?.refresh({ resetCurrent: true })
  }
  return (
    <TableSection>
      <TableSection.Header>
        <SearchBox ref={searchRef} formConfig={formConfig} fieldsPerRow={3} onSearch={handleSearch} />
      </TableSection.Header>
      <TableSection.Content>
        <TableSection.ToolbarRight>
          <Button theme="primary" icon={<AddIcon />} onClick={() => navigate("/order/create")}>
            新增
          </Button>
          <Button theme="danger" variant="outline" icon={<DeleteIcon />}>
            删除
          </Button>
          <Button theme="warning" variant="outline" icon={<FileExportIcon />}>
            导出
          </Button>
        </TableSection.ToolbarRight>
        <BasicTable
          ref={tableRef}
          rowKey="orderId"
          columns={columns}
          request={api.orderPageQuery}
          searchParams={() => getParams(searchRef.current?.getFieldsValue(true) ?? {})}
          tableProps={{
            tableLayout: "fixed",
            selectedRowKeys: selectedKeys,
            onSelectChange: (keys) => setSelectedKeys(keys as Array<string | number>),
          }}
        />
      </TableSection.Content>
    </TableSection>
  )
}
