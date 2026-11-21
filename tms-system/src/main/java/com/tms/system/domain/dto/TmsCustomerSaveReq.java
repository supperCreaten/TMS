package com.tms.system.domain.dto;

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

    private Long customerId;
    private String customerNo;

    @NotBlank(message = "客户名称不能为空")
    private String customerName;

    private String shortName;
    private String industry;

    @NotBlank(message = "客户级别不能为空")
    private String customerLevel;

    private String customerTags;
    private String region;
    private String companyAddress;

    @NotBlank(message = "合作状态不能为空")
    private String status;

    private String customerSource;
    private String salesUserName;
    private String businessLicenseNo;
    private String businessLicenseUrl;

    @NotBlank(message = "联系人姓名不能为空")
    private String contactName;

    @NotBlank(message = "联系人手机不能为空")
    private String contactPhone;

    private String contactDept;
    private String contactTitle;
    private String contactEmail;
    private String contactWechat;

    @NotBlank(message = "结算方式不能为空")
    private String settleType;

    private BigDecimal creditLimit;
    private Integer payPeriodDays;

    @NotBlank(message = "发票抬头不能为空")
    private String invoiceTitle;

    private String taxNo;
    private String bankName;
    private String bankAccountName;
    private String bankAccountNo;
}
