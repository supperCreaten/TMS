package com.tms.system.resource.domain.dto;

import java.math.BigDecimal;
import com.tms.common.core.domain.BaseEntity;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 客户新增/修改
 * <p>审计字段继承自 BaseEntity，由 MyBatis 拦截器自动填充。</p>
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class TmsCustomerSaveReq extends BaseEntity {
    private static final long serialVersionUID = 1L;

    /** 客户ID */
    private Long customerId;
    /** 客户编号 */
    private String customerNo;

    @NotBlank(message = "客户名称不能为空")
    /** 客户名称 */
    private String customerName;

    /** 简称 */
    private String shortName;
    /** 所属行业 */
    private String industry;

    @NotBlank(message = "客户级别不能为空")
    /** 客户级别 */
    private String customerLevel;

    /** 客户标签 */
    private String customerTags;
    /** 所在地区 */
    private String region;
    /** 公司地址 */
    private String companyAddress;

    @NotBlank(message = "合作状态不能为空")
    /** 状态 */
    private String status;

    /** 客户来源 */
    private String customerSource;
    /** 业务员 */
    private String salesUserName;
    /** 营业执照号 */
    private String businessLicenseNo;
    /** 营业执照附件 */
    private String businessLicenseUrl;

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

    /** 信用额度 */
    private BigDecimal creditLimit;
    /** 账期天数 */
    private Integer payPeriodDays;

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
}

