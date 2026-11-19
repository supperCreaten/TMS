import BasicForm from "@/components/BasicForm"
import type { FormConfig } from "@/interface"
import type { ReactNode } from "react"
import { cn } from "@/utils/methods"
import "./index.css"

type PartyVariant = "sender" | "receiver"

const VARIANT_META: Record<PartyVariant, { title: string; hint: string }> = {
  sender: { title: "寄货人信息", hint: "发货方" },
  receiver: { title: "收货人信息", hint: "收货方" },
}

type PartyInfoCardProps = {
  variant: PartyVariant
  formConfig: FormConfig[]
  className?: string
}

export function PartyInfoCard(props: PartyInfoCardProps) {
  const { variant, formConfig, className } = props
  const meta = VARIANT_META[variant]

  return (
    <div className={cn("party-info-card", `party-info-card--${variant}`, className)}>
      <div className="party-info-card__header">
        <span className="party-info-card__dot" aria-hidden />
        <span className="party-info-card__title">{meta.title}</span>
        <span className="party-info-card__hint">{meta.hint}</span>
        <span className="party-info-card__dash" aria-hidden />
      </div>
      <BasicForm
        className="party-info-card__form"
        formConfig={formConfig}
        labelWidth={90}
        gutter={[16, 0]}
      />
    </div>
  )
}

type PartyInfoPairProps = {
  sender: ReactNode
  receiver: ReactNode
  className?: string
}

/** 寄/收成对展示 */
export function PartyInfoPair(props: PartyInfoPairProps) {
  const { sender, receiver, className } = props
  return <div className={cn("party-info-pair", className)}>{sender}{receiver}</div>
}

export default PartyInfoCard
