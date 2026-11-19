import { memo } from "react"
import { Select, type SelectProps } from "tdesign-react"
import type { CargoCommitFn } from "./types"

type CargoSelectCellProps = {
  rowId: string | number
  field: string
  value?: string
  options: SelectProps["options"]
  placeholder?: string
  onCommit: CargoCommitFn
}

/** 下拉单元格：一次性选择，直接写回 */
export const CargoSelectCell = memo(function CargoSelectCell(props: CargoSelectCellProps) {
  const { rowId, field, value, options, placeholder = "请选择", onCommit } = props
  return (
    <Select
      clearable
      placeholder={placeholder}
      options={options}
      value={value || undefined}
      onChange={(val) => onCommit(rowId, { [field]: (val as string) ?? "" })}
    />
  )
})
