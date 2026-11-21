import type { FormConfig } from "@/interface/form"
import type { FormInstanceFunctions } from "tdesign-react"

/** 订单货物明细（后端字段为 cargoId） */
export interface OrderCargoItem {
  cargoId?: string | number
  id?: string | number
  cargoName?: string
  cargoType?: string
  quantity?: string | number
  unit?: string
  weight?: string | number
  vehicleType?: string
  vehicleLength?: string
  vehicleCount?: string | number
}

/** 订单详情（扁平字段 + 货物明细） */
export type OrderDetail = Record<string, unknown> & {
  cargoList?: OrderCargoItem[]
}

/** 订单列表行 */
export interface OrderRow {
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

/** 货物信息行（向导可编辑表） */
export interface CargoRow {
  id: string | number
  cargoName?: string
  cargoType?: string
  quantity?: string
  unit?: string
  weight?: string
  vehicleType?: string
  vehicleLength?: string
  vehicleCount?: string
}

export interface CargoTotals {
  quantity: number
  weight: number
  vehicleCount: number
}

export type PartyVariant = "sender" | "receiver"

export interface PartyInfoCardProps {
  variant: PartyVariant
  formConfig: FormConfig[]
  form: FormInstanceFunctions
  className?: string
}
