import { FormConfig } from "@/interface"

export function pickByFormConfig(source: Record<string, unknown>, config: FormConfig[]) {
  const records: Record<string, unknown> = {}
  config.forEach((item) => {
    if (typeof item.name !== "string") return
    if (Object.prototype.hasOwnProperty.call(source, item.name)) {
      records[item.name] = source[item.name]
    }
  })
  return records
}