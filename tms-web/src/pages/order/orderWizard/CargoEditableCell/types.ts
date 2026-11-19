export type CargoCommitFn = (rowId: string | number, patch: Record<string, string>) => void

export type CargoSelectFieldCellProps = {
  rowId: string | number
  value?: string
  onCommit: CargoCommitFn
}
