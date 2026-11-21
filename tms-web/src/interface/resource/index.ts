/** 客户详情 */
export interface CustomerDetail {
  customerId?: number | string
  customerName?: string
  shortName?: string
  industry?: string
  customerLevel?: string
  customerTags?: string | string[]
  region?: string | string[]
  companyAddress?: string
  status?: string | number
  customerSource?: string
  salesUserName?: string
  businessLicenseNo?: string
  businessLicenseUrl?: string
  contactName?: string
  contactPhone?: string
  contactDept?: string
  contactTitle?: string
  contactEmail?: string
  contactWechat?: string
  settleType?: string
  creditLimit?: number
  payPeriodDays?: number
  invoiceTitle?: string
  taxNo?: string
  bankName?: string
  bankAccountName?: string
  bankAccountNo?: string
  remark?: string
}

/** 承运商详情 */
export interface CarrierDetail {
  carrierId?: number | string
  carrierName?: string
  shortName?: string
  legalPerson?: string
  carrierType?: string
  carrierLevel?: string
  taxRegNo?: string
  region?: string | string[]
  companyAddress?: string
  companyEmail?: string
  status?: string | number
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
  contractSigned?: string
  contractFileUrl?: string
  contractExpireDate?: string
  remark?: string
}

export interface CustomerRow {
  customerId: string | number
  customerNo?: string
  customerName?: string
  shortName?: string
  industry?: string
  customerLevel?: string
  status?: string | number
  contactName?: string
  contactPhone?: string
  createTime?: string
}

export interface CustomerDialogState {
  visible: boolean
  title: string
  customerId?: string
}

export interface CustomerFormValues extends CustomerDetail {}

export interface AddCustomerProps {
  visible: boolean
  title: string
  customerId?: string
  onClose: (changed?: boolean) => void
}

export interface CarrierRow {
  carrierId: string | number
  carrierNo?: string
  carrierName?: string
  shortName?: string
  carrierType?: string
  carrierLevel?: string
  status?: string | number
  contactName?: string
  contactPhone?: string
  createTime?: string
}

export interface CarrierDialogState {
  visible: boolean
  title: string
  carrierId?: string
}

export interface CarrierFormValues extends CarrierDetail {}

export interface AddCarrierProps {
  visible: boolean
  title: string
  carrierId?: string
  onClose: (changed?: boolean) => void
}

/** 含税价计算结果 */
export interface TaxPriceCalcResult {
  taxExclusiveUnitPrice?: number | string
  taxAmount?: number | string
  taxInclusiveUnitPrice?: number | string
}
