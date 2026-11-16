import LayoutTitle from "@/components/LayoutTitle"

export default function OrderWizard(props: { mode: "create" | "edit" }) {
  const { mode } = props
  return (
    <div>
      <LayoutTitle></LayoutTitle>
    </div>
  )
}
