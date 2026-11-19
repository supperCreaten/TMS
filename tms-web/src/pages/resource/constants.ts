/** 合作状态 */
export const COOP_STATUS_OPTIONS = [
  { label: "启用", value: "0" },
  { label: "停用", value: "1" },
]

/** 结算方式 */
export const SETTLE_TYPE_OPTIONS = [
  { label: "现结", value: "cash" },
  { label: "月结", value: "monthly" },
  { label: "账期", value: "period" },
]

/** 客户级别 */
export const CUSTOMER_LEVEL_OPTIONS = [
  { label: "普通客户", value: "normal" },
  { label: "黄金客户", value: "gold" },
  { label: "钻石客户", value: "diamond" },
]

/** 客户标签 */
export const CUSTOMER_TAG_OPTIONS = [
  { label: "重点客户", value: "重点客户" },
  { label: "长期合作", value: "长期合作" },
  { label: "新客户", value: "新客户" },
  { label: "高净值", value: "高净值" },
]

/** 客户来源 */
export const CUSTOMER_SOURCE_OPTIONS = [
  { label: "线下拓展", value: "线下拓展" },
  { label: "线上获客", value: "线上获客" },
  { label: "转介绍", value: "转介绍" },
  { label: "招投标", value: "招投标" },
  { label: "其他", value: "其他" },
]

/** 所属行业（常用） */
export const INDUSTRY_OPTIONS = [
  { label: "制造业", value: "制造业" },
  { label: "批发零售", value: "批发零售" },
  { label: "电商", value: "电商" },
  { label: "食品生鲜", value: "食品生鲜" },
  { label: "建材家居", value: "建材家居" },
  { label: "电子电器", value: "电子电器" },
  { label: "服装纺织", value: "服装纺织" },
  { label: "其他", value: "其他" },
]

/** 承运商类型 */
export const CARRIER_TYPE_OPTIONS = [
  { label: "大件物流承运商", value: "大件物流承运商" },
  { label: "整车承运商", value: "整车承运商" },
  { label: "零担承运商", value: "零担承运商" },
  { label: "城配承运商", value: "城配承运商" },
  { label: "冷链承运商", value: "冷链承运商" },
  { label: "综合承运商", value: "综合承运商" },
]

/** 承运商评级 */
export const CARRIER_LEVEL_OPTIONS = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "C", value: "C" },
]

/** 是否签订合同 */
export const CONTRACT_SIGNED_OPTIONS = [
  { label: "是", value: "1" },
  { label: "否", value: "0" },
]

export function labelOf(options: Array<{ label: string; value: string }>, value?: string) {
  if (value == null || value === "") return "-"
  return options.find((o) => o.value === value)?.label ?? value
}
