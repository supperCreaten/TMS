package com.tms.system.resource.domain.vo;

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
    /** 客户ID */
    private Long customerId;

    @Excel(name = "客户编号", sort = 1, type = Type.EXPORT)
    /** 客户编号 */
    private String customerNo;

    @Excel(name = "客户名称", sort = 2, required = true)
    /** 客户名称 */
    private String customerName;

    @Excel(name = "客户简称", sort = 3)
    /** 客户简称 */
    private String shortName;

    @Excel(name = "所属行业", sort = 4)
    /** 所属行业 */
    private String industry;

    @Excel(name = "客户级别", readConverterExp = "normal=普通客户,gold=黄金客户,diamond=钻石客户", sort = 5, required = true)
    /** 客户级别 */
    private String customerLevel;

    /** 客户标签 */
    private String customerTags;
    /** 所在地区 */
    private String region;
    /** 公司地址 */
    private String companyAddress;

    @Excel(name = "合作状态", readConverterExp = "0=启用,1=停用", sort = 6, required = true)
    /** 合作状态 */
    private String status;

    @Excel(name = "客户来源", sort = 7)
    /** 客户来源 */
    private String customerSource;

    @Excel(name = "业务员", sort = 8)
    /** 业务员 */
    private String salesUserName;

    /** 营业执照号 */
    private String businessLicenseNo;
    /** 营业执照附件 */
    private String businessLicenseUrl;

    @Excel(name = "联系人姓名", sort = 9, required = true)
    /** 联系人姓名 */
    private String contactName;

    @Excel(name = "手机号码", sort = 10, required = true, pattern = "^1\\d{10}$", patternMessage = "请输入正确的手机号")
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

    @Excel(name = "结算方式", readConverterExp = "cash=现结,monthly=月结,period=账期", sort = 11, required = true)
    /** 结算方式 */
    private String settleType;

    @Excel(name = "信用额度", sort = 12)
    /** 信用额度 */
    private BigDecimal creditLimit;

    @Excel(name = "账期天数", sort = 13)
    /** 账期天数 */
    private Integer payPeriodDays;

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
    /** 备注 */
    private String remark;
    /** 创建者 */
    private String createBy;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Excel(name = "创建时间", width = 20, dateFormat = "yyyy-MM-dd HH:mm:ss", sort = 16, type = Type.EXPORT)
    /** 创建时间 */
    private Date createTime;
}

