package com.tms.system.domain.vo;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.tms.system.domain.convert.RegionCodes;
import com.tms.system.domain.enums.OrderStatus;
import lombok.Data;

/**
 * 订单列表 / 详情返回
 * <p>下单时间取 createTime。</p>
 * <p>始发地/目的地库内为省市区三字段；JSON 对外仍返回 {@code origin}/{@code destination} 编码数组，供 AreaCascader 回显。</p>
 */
@Data
public class TmsOrderVo {
    /** 订单ID */
    private Long orderId;

    /** 订单编号 */
    private String orderNo;

    /** 关联运单号 */
    private String waybillNo;

    /** 客户ID */
    private Long customerId;

    /** 客户名称 */
    private String customerName;

    /** 下单时间 */
    private String orderTime;

    /** 订单状态 */
    private String orderStatus;

    /** 订单状态中文 */
    private String orderStatusText;

    /** 订单来源 */
    private String orderSource;

    /** 运输类型/订单类型 */
    private String transportType;

    /** 货物类型摘要（不入库；查询时取明细首行 cargo_type） */
    private String cargoType;

    /** 发货人 */
    private String senderName;

    /** 发货联系电话 */
    private String senderPhone;

    /** 始发地-省编码 */
    @JsonIgnore
    private String originProvince;

    /** 始发地-市编码 */
    @JsonIgnore
    private String originCity;

    /** 始发地-区县编码 */
    @JsonIgnore
    private String originDistrict;

    /** 发货地址 */
    private String senderAddress;

    /** 收货人 */
    private String receiverName;

    /** 收货联系电话 */
    private String receiverPhone;

    /** 目的地-省编码 */
    @JsonIgnore
    private String destinationProvince;

    /** 目的地-市编码 */
    @JsonIgnore
    private String destinationCity;

    /** 目的地-区县编码 */
    @JsonIgnore
    private String destinationDistrict;

    /** 收货地址 */
    private String receiverAddress;

    /** 期望送达时间 */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date expectArriveTime;

    /** 费用合计（库表字段；列表展示） */
    private BigDecimal totalFee;

    /** 货物总数量（服务端由明细汇总） */
    private BigDecimal totalQuantity;

    /** 总重量kg（服务端由明细汇总） */
    private BigDecimal totalWeight;

    /** 总用车数（服务端由明细汇总） */
    private Integer totalVehicleCount;

    /** 创建者 */
    private String createBy;

    /** 创建时间（同时作为下单时间展示） */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;

    /** 订单备注 */
    private String remark;

    /** 货物明细（详情时返回） */
    private List<TmsOrderCargoVo> cargoList;

    /** 前端 AreaCascader 回显 */
    @JsonProperty("origin")
    public List<String> getOrigin() {
        return RegionCodes.toList(originProvince, originCity, originDistrict);
    }

    /** 前端 AreaCascader 回显 */
    @JsonProperty("destination")
    public List<String> getDestination() {
        return RegionCodes.toList(destinationProvince, destinationCity, destinationDistrict);
    }

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
