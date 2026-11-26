import BasicTable, { BasicTableRef } from "@/components/BasicTable"
import TableSection from "@/components/TableSection"
import { useMemo, useRef, useState } from "react"
import { AddIcon, DeleteIcon, FileExportIcon } from "tdesign-icons-react"
import { Button, TableProps, Tag } from "tdesign-react"
import type { FormConfig, OrderRow } from "@/interface"
import api from "@/api"
import { getParams } from "@/utils/methods"
import SearchBox, { SearchBoxRef } from "@/components/SearchBox"
import MoreActions from "@/components/MoreActions"
import InputText from "@/components/InputText"
import { useNavigate } from "react-router-dom"
import { getOrderStatusTagTheme } from "./constants"
export default function order() {
  const searchRef = useRef<SearchBoxRef>(null)
  const tableRef = useRef<BasicTableRef<OrderRow>>(null)
  const [selectedKeys, setSelectedKeys] = useState<Array<string | number>>([])
  const navigate = useNavigate()
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
        colKey: "originText",
        width: 160,
        align: "center",
        ellipsis: true,
        cell: ({ row }) => {
          if (!row?.originText?.length) return "-"
          return row?.originText.join("/")
        },
      },
      {
        title: "目的地",
        colKey: "destinationText",
        width: 160,
        align: "center",
        ellipsis: true,
        cell: ({ row }) => {
          if (!row?.destinationText?.length) return "-"
          return row?.destinationText.join("/")
        },
      },
      { title: "客户名称", colKey: "customerName", width: 140, align: "center", ellipsis: true },
      {
        title: "订单状态",
        colKey: "orderStatus",
        width: 110,
        align: "center",
        cell: ({ row }) => (
          <Tag theme={getOrderStatusTagTheme(row?.orderStatus)} variant="light">
            {row?.orderStatusText || "-"}
          </Tag>
        ),
      },
      {
        title: "发货信息",
        colKey: "senderInfo",
        width: 200,
        cell: ({ row }) => (
          <div>
            <div>联系人：{row.senderName || "-"}</div>
            <div>电话：{row.senderPhone || "-"}</div>
            <div>地址：{row.senderAddress || "-"}</div>
          </div>
        ),
      },
      {
        title: "收货信息",
        colKey: "receiverInfo",
        width: 200,
        cell: ({ row }) => (
          <div>
            <div>联系人：{row.receiverName || "-"}</div>
            <div>电话：{row.receiverPhone || "-"}</div>
            <div>地址：{row.receiverAddress || "-"}</div>
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
        title: "客户报价(元)",
        colKey: "customerQuote",
        width: 150,
        align: "center",
        ellipsis: true,
      },
      {
        title: "订单类型",
        colKey: "transportTypeText",
        width: 100,
        align: "center",
        ellipsis: true,
        cell: ({ row }) => row.transportTypeText || row.transportType || "-",
      },
      { title: "货物数量", colKey: "totalQuantity", width: 100, align: "center" },
      { title: "总重量(kg)", colKey: "totalWeight", width: 100, align: "center" },
      { title: "总用车", colKey: "totalVehicleCount", width: 100, align: "center" },
      {
        title: "订单来源",
        colKey: "orderSourceText",
        width: 110,
        align: "center",
        ellipsis: true,
        cell: ({ row }) => row.orderSourceText || row.orderSource || "-",
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
              { key: "takeOrder", label: "接单", onClick: () => {} },
              { key: "delete", label: "删除", theme: "danger", onClick: () => {} },
            ]}
          />
        ),
      },
    ],
    [navigate],
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
