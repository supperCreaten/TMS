import type { ReactNode } from "react"

/** 弹窗表单分区标题 */
export default function FormSection({ title }: { title: ReactNode }) {
  return (
    <div className="mb-1 mt-2 flex w-full items-center gap-2 text-sm font-semibold text-(--td-text-color-primary)">
      <span className="inline-block h-3.5 w-1 rounded-sm bg-(--td-brand-color)" />
      <span>{title}</span>
    </div>
  )
}
