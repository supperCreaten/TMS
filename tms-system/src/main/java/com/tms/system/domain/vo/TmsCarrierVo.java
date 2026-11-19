package com.tms.system.domain.vo;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.tms.common.annotation.Excel;
import com.tms.common.annotation.Excel.Type;
import lombok.Data;

@Data
public class TmsCarrierVo {
    private Long carrierId;

    @Excel(name = "承运商编号", sort = 1, type = Type.EXPORT)
    private String carrierNo;

    @Excel(name = "承运商名称", sort = 2, required = true)
    private String carrierName;

    @Excel(name = "承运商简称", sort = 3)
    private String shortName;

    @Excel(name = "法人姓名", sort = 4, required = true)
    private String legalPerson;

    @Excel(name = "承运商类型", sort = 5, required = true)
    private String carrierType;

    @Excel(name = "承运商评级", sort = 6)
    private String carrierLevel;

    @Excel(name = "税务登记号", sort = 7)
    private String taxRegNo;

    private String region;

    @Excel(name = "公司地址", sort = 8)
    private String companyAddress;

    @Excel(name = "公司邮箱", sort = 9)
    private String companyEmail;

    @Excel(name = "合作状态", readConverterExp = "0=启用,1=停用", sort = 10, required = true)
    private String status;

    private String businessLicenseNo;
    private String businessLicenseUrl;
    private String roadPermitNo;
    private String roadPermitUrl;

    @Excel(name = "联系人姓名", sort = 11, required = true)
    private String contactName;

    @Excel(name = "手机号码", sort = 12, required = true, pattern = "^1\\d{10}$", patternMessage = "请输入正确的手机号")
    private String contactPhone;

    private String contactDept;
    private String contactTitle;
    private String contactEmail;
    private String contactWechat;

    @Excel(name = "结算方式", readConverterExp = "cash=现结,monthly=月结,period=账期", sort = 13, required = true)
    private String settleType;

    @Excel(name = "发票抬头", sort = 14, required = true)
    private String invoiceTitle;

    @Excel(name = "纳税人识别号", sort = 15)
    private String taxNo;

    private String bankName;
    private String bankAccountName;
    private String bankAccountNo;

    @Excel(name = "是否签订合同", readConverterExp = "1=是,0=否", sort = 16, required = true)
    private String contractSigned;

    private String contractFileUrl;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Excel(name = "合同到期日", width = 14, dateFormat = "yyyy-MM-dd", sort = 17)
    private Date contractExpireDate;

    /** 预留：司机数量 */
    private Integer driverCount = 0;
    /** 预留：车辆数量 */
    private Integer vehicleCount = 0;

    @Excel(name = "备注", sort = 18)
    private String remark;

    private String createBy;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Excel(name = "创建时间", width = 20, dateFormat = "yyyy-MM-dd HH:mm:ss", sort = 19, type = Type.EXPORT)
    private Date createTime;
}
