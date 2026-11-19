import { memo } from "react"
import { VEHICLE_LENGTH_OPTIONS } from "../../constants"
import { CargoSelectCell } from "./CargoSelectCell"
import type { CargoSelectFieldCellProps } from "./types"

/** 车辆长度下拉 */
export const CargoVehicleLengthCell = memo(function CargoVehicleLengthCell(props: CargoSelectFieldCellProps) {
  const { rowId, value, onCommit } = props
  return (
    <CargoSelectCell
      rowId={rowId}
      field="vehicleLength"
      value={value}
      options={VEHICLE_LENGTH_OPTIONS}
      onCommit={onCommit}
    />
  )
})
