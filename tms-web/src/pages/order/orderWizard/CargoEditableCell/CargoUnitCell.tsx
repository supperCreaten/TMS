import { memo } from "react"
import { CARGO_UNIT_OPTIONS } from "../../constants"
import { CargoSelectCell } from "./CargoSelectCell"
import type { CargoSelectFieldCellProps } from "./types"

/** 单位下拉 */
export const CargoUnitCell = memo(function CargoUnitCell(props: CargoSelectFieldCellProps) {
  const { rowId, value, onCommit } = props
  return (
    <CargoSelectCell rowId={rowId} field="unit" value={value} options={CARGO_UNIT_OPTIONS} onCommit={onCommit} />
  )
})
