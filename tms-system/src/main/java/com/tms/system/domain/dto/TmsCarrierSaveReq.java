package com.tms.system.domain.dto;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tms.common.core.domain.BaseEntity;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 承运商新增/修改
 * <p>审计字段继承自 BaseEntity，由 MyBatis 拦截器自动填充。</p>
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class TmsCarrierSaveReq extends BaseEntity {
    private static final long serialVersionUID = 1L;

    /** 承运商ID */
    private Long carrierId;

    /** 承运商编号（服务端生成） */
    @JsonIgnore
    private String carrierNo;

    @NotBlank(message = "承运商名称不能为空")
    /** 承运商名称 */
    private String carrierName;

    /** 简称 */
    private String shortName;

    @NotBlank(message = "法人姓名不能为空")
    /** 法人姓名 */
    private String legalPerson;

    @NotBlank(message = "承运商类型不能为空")
    /** 承运商类型 */
    private String carrierType;

    /** 承运商评级 */
    private String carrierLevel;
    /** 税务登记号 */
    private String taxRegNo;
    /** 所在地区 */
    private String region;
    /** 公司地址 */
    private String companyAddress;
    /** 公司邮箱 */
    private String companyEmail;

    @NotBlank(message = "合作状态不能为空")
    /** 状态 */
    private String status;

    /** 营业执照号 */
    private String businessLicenseNo;
    /** 营业执照附件 */
    private String businessLicenseUrl;
    /** 道路运输许可证号 */
    private String roadPermitNo;
    /** 道路运输许可证附件 */
    private String roadPermitUrl;

    @NotBlank(message = "联系人姓名不能为空")
    /** 联系人姓名 */
    private String contactName;

    @NotBlank(message = "联系人手机不能为空")
    /** 联系人手机 */
    private String contactPhone;

    /** 联系人部门 */
    private String contactDept;
    /** 联系人职务 */
    private String contactTitle;
    /** 联系人邮箱 */
    private String contactEmail;
    /** 联系人微信 */
    private String contactWechat;

    @NotBlank(message = "结算方式不能为空")
    /** 结算方式 */
    private String settleType;

    @NotBlank(message = "发票抬头不能为空")
    /** 发票抬头 */
    private String invoiceTitle;

    /** 纳税人识别号 */
    private String taxNo;
    /** 开户银行 */
    private String bankName;
    /** 账户名称 */
    private String bankAccountName;
    /** 银行账号 */
    private String bankAccountNo;

    @NotBlank(message = "请选择是否签订合同")
    /** 是否签订合同 */
    private String contractSigned;

    /** 合同附件 */
    private String contractFileUrl;

    @JsonFormat(pattern = "yyyy-MM-dd")
    /** 合同到期日 */
    private Date contractExpireDate;
}

