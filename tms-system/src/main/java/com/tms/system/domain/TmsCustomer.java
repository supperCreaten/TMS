package com.tms.system.domain;

import java.math.BigDecimal;
import java.util.Date;
import com.tms.common.core.domain.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 客户表 tms_customer
 *
 * @author tms
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class TmsCustomer extends BaseEntity {
    private static final long serialVersionUID = 1L;

    private Long customerId;
    private String customerNo;
    private String customerName;
    private String shortName;
    private String industry;
    private String customerLevel;
    private String customerTags;
    private String region;
    private String companyAddress;
    /** 合作状态（0启用 1停用） */
    private String status;
    private String customerSource;
    private String salesUserName;
    private String businessLicenseNo;
    private String businessLicenseUrl;
    private String contactName;
    private String contactPhone;
    private String contactDept;
    private String contactTitle;
    private String contactEmail;
    private String contactWechat;
    /** 结算方式 cash/monthly/period */
    private String settleType;
    private BigDecimal creditLimit;
    private Integer payPeriodDays;
    private String invoiceTitle;
    private String taxNo;
    private String bankName;
    private String bankAccountName;
    private String bankAccountNo;
    private String isDel;

    /** 查询：关键词 */
    private String keyword;
    /** 查询：创建开始 */
    private Date beginCreateTime;
    /** 查询：创建结束 */
    private Date endCreateTime;
}
