import { useEffect, useMemo, useState } from "react"
import { Form, InputNumber, Loading, Select } from "tdesign-react"
import api from "@/api"
import AreaCascader from "@/components/AreaCascader"
import BasicDialog from "@/components/BasicDialog"
import BasicForm from "@/components/BasicForm"
import InputText from "@/components/InputText"
import LayoutTitle from "@/components/LayoutTitle"
import type { AddCustomerProps, CustomerDetail, CustomerFormValues, FormConfig } from "@/interface"
import { showMessage } from "@/utils/methods"
import FileUrlUpload from "../../components/FileUrlUpload"
import {
  COOP_STATUS_OPTIONS,
  CUSTOMER_LEVEL_OPTIONS,
  CUSTOMER_SOURCE_OPTIONS,
  CUSTOMER_TAG_OPTIONS,
  INDUSTRY_OPTIONS,
  SETTLE_TYPE_OPTIONS,
} from "../../constants"

type CustomerFormModel = Omit<CustomerFormValues, "customerTags" | "region"> & {
  customerTags?: string[]
  region?: string[]
}

const initialValues: CustomerFormModel = {
  status: "0",
  customerLevel: "normal",
  settleType: "monthly",
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

function mapDetailToForm(data?: CustomerDetail): CustomerFormModel {
  return {
    ...initialValues,
    ...data,
    region: splitCsv(data?.region),
    customerTags: splitCsv(data?.customerTags),
    status: data?.status != null ? String(data.status) : "0",
  }
}

export type { AddCustomerProps } from "@/interface"

export default function AddCustomer(props: AddCustomerProps) {
  const { visible, title, customerId, onClose } = props
  const [baseInfoForm] = Form.useForm()
  const [contactForm] = Form.useForm()
  const [financeForm] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const isEdit = Boolean(customerId) && title.includes("修改")
  const settleType = Form.useWatch("settleType", financeForm)

  const basicFormConfig = useMemo(
    (): FormConfig[] => [
      {
        label: "客户名称",
        name: "customerName",
        rules: [{ required: true, message: "请输入客户名称" }],
        component: <InputText clearable placeholder="请输入客户名称" />,
      },
      {
        label: "客户简称",
        name: "shortName",
        component: <InputText clearable placeholder="请输入客户简称" />,
      },
      {
        label: "所属行业",
        name: "industry",
        component: <Select clearable filterable options={INDUSTRY_OPTIONS} placeholder="请选择所属行业" />,
      },
      {
        label: "客户级别",
        name: "customerLevel",
        rules: [{ required: true, message: "请选择客户级别" }],
        component: <Select options={CUSTOMER_LEVEL_OPTIONS} placeholder="请选择客户级别" />,
      },
      {
        label: "客户标签",
        name: "customerTags",
        component: <Select multiple clearable filterable options={CUSTOMER_TAG_OPTIONS} placeholder="请选择客户标签" />,
      },
      {
        label: "合作状态",
        name: "status",
        rules: [{ required: true, message: "请选择合作状态" }],
        component: <Select options={COOP_STATUS_OPTIONS} placeholder="请选择合作状态" />,
      },
      {
        label: "客户来源",
        name: "customerSource",
        component: <Select clearable options={CUSTOMER_SOURCE_OPTIONS} placeholder="请选择客户来源" />,
      },
      {
        label: "业务员",
        name: "salesUserName",
        component: <InputText clearable placeholder="请输入业务员" />,
      },
      {
        label: "所在区域",
        name: "region",
        component: <AreaCascader placeholder="请选择所在区域" />,
      },
      {
        label: "营业执照号",
        name: "businessLicenseNo",
        component: <InputText clearable placeholder="请输入营业执照号" />,
      },
      {
        label: "营业执照",
        name: "businessLicenseUrl",
        colProps: { span: 12 },
        component: <FileUrlUpload theme="image" tip="上传营业执照正面照" />,
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
        label: "信用额度",
        name: "creditLimit",
        component: (
          <InputNumber theme="normal" min={0} decimalPlaces={2} className="w-full" placeholder="请输入信用额度" />
        ),
      },
      {
        label: "账期天数",
        name: "payPeriodDays",
        rules: settleType === "period" ? [{ required: true, message: "账期结算请填写账期天数" }] : undefined,
        component: (
          <InputNumber
            theme="normal"
            min={1}
            className="w-full"
            placeholder="请输入账期天数"
            disabled={settleType !== "period"}
          />
        ),
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
    [settleType],
  )

  useEffect(() => {
    if (!visible) return
    const init = async () => {
      setLoading(true)
      try {
        baseInfoForm.reset()
        contactForm.reset()
        financeForm.reset()
        baseInfoForm.setFieldsValue({ ...initialValues })
        financeForm.setFieldsValue({ ...initialValues })
        if (!isEdit || !customerId) return
        const data = await api.getCustomerDetail(customerId)
        const formValues = mapDetailToForm(data || {})
        baseInfoForm.setFieldsValue(formValues)
        contactForm.setFieldsValue(formValues)
        financeForm.setFieldsValue(formValues)
      } finally {
        setLoading(false)
      }
    }
    void init()
  }, [visible, customerId, isEdit, baseInfoForm, contactForm, financeForm])

  const handleSubmit = async () => {
    const validate = await Promise.all(
      [baseInfoForm.validate, contactForm.validate, financeForm.validate].map((validateFn) => validateFn()),
    )
    if (validate.some((item) => item !== true)) return
    setSubmitting(true)
    try {
      const values = [baseInfoForm, contactForm, financeForm]
        .map((form) => form.getFieldsValue(true))
        .reduce((acc, curr) => ({ ...acc, ...curr }), {}) as CustomerFormModel
      const payload: Record<string, unknown> = {
        ...(isEdit && customerId ? { customerId } : {}),
        ...values,
        region: joinCsv(values.region),
        customerTags: joinCsv(values.customerTags),
        creditLimit: values.creditLimit ?? null,
        payPeriodDays: values.settleType === "period" ? (values.payPeriodDays ?? null) : null,
      }
      if (isEdit) {
        await api.updateCustomer(payload)
      } else {
        await api.insertCustomer(payload)
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
              labelWidth={110}
              gutter={[16, 0]}
              reserveErrorSpace
            />
          </LayoutTitle>
          <LayoutTitle title="联系人信息" className="rounded-none bg-transparent" isbodyPPadding="none">
            <BasicForm
              form={contactForm}
              formConfig={contactFormConfig}
              labelWidth={110}
              gutter={[16, 0]}
              reserveErrorSpace
            />
          </LayoutTitle>
          <LayoutTitle title="结算与财务" className="rounded-none bg-transparent" isbodyPPadding="none">
            <BasicForm
              form={financeForm}
              formConfig={financeFormConfig}
              labelWidth={110}
              gutter={[16, 0]}
              reserveErrorSpace
            />
          </LayoutTitle>
        </div>
      </Loading>
    </BasicDialog>
  )
}
