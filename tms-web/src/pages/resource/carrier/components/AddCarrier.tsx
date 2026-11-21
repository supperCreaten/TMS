import { useEffect, useMemo, useState } from "react"
import { DatePicker, Form, Loading, Select, Switch } from "tdesign-react"
import api from "@/api"
import type { CarrierDetail } from "@/api/modules/carrier"
import AreaCascader from "@/components/AreaCascader"
import BasicDialog from "@/components/BasicDialog"
import BasicForm from "@/components/BasicForm"
import InputText from "@/components/InputText"
import LayoutTitle from "@/components/LayoutTitle"
import type { FormConfig } from "@/interface"
import { showMessage } from "@/utils/methods"
import FileUrlUpload from "../../components/FileUrlUpload"
import { CARRIER_LEVEL_OPTIONS, CARRIER_TYPE_OPTIONS, COOP_STATUS_OPTIONS, SETTLE_TYPE_OPTIONS } from "../../constants"

type CarrierFormValues = {
  carrierName?: string
  shortName?: string
  legalPerson?: string
  carrierType?: string
  carrierLevel?: string
  taxRegNo?: string
  region?: string[]
  companyAddress?: string
  companyEmail?: string
  status?: string
  businessLicenseNo?: string
  businessLicenseUrl?: string
  roadPermitNo?: string
  roadPermitUrl?: string
  contactName?: string
  contactPhone?: string
  contactDept?: string
  contactTitle?: string
  contactEmail?: string
  contactWechat?: string
  settleType?: string
  invoiceTitle?: string
  taxNo?: string
  bankName?: string
  bankAccountName?: string
  bankAccountNo?: string
  contractSigned?: boolean | string
  contractFileUrl?: string
  contractExpireDate?: string
  remark?: string
}

const initialValues: CarrierFormValues = {
  status: "0",
  settleType: "monthly",
  contractSigned: true,
}

function splitCsv(value?: string | string[]) {
  if (Array.isArray(value)) return value
  if (!value) return undefined
  return value.split(",").filter(Boolean)
}

function joinCsv(value?: string[]) {
  if (!value?.length) return undefined
  return value.join(",")
}

function mapDetailToForm(data?: CarrierDetail): CarrierFormValues {
  return {
    ...initialValues,
    ...data,
    region: splitCsv(data?.region),
    status: data?.status != null ? String(data.status) : "0",
    contractSigned: data?.contractSigned == null ? true : String(data.contractSigned) === "1",
  }
}

export type AddCarrierProps = {
  visible: boolean
  title: string
  carrierId?: string
  onClose: (submitted?: boolean) => void
}

export default function AddCarrier(props: AddCarrierProps) {
  const { visible, title, carrierId, onClose } = props
  const [baseInfoForm] = Form.useForm()
  const [contactForm] = Form.useForm()
  const [financeForm] = Form.useForm()
  const [contractForm] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const isEdit = Boolean(carrierId) && title.includes("修改")

  const basicFormConfig = useMemo(
    (): FormConfig[] => [
      {
        label: "承运商名称",
        name: "carrierName",
        rules: [{ required: true, message: "请输入承运商名称" }],
        component: <InputText clearable placeholder="请输入承运商名称" />,
      },
      {
        label: "承运商简称",
        name: "shortName",
        component: <InputText clearable placeholder="请输入承运商简称" />,
      },
      {
        label: "法人姓名",
        name: "legalPerson",
        rules: [{ required: true, message: "请输入法人姓名" }],
        component: <InputText clearable placeholder="请输入法人姓名" />,
      },
      {
        label: "承运商类型",
        name: "carrierType",
        rules: [{ required: true, message: "请选择承运商类型" }],
        component: <Select options={CARRIER_TYPE_OPTIONS} placeholder="请选择承运商类型" />,
      },
      {
        label: "承运商评级",
        name: "carrierLevel",
        component: <Select clearable options={CARRIER_LEVEL_OPTIONS} placeholder="请选择评级" />,
      },
      {
        label: "合作状态",
        name: "status",
        rules: [{ required: true, message: "请选择合作状态" }],
        component: <Select options={COOP_STATUS_OPTIONS} placeholder="请选择合作状态" />,
      },
      {
        label: "税务登记号",
        name: "taxRegNo",
        component: <InputText clearable placeholder="请输入税务登记号" />,
      },
      {
        label: "所在区域",
        name: "region",
        component: <AreaCascader placeholder="请选择所在区域" />,
      },
      {
        label: "公司邮箱",
        name: "companyEmail",
        component: <InputText clearable placeholder="请输入公司邮箱" />,
      },
      {
        label: "营业执照号",
        name: "businessLicenseNo",
        component: <InputText clearable placeholder="请输入营业执照号" />,
      },
      {
        label: "道路运输许可证号",
        name: "roadPermitNo",
        component: <InputText clearable placeholder="请输入道路运输经营许可证号" />,
      },
      {
        label: "营业执照",
        name: "businessLicenseUrl",
        colProps: { span: 12 },
        component: <FileUrlUpload theme="image" tip="上传营业执照正面照" />,
      },
      {
        label: "道路运输许可证",
        name: "roadPermitUrl",
        colProps: { span: 12 },
        component: <FileUrlUpload theme="image" tip="上传道路运输经营许可证" />,
      },
      {
        label: "公司地址",
        name: "companyAddress",
        colProps: { span: 12 },
        component: <InputText clearable placeholder="请输入公司地址" />,
      },
      {
        label: "备注信息",
        name: "remark",
        colProps: { span: 12 },
        component: (
          <InputText textarea maxlength={500} autosize={{ minRows: 2, maxRows: 4 }} placeholder="请输入备注" />
        ),
      },
    ],
    [],
  )

  const contactFormConfig = useMemo(
    (): FormConfig[] => [
      {
        label: "联系人姓名",
        name: "contactName",
        rules: [{ required: true, message: "请输入联系人姓名" }],
        component: <InputText clearable placeholder="请输入联系人姓名" />,
      },
      {
        label: "手机号码",
        name: "contactPhone",
        rules: [
          { required: true, message: "请输入手机号码" },
          { pattern: /^1\d{10}$/, message: "请输入正确的手机号" },
        ],
        component: <InputText clearable maxlength={11} placeholder="请输入手机号码" />,
      },
      {
        label: "所在部门",
        name: "contactDept",
        component: <InputText clearable placeholder="请输入所在部门" />,
      },
      {
        label: "职位/职务",
        name: "contactTitle",
        component: <InputText clearable placeholder="请输入职位/职务" />,
      },
      {
        label: "邮箱",
        name: "contactEmail",
        component: <InputText clearable placeholder="请输入邮箱" />,
      },
      {
        label: "微信",
        name: "contactWechat",
        component: <InputText clearable placeholder="请输入微信号" />,
      },
    ],
    [],
  )

  const financeFormConfig = useMemo(
    (): FormConfig[] => [
      {
        label: "结算方式",
        name: "settleType",
        rules: [{ required: true, message: "请选择结算方式" }],
        component: <Select options={SETTLE_TYPE_OPTIONS} placeholder="请选择结算方式" />,
      },
      {
        label: "发票抬头",
        name: "invoiceTitle",
        rules: [{ required: true, message: "请输入发票抬头" }],
        component: <InputText clearable placeholder="请输入发票抬头" />,
      },
      {
        label: "纳税人识别号",
        name: "taxNo",
        component: <InputText clearable placeholder="请输入纳税人识别号" />,
      },
      {
        label: "开户行",
        name: "bankName",
        component: <InputText clearable placeholder="请输入开户行" />,
      },
      {
        label: "开户名称",
        name: "bankAccountName",
        component: <InputText clearable placeholder="请输入开户名称" />,
      },
      {
        label: "银行账号",
        name: "bankAccountNo",
        component: <InputText clearable placeholder="请输入银行账号" />,
      },
    ],
    [],
  )

  const contractFormConfig = useMemo(
    (): FormConfig[] => [
      {
        label: "是否签订合同",
        name: "contractSigned",
        rules: [{ required: true, message: "请选择是否签订合同" }],
        component: <Switch label={["是", "否"]} />,
      },
      {
        label: "合同到期日",
        name: "contractExpireDate",
        component: (
          <DatePicker
            clearable
            placeholder="请选择合同到期日"
            format="YYYY-MM-DD"
            valueType="YYYY-MM-DD"
            style={{ width: "100%" }}
          />
        ),
      },
      {
        label: "合同附件",
        name: "contractFileUrl",
        colProps: { span: 12 },
        component: <FileUrlUpload accept=".pdf,.jpg,.jpeg,.png" tip="最大 50M，支持 PDF / JPG / PNG" theme="file" />,
      },
    ],
    [],
  )

  useEffect(() => {
    if (!visible) return
    const init = async () => {
      setLoading(true)
      try {
        baseInfoForm.reset()
        contactForm.reset()
        financeForm.reset()
        contractForm.reset()
        contractForm.setFieldsValue({ ...initialValues })
        if (!isEdit || !carrierId) return
        const data = await api.getCarrierDetail(carrierId)
        const formValues = mapDetailToForm(data)
        baseInfoForm.setFieldsValue(formValues)
        contactForm.setFieldsValue(formValues)
        financeForm.setFieldsValue(formValues)
        contractForm.setFieldsValue(formValues)
      } finally {
        setLoading(false)
      }
    }
    void init()
  }, [visible, carrierId, isEdit, contractForm, baseInfoForm, contactForm, financeForm])

  const handleSubmit = async () => {
    const validate = await Promise.all(
      [baseInfoForm.validate, contactForm.validate, financeForm.validate, contractForm.validate].map((validate) =>
        validate(),
      ),
    )
    if (!validate) return
    setSubmitting(true)
    try {
      const values = [baseInfoForm, contactForm, financeForm, contractForm]
        .map((form) => form.getFieldsValue(true))
        .reduce((acc, curr) => ({ ...acc, ...curr }), {}) as CarrierFormValues
      const signed = values.contractSigned === true || values.contractSigned === "1"
      const payload: Record<string, unknown> = {
        ...(isEdit && carrierId ? { carrierId } : {}),
        ...values,
        region: joinCsv(values.region),
        contractSigned: signed ? "1" : "0",
        contractFileUrl: signed ? values.contractFileUrl : undefined,
        contractExpireDate: signed ? values.contractExpireDate : undefined,
      }
      if (isEdit) {
        await api.updateCarrier(payload)
      } else {
        await api.insertCarrier(payload)
      }
      showMessage(`${title}成功`, "success")
      onClose(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <BasicDialog
      visible={visible}
      header={title}
      width={1200}
      confirmLoading={submitting}
      onClose={() => onClose()}
      onConfirm={() => void handleSubmit()}
    >
      <Loading loading={loading} showOverlay text="正在加载中...">
        <div className="flex flex-col gap-3">
          <LayoutTitle title="基础信息" className="rounded-none bg-transparent" isbodyPPadding="none">
            <BasicForm
              form={baseInfoForm}
              formConfig={basicFormConfig}
              labelWidth={130}
              gutter={[16, 0]}
              reserveErrorSpace
            />
          </LayoutTitle>
          <LayoutTitle title="联系人信息" className="rounded-none bg-transparent" isbodyPPadding="none" >
            <BasicForm
              form={contactForm}
              formConfig={contactFormConfig}
              labelWidth={130}
              gutter={[16, 0]}
              reserveErrorSpace
            />
          </LayoutTitle>
          <LayoutTitle title="结算与财务" className="rounded-none bg-transparent" isbodyPPadding="none" >
            <BasicForm
              form={financeForm}
              formConfig={financeFormConfig}
              labelWidth={130}
              gutter={[16, 0]}
              reserveErrorSpace
            />
          </LayoutTitle>
          <LayoutTitle title="合同信息" className="rounded-none bg-transparent" isbodyPPadding="none" >
            <BasicForm
              form={contractForm}
              formConfig={contractFormConfig}
              labelWidth={130}
              gutter={[16, 0]}
              reserveErrorSpace
            />
          </LayoutTitle>
        </div>
      </Loading>
    </BasicDialog>
  )
}
