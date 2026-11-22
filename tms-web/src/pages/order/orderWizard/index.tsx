import AreaCascader from "@/components/AreaCascader"
import BasicForm from "@/components/BasicForm"
import BasicTable, { BasicTableRef } from "@/components/BasicTable"
import ContentSection from "@/components/ContentSection"
import EditableTextCell from "@/components/EditableTextCell"
import InputText from "@/components/InputText"
import LayoutTitle from "@/components/LayoutTitle"
import type { CargoRow, CargoTotals, FormConfig, OrderCargoItem } from "@/interface"
import { formartPositiveInteger, trimTrailingZeros } from "@/utils/format/decimal"
import { validateTableDataSource, type TableFieldRule } from "@/utils/table"
import NP from "number-precision"
import { useCallback, useEffect, useMemo, useReducer, useRef } from "react"
import type { ColProps, TableProps } from "tdesign-react"
import { Button, DatePicker, Form, MessagePlugin, Select } from "tdesign-react"
import { AddIcon } from "tdesign-icons-react"
import { ORDER_DICT } from "../constants"
import { PartyInfoCard, PartyInfoPair } from "./PartyInfoCard"
import "./index.css"
import api from "@/api"
import useDict from "@/hooks/use-dict"
import { useSearchParams } from "react-router-dom"

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

function createEmptyCargoRow(): CargoRow {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    cargoName: "",
    cargoType: "",
    quantity: "",
    unit: "",
    weight: "",
    vehicleType: "",
    vehicleLength: "",
    vehicleCount: "",
  }
}

function toCargoRow(item: OrderCargoItem): CargoRow {
  return {
    id: item.id ?? item.cargoId ?? `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    cargoName: item.cargoName != null ? String(item.cargoName) : "",
    cargoType: item.cargoType != null ? String(item.cargoType) : "",
    quantity: item.quantity != null ? String(item.quantity) : "",
    unit: item.unit != null ? String(item.unit) : "",
    weight: item.weight != null ? String(item.weight) : "",
    vehicleType: item.vehicleType != null ? String(item.vehicleType) : "",
    vehicleLength: item.vehicleLength != null ? String(item.vehicleLength) : "",
    vehicleCount: item.vehicleCount != null ? String(item.vehicleCount) : "",
  }
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

type CustomerOption = { label: string; value: string | number }

type OrderWizardState = {
  cargoTotals: CargoTotals
  loading: boolean
  submitting: boolean
  sendAreaList: string[]
  receiverAreaList: string[]
  customerList: CustomerOption[]
}

const initialOrderWizardState: OrderWizardState = {
  cargoTotals: EMPTY_CARGO_TOTALS,
  loading: false,
  submitting: false,
  sendAreaList: [],
  receiverAreaList: [],
  customerList: [],
}

function orderWizardReducer(state: OrderWizardState, patch: Partial<OrderWizardState>): OrderWizardState {
  return { ...state, ...patch }
}

/** 货物表数据校验规则（校验 getDataSource，不改行内样式） */
const CARGO_TABLE_RULES: TableFieldRule<CargoRow>[] = [
  { field: "cargoName", required: "货物名称不能为空" },
  { field: "cargoType", required: "货物类型不能为空" },
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
  const [baseInfoForm] = Form.useForm()
  const [senderForm] = Form.useForm()
  const [receiverForm] = Form.useForm()
  const [searchParams] = useSearchParams()
  const [state, dispatch] = useReducer(orderWizardReducer, initialOrderWizardState)
  const { cargoTotals, loading, submitting, sendAreaList, receiverAreaList, customerList } = state
  const dict = useDict([
    ORDER_DICT.orderSource,
    ORDER_DICT.transportType,
    ORDER_DICT.cargoType,
    ORDER_DICT.cargoUnit,
    ORDER_DICT.vehicleType,
    ORDER_DICT.vehicleLength,
  ])
  const orderSourceOptions = dict[ORDER_DICT.orderSource] ?? []
  const transportTypeOptions = dict[ORDER_DICT.transportType] ?? []
  const cargoTypeOptions = dict[ORDER_DICT.cargoType] ?? []
  const cargoUnitOptions = dict[ORDER_DICT.cargoUnit] ?? []
  const vehicleTypeOptions = dict[ORDER_DICT.vehicleType] ?? []
  const vehicleLengthOptions = dict[ORDER_DICT.vehicleLength] ?? []
  const refreshCargoTotals = useCallback(() => {
    const rows = tableRef.current?.getDataSource() ?? []
    dispatch({ cargoTotals: calcCargoTotals(rows) })
  }, [])
  const getCustomerList = useCallback(async () => {
    dispatch({ customerList: [] })
    const data = await api.customerAllQuery()
    const list = data || []
    dispatch({
      customerList: list.map((v) => ({ label: v.customerName, value: v.customerId })),
    })
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
  useEffect(() => {
    const request = async () => {
      await getCustomerList()
      const orderId = searchParams.get("orderId")
      orderId && getOrderDetail(orderId)
    }
    request()
  }, [])
  // 基础信息
  const basicFormConfig = useMemo<FormConfig[]>(
    () => [
      {
        name: "orderNo",
        label: "订单编号",
        component: <InputText placeholder="自动生成" disabled />,
      },
      {
        name: "customerId",
        label: "客户名称",
        rules: [{ required: true, message: "请选择客户名称" }],
        component: (
          <Select
            placeholder="请选择客户名称"
            clearable
            filterable
            options={customerList}
            scroll={{ type: "virtual", threshold: 50 }}
          />
        ),
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
        component: <Select placeholder="请选择订单来源" clearable filterable options={orderSourceOptions} />,
      },
      {
        name: "transportType",
        label: "运输类型",
        rules: [{ required: true, message: "请选择运输类型" }],
        component: <Select placeholder="请选择运输类型" clearable filterable options={transportTypeOptions} />,
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
    [mode, customerList, orderSourceOptions, transportTypeOptions],
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
        component: (
          <AreaCascader
            placeholder="请选择始发地"
            onChange={(_value, context) => {
              const { node } = context
              const data = node?.getPath()
              const list = data?.length ? data.map((item) => String(item?.label ?? "")) : []
              dispatch({ sendAreaList: list })
            }}
          />
        ),
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
        component: (
          <AreaCascader
            placeholder="请选择目的地"
            onChange={(_value, context) => {
              const { node } = context
              const data = node?.getPath()
              const list = data?.length ? data.map((item) => String(item?.label ?? "")) : []
              dispatch({ receiverAreaList: list })
            }}
          />
        ),
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
          <EditableTextCell
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
        title: "货物类型",
        colKey: "cargoType",
        width: 180,
        align: "center",
        cell: ({ row }) => (
          <Select
            clearable
            placeholder="请选择货物类型"
            options={cargoTypeOptions}
            value={row.cargoType || undefined}
            onChange={(val) => commitCargoPatch(row.id, { cargoType: (val as string) ?? "" })}
          />
        ),
      },
      {
        title: "数量",
        colKey: "quantity",
        width: 180,
        align: "center",
        cell: ({ row }) => (
          <EditableTextCell
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
        cell: ({ row }) => (
          <Select
            clearable
            placeholder="请选择"
            options={cargoUnitOptions}
            value={row.unit || undefined}
            onChange={(val) => commitCargoPatch(row.id, { unit: (val as string) ?? "" })}
          />
        ),
      },
      {
        title: "重量（kg）",
        colKey: "weight",
        width: 180,
        align: "center",
        cell: ({ row }) => (
          <EditableTextCell
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
          <Select
            clearable
            placeholder="请选择"
            options={vehicleTypeOptions}
            value={row.vehicleType || undefined}
            onChange={(val) => commitCargoPatch(row.id, { vehicleType: (val as string) ?? "" })}
          />
        ),
      },
      {
        title: "车辆长度",
        colKey: "vehicleLength",
        width: 180,
        align: "center",
        cell: ({ row }) => (
          <Select
            clearable
            placeholder="请选择"
            options={vehicleLengthOptions}
            value={row.vehicleLength || undefined}
            onChange={(val) => commitCargoPatch(row.id, { vehicleLength: (val as string) ?? "" })}
          />
        ),
      },
      {
        title: "用车数量",
        colKey: "vehicleCount",
        width: 180,
        align: "center",
        cell: ({ row }) => (
          <EditableTextCell
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
    [
      commitCargoPatch,
      refreshCargoTotals,
      cargoTypeOptions,
      cargoUnitOptions,
      vehicleTypeOptions,
      vehicleLengthOptions,
    ],
  )
  /**
   * 订单信息
   * @param orderId 订单ID
   * @returns 订单信息
   */
  const getOrderDetail = useCallback(
    async (orderId: string) => {
      if (!orderId) return
      dispatch({ loading: true })
      const data = await api.getOrderDetail(orderId).finally(() => {
        dispatch({ loading: false })
      })
      const { cargoList = [], ...formValues } = data || {}
      baseInfoForm.setFieldsValue(formValues)
      senderForm.setFieldsValue(formValues)
      receiverForm.setFieldsValue(formValues)
      tableRef.current?.setTableData(cargoList.map(toCargoRow))
      refreshCargoTotals()
      if (Array.isArray(formValues.originText)) {
        dispatch({ sendAreaList: formValues.originText.map(String) })
      }
      if (Array.isArray(formValues.destinationText)) {
        dispatch({ receiverAreaList: formValues.destinationText.map(String) })
      }
    },
    [baseInfoForm, senderForm, receiverForm, refreshCargoTotals],
  )
  /**
   * 提交表单
   * @param values  表单数据
   */
  const handleSubmit = useCallback(async () => {
    await Promise.all([baseInfoForm.validate(), senderForm.validate(), receiverForm.validate()])
    const result = validateTableDataSource(() => tableRef.current?.getDataSource() ?? [], {
      rules: CARGO_TABLE_RULES,
      minRows: 1,
      minRowsMessage: "请至少添加一条货物信息",
    })
    if (!result?.valid) return
    dispatch({ submitting: true })
    const baseInfo = baseInfoForm.getFieldsValue(true)
    const sender = senderForm.getFieldsValue(true)
    const receiver = receiverForm.getFieldsValue(true)
    const cargoList = tableRef.current?.getDataSource()
    const orderId = searchParams.get("orderId")
    const data = { ...baseInfo, ...sender, ...receiver, sendAreaList, receiverAreaList, cargoList }
    const params = orderId ? { orderId, ...data } : data
    const request = orderId ? api.updateOrder : api.insertOrder
    await request(params).finally(() => dispatch({ submitting: false }))
    MessagePlugin.success(orderId ? "修改订单成功" : "新增订单成功")
  }, [baseInfoForm, senderForm, receiverForm, searchParams, sendAreaList, receiverAreaList])
  return (
    <ContentSection loading={loading}>
      <ContentSection.Content>
        <LayoutTitle title="基础信息" className="rounded-none bg-transparent">
          <div className="order-wizard-basic flex flex-col gap-3">
            <BasicForm
              form={baseInfoForm}
              className="order-wizard-basic__form"
              formConfig={basicFormConfig}
              labelWidth={110}
              gutter={[16, 0]}
            />
            <PartyInfoPair
              sender={<PartyInfoCard variant="sender" formConfig={senderFormConfig} form={senderForm} />}
              receiver={<PartyInfoCard variant="receiver" formConfig={receiverFormConfig} form={receiverForm} />}
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
              tableLayout: "fixed",
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
        <Button theme="default">关闭</Button>
        <Button theme="primary" loading={submitting} onClick={handleSubmit}>
          保存
        </Button>
      </ContentSection.Footer>
    </ContentSection>
  )
}
