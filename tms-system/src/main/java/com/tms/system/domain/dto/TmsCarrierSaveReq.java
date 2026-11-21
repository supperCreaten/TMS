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

    private Long carrierId;

    /** 承运商编号（服务端生成） */
    @JsonIgnore
    private String carrierNo;

    @NotBlank(message = "承运商名称不能为空")
    private String carrierName;

    private String shortName;

    @NotBlank(message = "法人姓名不能为空")
    private String legalPerson;

    @NotBlank(message = "承运商类型不能为空")
    private String carrierType;

    private String carrierLevel;
    private String taxRegNo;
    private String region;
    private String companyAddress;
    private String companyEmail;

    @NotBlank(message = "合作状态不能为空")
    private String status;

    private String businessLicenseNo;
    private String businessLicenseUrl;
    private String roadPermitNo;
    private String roadPermitUrl;

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

    @NotBlank(message = "发票抬头不能为空")
    private String invoiceTitle;

    private String taxNo;
    private String bankName;
    private String bankAccountName;
    private String bankAccountNo;

    @NotBlank(message = "请选择是否签订合同")
    private String contractSigned;

    private String contractFileUrl;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date contractExpireDate;
}
