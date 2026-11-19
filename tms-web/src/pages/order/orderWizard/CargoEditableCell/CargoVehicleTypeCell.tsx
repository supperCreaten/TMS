import { memo } from "react"
import { VEHICLE_TYPE_OPTIONS } from "../../constants"
import { CargoSelectCell } from "./CargoSelectCell"
import type { CargoSelectFieldCellProps } from "./types"

/** 车辆类型下拉 */
export const CargoVehicleTypeCell = memo(function CargoVehicleTypeCell(props: CargoSelectFieldCellProps) {
  const { rowId, value, onCommit } = props
  return (
    <CargoSelectCell
      rowId={rowId}
      field="vehicleType"
      value={value}
      options={VEHICLE_TYPE_OPTIONS}
      onCommit={onCommit}
    />
  )
})
