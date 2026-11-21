/** 订单相关字典编码（与 sql/tms_order_dict_seed.sql 一致） */
export const ORDER_DICT = {
  orderSource: "tms_order_source",
  transportType: "tms_transport_type",
  cargoType: "tms_cargo_type",
  cargoUnit: "tms_cargo_unit",
  vehicleType: "tms_vehicle_type",
  vehicleLength: "tms_vehicle_length",
} as const

/** 基础信息 baseInfoForm（value 为字典英文编码） */
export const mockBaseInfo = {
  orderNo: "", // 新增为空，自动生成
  customerName: "杭州云启科技有限公司", // 注意：当前 Select 的 value 是 customerId，回显要用真实 customerId 才能选中
  createTime: "",
  orderSource: "manual",
  transportType: "ftl",
  expectArriveTime: "2026-11-19 20:00:00",
}

/** 寄货人 senderForm */
export const mockSender = {
  senderName: "陈思远",
  senderPhone: "13800001001",
  origin: ["330000", "330100", "330106"], // 浙江省/杭州市/西湖区（AreaCascader 行政区划编码）
  senderAddress: "浙江省杭州市西湖区文三路488号",
}

/** 收货人 receiverForm */
export const mockReceiver = {
  receiverName: "刘婉清",
  receiverPhone: "13800001002",
  destination: ["310000", "310100", "310115"], // 上海市/市辖区/浦东新区
  receiverAddress: "上海市浦东新区张杨路1881号",
}

/** 货物表 tableRef.setTableData（枚举字段存字典英文 value） */
export const mockCargoList = [
  {
    id: "mock-cargo-1",
    cargoName: "华为 MatePad 平板（纸箱装）",
    cargoType: "general",
    quantity: "120",
    unit: "box",
    weight: "3000",
    vehicleType: "van",
    vehicleLength: "9.6m",
    vehicleCount: "1",
  },
  {
    id: "mock-cargo-2",
    cargoName: "冷冻带鱼（泡沫箱）",
    cargoType: "refrigerated",
    quantity: "80",
    unit: "box",
    weight: "4200",
    vehicleType: "reefer",
    vehicleLength: "7.6m",
    vehicleCount: "1",
  },
  {
    id: "mock-cargo-3",
    cargoName: "建筑用螺纹钢 Φ12",
    cargoType: "building_material",
    quantity: "200",
    unit: "bundle",
    weight: "28000",
    vehicleType: "high_sided",
    vehicleLength: "13m",
    vehicleCount: "2",
  },
  {
    id: "mock-cargo-4",
    cargoName: "白酒（玻璃瓶装）",
    cargoType: "fragile",
    quantity: "60",
    unit: "box",
    weight: "2400",
    vehicleType: "van",
    vehicleLength: "6.8m",
    vehicleCount: "1",
  },
  {
    id: "mock-cargo-5",
    cargoName: "食用调和油",
    cargoType: "liquid",
    quantity: "40",
    unit: "barrel",
    weight: "8000",
    vehicleType: "van",
    vehicleLength: "9.6m",
    vehicleCount: "1",
  },
]
