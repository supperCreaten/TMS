//订单来源
export const ORDER_SOURCE_OPTIONS = [
  { label: "APP下单", value: "APP下单" },
  { label: "手工添加", value: "手工添加" },
  { label: "批量导入", value: "批量导入" },
  { label: "其他", value: "其他" },
]
//运输类型
export const TRANSPORT_TYPE_OPTIONS = [
  { label: "整车", value: "ftl" },
  { label: "零担", value: "ltl" },
  { label: "快递", value: "express" },
  { label: "同城配送", value: "city" },
  { label: "专线", value: "line" },
  { label: "冷链运输", value: "cold_chain" },
  { label: "危险品运输", value: "dangerous" },
  { label: "其他", value: "other" },
]
//货物类型
export const CARGO_TYPE_OPTIONS = [
  { label: "普货", value: "general" },
  { label: "易碎品", value: "fragile" },
  { label: "生鲜", value: "fresh" },
  { label: "冷藏保鲜", value: "cold_chain" },
  { label: "危险品", value: "dangerous" },
  { label: "贵重物品", value: "valuable" },
  { label: "液体", value: "liquid" },
  { label: "大件/异形", value: "oversized" },
  { label: "建材", value: "building" },
  { label: "电子产品", value: "electronics" },
  { label: "服装纺织", value: "apparel" },
  { label: "其他", value: "other" },
]

/** 货物单位 */
export const CARGO_UNIT_OPTIONS = [
  { label: "箱", value: "箱" },
  { label: "包", value: "包" },
  { label: "扎", value: "扎" },
  { label: "桶", value: "桶" },
  { label: "袋", value: "袋" },
  { label: "盒", value: "盒" },
]

/** 车辆类型（公路货运常见车厢结构；value 与 label 相同，直接入库展示） */
export const VEHICLE_TYPE_OPTIONS = [
  { label: "厢式车", value: "厢式车" },
  { label: "高栏车", value: "高栏车" },
  { label: "平板车", value: "平板车" },
  { label: "低栏车", value: "低栏车" },
  { label: "飞翼车", value: "飞翼车" },
  { label: "冷藏车", value: "冷藏车" },
  { label: "集装箱", value: "集装箱" },
  { label: "罐式车", value: "罐式车" },
]

/** 车辆长度（车厢长度；value 与 label 相同，直接入库展示） */
export const VEHICLE_LENGTH_OPTIONS = [
  { label: "4.2米", value: "4.2米" },
  { label: "5.2米", value: "5.2米" },
  { label: "6.8米", value: "6.8米" },
  { label: "7.6米", value: "7.6米" },
  { label: "9.6米", value: "9.6米" },
  { label: "13米", value: "13米" },
  { label: "16.5米", value: "16.5米" },
  { label: "17.5米", value: "17.5米" },
]