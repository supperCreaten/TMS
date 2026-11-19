package com.tms.system.domain.dto;

import java.math.BigDecimal;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * 客户新增/修改
 */
@Data
public class TmsCustomerSaveReq {
    private Long customerId;

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
    private String remark;
}
