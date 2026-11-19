package com.tms.system.domain.dto;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * 订单新增/修改参数
 * <p>下单时间取创建时间，表单不传。</p>
 */
@Data
public class TmsOrderSaveReq {
    /** 订单ID（修改时必填） */
    private Long orderId;

    /** 订单编号 */
    private String orderNo;

    /** 关联运单号 */
    private String waybillNo;

    /** 客户名称（取当前登录人公司/部门） */
    @NotBlank(message = "客户名称不能为空")
    private String customerName;

    /** 订单状态 */
    private String orderStatus;

    /** 订单来源 */
    @NotBlank(message = "订单来源不能为空")
    private String orderSource;

    /** 运输类型/订单类型 */
    @NotBlank(message = "运输类型不能为空")
    private String transportType;

    /** 货物类型 */
    @NotBlank(message = "货物类型不能为空")
    private String cargoType;

    /** 发货人 */
    @NotBlank(message = "发货人不能为空")
    private String senderName;

    /** 发货联系电话 */
    @NotBlank(message = "发货联系电话不能为空")
    private String senderPhone;

    /** 始发地 */
    @NotBlank(message = "始发地不能为空")
    private String origin;

    /** 发货地址 */
    @NotBlank(message = "发货地址不能为空")
    private String senderAddress;

    /** 收货人 */
    @NotBlank(message = "收货人不能为空")
    private String receiverName;

    /** 收货联系电话 */
    @NotBlank(message = "收货联系电话不能为空")
    private String receiverPhone;

    /** 目的地 */
    @NotBlank(message = "目的地不能为空")
    private String destination;

    /** 收货地址 */
    @NotBlank(message = "收货地址不能为空")
    private String receiverAddress;

    /** 期望送达时间 */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date expectArriveTime;

    /** 计费方式 */
    @NotBlank(message = "计费方式不能为空")
    private String billingMethod;

    /** 运输费用 */
    @NotNull(message = "运输费用不能为空")
    private BigDecimal transportFee;

    /** 保险费用 */
    private BigDecimal insuranceFee;

    /** 包装费用 */
    private BigDecimal packingFee;

    /** 装卸费用 */
    private BigDecimal loadingFee;

    /** 中转费用 */
    private BigDecimal transferFee;

    /** 燃油费用 */
    private BigDecimal fuelFee;

    /** 服务费用 */
    private BigDecimal serviceFee;

    /** 其他费用 */
    private BigDecimal otherFee;

    /** 费用合计 */
    private BigDecimal totalFee;

    /** 现付 */
    private BigDecimal payCash;

    /** 预付 */
    private BigDecimal payPrepaid;

    /** 到付 */
    private BigDecimal payCod;

    /** 周期付 */
    private BigDecimal payPeriod;

    /** 付费合计 */
    private BigDecimal payTotal;

    /** 订单备注 */
    private String remark;

    /** 货物信息列表 */
    @Valid
    @NotEmpty(message = "货物信息不能为空")
    private List<TmsOrderCargoSaveReq> cargoList;
}
