import AreaCascader from "@/components/AreaCascader"
import BasicForm from "@/components/BasicForm"
import BasicTable, { BasicTableRef } from "@/components/BasicTable"
import ContentSection from "@/components/ContentSection"
import InputText from "@/components/InputText"
import LayoutTitle from "@/components/LayoutTitle"
import { FormConfig } from "@/interface"
import { formartPositiveInteger, trimTrailingZeros } from "@/utils/format/decimal"
import { validateTableDataSource, type TableFieldRule } from "@/utils/table"
import NP from "number-precision"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { ColProps, TableProps } from "tdesign-react"
import { Button, DatePicker, Select } from "tdesign-react"
import { AddIcon } from "tdesign-icons-react"
import {
  CARGO_TYPE_OPTIONS,
  ORDER_SOURCE_OPTIONS,
  TRANSPORT_TYPE_OPTIONS,
} from "../constants"
import {
  CargoTextCell,
  CargoUnitCell,
  CargoVehicleLengthCell,
  CargoVehicleTypeCell,
} from "./CargoEditableCell"
import { PartyInfoCard, PartyInfoPair } from "./PartyInfoCard"
import "./index.css"

/** TDesign 12 栅格：xl 一行 3，md 一行 2，更小屏一行 1；地址始终整行 */
const PARTY_COL: ColProps = { xl: 4, md: 6, sm: 12, xs: 12 }
const ADDRESS_COL: ColProps = { xl: 12, md: 12, sm: 12, xs: 12 }

/** 货物表虚拟滚动：超过阈值才启用；行高兼容货物名称多行 */
const CARGO_TABLE_SCROLL = {
  type: "virtual" as const,
  threshold: 50,
  rowHeight: 72,
  isFixedRowHeight: false,
  bufferSize: 10,
}

/** 货物信息行 */
interface CargoRow {
  id: string | number
  cargoName?: string
  quantity?: string
  unit?: string
  weight?: string
  vehicleType?: string
  vehicleLength?: string
  vehicleCount?: string
}

function createEmptyCargoRow(): CargoRow {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    cargoName: "",
    quantity: "",
    unit: "",
    weight: "",
    vehicleType: "",
    vehicleLength: "",
    vehicleCount: "",
  }
}

type CargoTotals = {
  quantity: number
  weight: number
  vehicleCount: number
}

const EMPTY_CARGO_TOTALS: CargoTotals = { quantity: 0, weight: 0, vehicleCount: 0 }

function sumCargoField(rows: CargoRow[], field: "quantity" | "weight" | "vehicleCount") {
  return rows.reduce((acc, row) => {
    const raw = row[field]
    if (raw == null || raw === "") return acc
    const n = Number(raw)
    if (!Number.isFinite(n)) return acc
    return NP.plus(acc, n)
  }, 0)
}

function calcCargoTotals(rows: CargoRow[]): CargoTotals {
  return {
    quantity: sumCargoField(rows, "quantity"),
    weight: sumCargoField(rows, "weight"),
    vehicleCount: sumCargoField(rows, "vehicleCount"),
  }
}

function formatCargoTotal(value: number, decimalPlaces?: number) {
  if (!Number.isFinite(value) || value === 0) return "0"
  if (decimalPlaces == null) return String(NP.round(value, 0))
  return trimTrailingZeros(NP.round(value, decimalPlaces).toFixed(decimalPlaces)) || "0"
}

/** 货物表数据校验规则（校验 getDataSource，不改行内样式） */
const CARGO_TABLE_RULES: TableFieldRule<CargoRow>[] = [
  { field: "cargoName", required: "货物名称不能为空" },
  {
    field: "quantity",
    required: "数量不能为空",
    validator: (value) => {
      if (value == null || value === "") return undefined
      return formartPositiveInteger(String(value)) === String(value) ? undefined : "数量不能为空"
    },
  },
  { field: "unit", required: "单位不能为空" },
  { field: "vehicleType", required: "车辆类型不能为空" },
  { field: "vehicleLength", required: "车辆长度不能为空" },
  {
    field: "vehicleCount",
    required: "用车数量不能为空",
    validator: (value) => {
      if (value == null || value === "") return undefined
      return formartPositiveInteger(String(value)) === String(value) ? undefined : "用车数量须为正整数"
    },
  },
]

export default function OrderWizard(props: { mode: "create" | "edit" }) {
  const { mode } = props
  const tableRef = useRef<BasicTableRef<CargoRow>>(null)
  const [cargoTotals, setCargoTotals] = useState<CargoTotals>(EMPTY_CARGO_TOTALS)

  const refreshCargoTotals = useCallback(() => {
    const rows = tableRef.current?.getDataSource() ?? []
    setCargoTotals(calcCargoTotals(rows))
  }, [])

  const commitCargoPatch = useCallback(
    (rowId: string | number, patch: Partial<CargoRow>) => {
      tableRef.current?.updateRowByKey(rowId, patch)
      refreshCargoTotals()
    },
    [refreshCargoTotals],
  )

  useEffect(() => {
    tableRef.current?.setTableData([createEmptyCargoRow()])
    refreshCargoTotals()
  }, [refreshCargoTotals])

  // 基础信息
  const basicFormConfig = useMemo<FormConfig[]>(
    () => [
      {
        name: "orderNo",
        label: "订单编号",
        component: <InputText placeholder="自动生成" disabled />,
      },
      {
        name: "customerName",
        label: "客户名称",
        component: <InputText disabled />,
      },
      {
        name: "createTime",
        label: "下单时间",
        component: <InputText disabled />,
      },
      {
        name: "orderSource",
        label: "订单来源",
        rules: [{ required: true, message: "请选择订单来源" }],
        component: <Select placeholder="请选择订单来源" clearable filterable options={ORDER_SOURCE_OPTIONS} />,
      },
      {
        name: "transportType",
        label: "运输类型",
        rules: [{ required: true, message: "请选择运输类型" }],
        component: <Select placeholder="请选择运输类型" clearable filterable options={TRANSPORT_TYPE_OPTIONS} />,
      },
      {
        name: "cargoType",
        label: "货物类型",
        rules: [{ required: true, message: "请选择货物类型" }],
        component: <Select placeholder="请选择货物类型" clearable filterable options={CARGO_TYPE_OPTIONS} />,
      },
      {
        name: "expectArriveTime",
        label: "期望送达时间",
        rules: [{ required: true, message: "请选择期望送达时间" }],
        component: (
          <DatePicker
            clearable
            enableTimePicker
            allowInput
            placeholder="请选择期望送达时间"
            format="YYYY-MM-DD HH:mm:ss"
            valueType="YYYY-MM-DD HH:mm:ss"
            className="w-full"
          />
        ),
      },
    ],
    [mode],
  )
  // 发货人信息
  const senderFormConfig = useMemo<FormConfig[]>(
    () => [
      {
        name: "senderName",
        label: "发货人",
        rules: [{ required: true, message: "请输入发货人" }],
        component: <InputText clearable placeholder="请输入" />,
        colProps: PARTY_COL,
      },
      {
        name: "senderPhone",
        label: "联系电话",
        rules: [
          { required: true, message: "请输入联系电话" },
          { pattern: /^(1\d{10}|0\d{2,3}-?\d{7,8})$/, message: "请输入正确的联系电话" },
        ],
        component: <InputText clearable placeholder="请输入" maxlength={11} />,
        colProps: PARTY_COL,
      },
      {
        name: "origin",
        label: "始发地",
        rules: [{ required: true, message: "请选择始发地" }],
        component: <AreaCascader placeholder="请选择始发地" />,
        colProps: PARTY_COL,
      },
      {
        name: "senderAddress",
        label: "发货地址",
        rules: [{ required: true, message: "请输入发货地址" }],
        component: <InputText textarea maxlength={200} placeholder="请输入" autosize={{ minRows: 2, maxRows: 3 }} />,
        colProps: ADDRESS_COL,
      },
    ],
    [],
  )
  // 收货人信息
  const receiverFormConfig = useMemo<FormConfig[]>(
    () => [
      {
        name: "receiverName",
        label: "收货人",
        rules: [{ required: true, message: "请输入收货人" }],
        component: <InputText clearable placeholder="请输入" />,
        colProps: PARTY_COL,
      },
      {
        name: "receiverPhone",
        label: "联系电话",
        rules: [
          { required: true, message: "请输入联系电话" },
          { pattern: /^(1\d{10}|0\d{2,3}-?\d{7,8})$/, message: "请输入正确的联系电话" },
        ],
        component: <InputText clearable placeholder="请输入" maxlength={11} />,
        colProps: PARTY_COL,
      },
      {
        name: "destination",
        label: "目的地",
        rules: [{ required: true, message: "请选择目的地" }],
        component: <AreaCascader placeholder="请选择目的地" />,
        colProps: PARTY_COL,
      },
      {
        name: "receiverAddress",
        label: "收货地址",
        rules: [{ required: true, message: "请输入收货地址" }],
        component: <InputText textarea maxlength={200} placeholder="请输入" autosize={{ minRows: 2, maxRows: 3 }} />,
        colProps: ADDRESS_COL,
      },
    ],
    [],
  )

  const columns = useMemo<TableProps<CargoRow>["columns"]>(
    () => [
      {
        title: "序号",
        colKey: "index",
        width: 80,
        align: "center",
        fixed: "left",
        cell: ({ rowIndex }) => rowIndex + 1,
      },
      {
        title: "货物名称",
        colKey: "cargoName",
        width: 300,
        align: "center",
        cell: ({ row }) => (
          <CargoTextCell
            rowId={row.id}
            field="cargoName"
            value={row.cargoName}
            textarea
            autosize={{ minRows: 1, maxRows: 3 }}
            onCommit={commitCargoPatch}
          />
        ),
      },
      {
        title: "数量",
        colKey: "quantity",
        width: 180,
        align: "center",
        cell: ({ row }) => (
          <CargoTextCell
            rowId={row.id}
            field="quantity"
            value={row.quantity}
            inputRule={formartPositiveInteger}
            onCommit={commitCargoPatch}
          />
        ),
      },
      {
        title: "单位",
        colKey: "unit",
        width: 130,
        align: "center",
        cell: ({ row }) => <CargoUnitCell rowId={row.id} value={row.unit} onCommit={commitCargoPatch} />,
      },
      {
        title: "重量（kg）",
        colKey: "weight",
        width: 180,
        align: "center",
        cell: ({ row }) => (
          <CargoTextCell
            rowId={row.id}
            field="weight"
            value={row.weight}
            positive
            decimalPlaces={2}
            onCommit={commitCargoPatch}
          />
        ),
      },
      {
        title: "车辆类型",
        colKey: "vehicleType",
        width: 180,
        align: "center",
        cell: ({ row }) => (
          <CargoVehicleTypeCell rowId={row.id} value={row.vehicleType} onCommit={commitCargoPatch} />
        ),
      },
      {
        title: "车辆长度",
        colKey: "vehicleLength",
        width: 180,
        align: "center",
        cell: ({ row }) => (
          <CargoVehicleLengthCell rowId={row.id} value={row.vehicleLength} onCommit={commitCargoPatch} />
        ),
      },
      {
        title: "用车数量",
        colKey: "vehicleCount",
        width: 180,
        align: "center",
        cell: ({ row }) => (
          <CargoTextCell
            rowId={row.id}
            field="vehicleCount"
            value={row.vehicleCount}
            inputRule={formartPositiveInteger}
            onCommit={commitCargoPatch}
          />
        ),
      },
      {
        title: "操作",
        colKey: "operation",
        width: 100,
        align: "center",
        fixed: "right",
        cell: ({ row }) => (
          <Button
            theme="danger"
            variant="text"
            onClick={() => {
              tableRef.current?.removeRowByKey(row.id)
              refreshCargoTotals()
            }}
          >
            删除
          </Button>
        ),
      },
    ],
    [commitCargoPatch, refreshCargoTotals],
  )

  return (
    <ContentSection>
      <ContentSection.Content>
        <LayoutTitle title="基础信息" className="rounded-none bg-transparent">
          <div className="order-wizard-basic flex flex-col gap-3">
            <BasicForm
              className="order-wizard-basic__form"
              formConfig={basicFormConfig}
              labelWidth={110}
              gutter={[16, 0]}
            />
            <PartyInfoPair
              sender={<PartyInfoCard variant="sender" formConfig={senderFormConfig} />}
              receiver={<PartyInfoCard variant="receiver" formConfig={receiverFormConfig} />}
            />
          </div>
        </LayoutTitle>
        <LayoutTitle
          title="货物信息"
          className="rounded-none bg-transparent"
          contentClassName="order-wizard-cargo"
          actions={
            <Button
              theme="primary"
              icon={<AddIcon />}
              onClick={() => {
                tableRef.current?.addRow(createEmptyCargoRow(), "end")
                refreshCargoTotals()
              }}
            >
              添加货物
            </Button>
          }
        >
          <BasicTable
            ref={tableRef}
            columns={columns}
            rowKey="id"
            showPagination={false}
            height={480}
            tableProps={{
              maxHeight: 480,
              scroll: CARGO_TABLE_SCROLL,
              hover: true,
              tableLayout: "auto",
            }}
          />
          <div className="order-wizard-cargo__summary">
            <span className="order-wizard-cargo__summary-label">合计</span>
            <div className="order-wizard-cargo__summary-metrics">
              <span>总数量：{formatCargoTotal(cargoTotals.quantity)}</span>
              <span>总质量：{formatCargoTotal(cargoTotals.weight, 2)}kg</span>
              <span>总用车：{formatCargoTotal(cargoTotals.vehicleCount)}</span>
            </div>
          </div>
        </LayoutTitle>
      </ContentSection.Content>
      <ContentSection.Footer>
        <Button>关闭</Button>
        <Button
          theme="primary"
          onClick={() => {
            const result = validateTableDataSource(() => tableRef.current?.getDataSource() ?? [], {
              rules: CARGO_TABLE_RULES,
              minRows: 1,
              minRowsMessage: "请至少添加一条货物信息",
            })
            if (!result.valid) return
            console.log(tableRef.current?.getDataSource())
          }}
        >
          保存
        </Button>
      </ContentSection.Footer>
    </ContentSection>
  )
}
