package com.tms.system.domain;

import java.util.Date;
import com.tms.common.core.domain.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 承运商表 tms_carrier
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class TmsCarrier extends BaseEntity {
    private static final long serialVersionUID = 1L;

    private Long carrierId;
    private String carrierNo;
    private String carrierName;
    private String shortName;
    private String legalPerson;
    private String carrierType;
    private String carrierLevel;
    private String taxRegNo;
    private String region;
    private String companyAddress;
    private String companyEmail;
    private String status;
    private String businessLicenseNo;
    private String businessLicenseUrl;
    private String roadPermitNo;
    private String roadPermitUrl;
    private String contactName;
    private String contactPhone;
    private String contactDept;
    private String contactTitle;
    private String contactEmail;
    private String contactWechat;
    private String settleType;
    private String invoiceTitle;
    private String taxNo;
    private String bankName;
    private String bankAccountName;
    private String bankAccountNo;
    /** 0否 1是 */
    private String contractSigned;
    private String contractFileUrl;
    private Date contractExpireDate;
    private String isDel;

    private String keyword;
    private Date beginCreateTime;
    private Date endCreateTime;
}
