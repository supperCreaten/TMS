package com.tms.system.domain.vo;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.tms.common.annotation.Excel;
import com.tms.common.annotation.Excel.Type;
import lombok.Data;

/**
 * 承运商列表 / 详情 / 导入导出返回
 */
@Data
public class TmsCarrierVo {
    /** 承运商ID */
    private Long carrierId;

    @Excel(name = "承运商编号", sort = 1, type = Type.EXPORT)
    /** 承运商编号 */
    private String carrierNo;

    @Excel(name = "承运商名称", sort = 2, required = true)
    /** 承运商名称 */
    private String carrierName;

    @Excel(name = "承运商简称", sort = 3)
    /** 承运商简称 */
    private String shortName;

    @Excel(name = "法人姓名", sort = 4, required = true)
    /** 法人姓名 */
    private String legalPerson;

    @Excel(name = "承运商类型", sort = 5, required = true)
    /** 承运商类型 */
    private String carrierType;

    @Excel(name = "承运商评级", sort = 6)
    /** 承运商评级 */
    private String carrierLevel;

    @Excel(name = "税务登记号", sort = 7)
    /** 税务登记号 */
    private String taxRegNo;

    /** 所在地区 */
    private String region;

    @Excel(name = "公司地址", sort = 8)
    /** 公司地址 */
    private String companyAddress;

    @Excel(name = "公司邮箱", sort = 9)
    /** 公司邮箱 */
    private String companyEmail;

    @Excel(name = "合作状态", readConverterExp = "0=启用,1=停用", sort = 10, required = true)
    /** 合作状态 */
    private String status;

    /** 营业执照号 */
    private String businessLicenseNo;
    /** 营业执照附件 */
    private String businessLicenseUrl;
    /** 道路运输许可证号 */
    private String roadPermitNo;
    /** 道路运输许可证附件 */
    private String roadPermitUrl;

    @Excel(name = "联系人姓名", sort = 11, required = true)
    /** 联系人姓名 */
    private String contactName;

    @Excel(name = "手机号码", sort = 12, required = true, pattern = "^1\\d{10}$", patternMessage = "请输入正确的手机号")
    /** 手机号码 */
    private String contactPhone;

    /** 联系人部门 */
    private String contactDept;
    /** 联系人职务 */
    private String contactTitle;
    /** 联系人邮箱 */
    private String contactEmail;
    /** 联系人微信 */
    private String contactWechat;

    @Excel(name = "结算方式", readConverterExp = "cash=现结,monthly=月结,period=账期", sort = 13, required = true)
    /** 结算方式 */
    private String settleType;

    @Excel(name = "发票抬头", sort = 14, required = true)
    /** 发票抬头 */
    private String invoiceTitle;

    @Excel(name = "纳税人识别号", sort = 15)
    /** 纳税人识别号 */
    private String taxNo;

    /** 开户银行 */
    private String bankName;
    /** 账户名称 */
    private String bankAccountName;
    /** 银行账号 */
    private String bankAccountNo;

    @Excel(name = "是否签订合同", readConverterExp = "1=是,0=否", sort = 16, required = true)
    /** 是否签订合同 */
    private String contractSigned;

    /** 合同附件 */
    private String contractFileUrl;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Excel(name = "合同到期日", width = 14, dateFormat = "yyyy-MM-dd", sort = 17)
    /** 合同到期日 */
    private Date contractExpireDate;

    /** 预留：司机数量 */
    private Integer driverCount = 0;
    /** 预留：车辆数量 */
    private Integer vehicleCount = 0;

    @Excel(name = "备注", sort = 18)
    /** 备注 */
    private String remark;

    /** 创建者 */
    private String createBy;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Excel(name = "创建时间", width = 20, dateFormat = "yyyy-MM-dd HH:mm:ss", sort = 19, type = Type.EXPORT)
    /** 创建时间 */
    private Date createTime;
}

