package com.tms.system.domain.vo;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.tms.system.domain.enums.OrderStatus;
import lombok.Data;

/**
 * 订单列表 / 详情返回
 * <p>下单时间取 createTime。</p>
 */
@Data
public class TmsOrderVo {
    /** 订单ID */
    private Long orderId;

    /** 订单编号 */
    private String orderNo;

    /** 关联运单号 */
    private String waybillNo;

    /** 客户名称 */
    private String customerName;

    /** 订单状态 */
    private String orderStatus;

    /** 订单状态中文 */
    private String orderStatusText;

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

    /** 计划运输时长（小时，用于限制司机时效） */
    private Integer planTransportDuration;

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

    /** 费用合计/运费合计 */
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

    /** 创建者 */
    private String createBy;

    /** 创建时间（同时作为下单时间展示） */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;

    /** 订单备注 */
    private String remark;

    /** 货物明细（详情时返回） */
    private List<TmsOrderCargoVo> cargoList;

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
        this.orderStatusText = OrderStatus.getInfoByCode(orderStatus);
    }

    public String getOrderStatusText() {
        if (orderStatusText != null && !orderStatusText.isEmpty()) {
            return orderStatusText;
        }
        return OrderStatus.getInfoByCode(orderStatus);
    }
}
