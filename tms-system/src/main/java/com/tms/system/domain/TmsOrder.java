package com.tms.system.domain;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import com.tms.common.core.domain.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 订单主表 tms_order
 *
 * @author tms
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class TmsOrder extends BaseEntity {
    private static final long serialVersionUID = 1L;

    /** 订单ID */
    private Long orderId;

    /** 订单编号 */
    private String orderNo;

    /** 关联运单号 */
    private String waybillNo;

    /** 客户名称 */
    private String customerName;

    /**
     * 订单状态，取值见 {@link com.tms.system.domain.enums.OrderStatus}
     * （pending_accept待接单 / pending_dispatch待调度 / in_transit运输中 / signed已签收 /
     * completed已完成 / rejected已拒绝 / canceled已取消 / exception异常）
     */
    private String orderStatus;

    /** 订单来源 */
    private String orderSource;

    /** 运输类型/订单类型 */
    private String transportType;

    /** 货物类型 */
    private String cargoType;

    /** 发货人 */
    private String senderName;

    /** 发货联系电话 */
    private String senderPhone;

    /** 始发地 */
    private String origin;

    /** 发货地址 */
    private String senderAddress;

    /** 收货人 */
    private String receiverName;

    /** 收货联系电话 */
    private String receiverPhone;

    /** 目的地 */
    private String destination;

    /** 收货地址 */
    private String receiverAddress;

    /** 期望送达时间 */
    private Date expectArriveTime;

    /** 计费方式 */
    private String billingMethod;

    /** 运输费用 */
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

    /** 货物总数量（汇总） */
    private BigDecimal totalQuantity;

    /** 总重量kg（汇总） */
    private BigDecimal totalWeight;

    /** 删除标志（0存在 1删除） */
    private String isDel;

    /** 货物明细 */
    private List<TmsOrderCargo> cargoList;
}
