package com.tms.system.domain.vo;

import java.math.BigDecimal;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.tms.common.annotation.Excel;
import com.tms.common.annotation.Excel.Type;
import lombok.Data;

/**
 * 客户列表/详情/导入导出
 */
@Data
public class TmsCustomerVo {
    private Long customerId;

    @Excel(name = "客户编号", sort = 1, type = Type.EXPORT)
    private String customerNo;

    @Excel(name = "客户名称", sort = 2, required = true)
    private String customerName;

    @Excel(name = "客户简称", sort = 3)
    private String shortName;

    @Excel(name = "所属行业", sort = 4)
    private String industry;

    @Excel(name = "客户级别", readConverterExp = "normal=普通客户,gold=黄金客户,diamond=钻石客户", sort = 5, required = true)
    private String customerLevel;

    private String customerTags;
    private String region;
    private String companyAddress;

    @Excel(name = "合作状态", readConverterExp = "0=启用,1=停用", sort = 6, required = true)
    private String status;

    @Excel(name = "客户来源", sort = 7)
    private String customerSource;

    @Excel(name = "业务员", sort = 8)
    private String salesUserName;

    private String businessLicenseNo;
    private String businessLicenseUrl;

    @Excel(name = "联系人姓名", sort = 9, required = true)
    private String contactName;

    @Excel(name = "手机号码", sort = 10, required = true, pattern = "^1\\d{10}$", patternMessage = "请输入正确的手机号")
    private String contactPhone;

    private String contactDept;
    private String contactTitle;
    private String contactEmail;
    private String contactWechat;

    @Excel(name = "结算方式", readConverterExp = "cash=现结,monthly=月结,period=账期", sort = 11, required = true)
    private String settleType;

    @Excel(name = "信用额度", sort = 12)
    private BigDecimal creditLimit;

    @Excel(name = "账期天数", sort = 13)
    private Integer payPeriodDays;

    @Excel(name = "发票抬头", sort = 14, required = true)
    private String invoiceTitle;

    @Excel(name = "纳税人识别号", sort = 15)
    private String taxNo;

    private String bankName;
    private String bankAccountName;
    private String bankAccountNo;
    private String remark;
    private String createBy;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Excel(name = "创建时间", width = 20, dateFormat = "yyyy-MM-dd HH:mm:ss", sort = 16, type = Type.EXPORT)
    private Date createTime;
}
