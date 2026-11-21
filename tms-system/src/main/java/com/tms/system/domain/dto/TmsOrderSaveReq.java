package com.tms.system.domain.dto;

import java.util.Date;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.tms.common.core.domain.BaseEntity;
import com.tms.system.domain.convert.RegionCodes;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 订单新增/修改参数
 * <p>下单时间取创建时间，表单不传。</p>
 * <p>始发地/目的地：前端 AreaCascader 传编码数组 {@code origin}/{@code destination}，
 * 反序列化时拆成省/市/区三字段入库。</p>
 * <p>审计字段（createBy/createTime/updateBy/updateTime）继承自 BaseEntity，由 MyBatis 拦截器自动填充。</p>
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class TmsOrderSaveReq extends BaseEntity {
    private static final long serialVersionUID = 1L;

    /** 订单ID（修改时必填） */
    private Long orderId;

    /** 订单编号 */
    private String orderNo;

    /** 关联运单号 */
    private String waybillNo;

    /** 客户ID */
    @NotNull(message = "客户不能为空")
    private Long customerId;

    /** 订单状态 */
    private String orderStatus;

    /** 订单来源（字典 tms_order_source） */
    @NotBlank(message = "订单来源不能为空")
    private String orderSource;

    /** 运输类型/订单类型（字典 tms_transport_type） */
    @NotBlank(message = "运输类型不能为空")
    private String transportType;

    /** 发货人 */
    @NotBlank(message = "发货人不能为空")
    private String senderName;

    /** 发货联系电话 */
    @NotBlank(message = "发货联系电话不能为空")
    private String senderPhone;

    /** 始发地-省编码 */
    @NotBlank(message = "始发地不能为空")
    private String originProvince;

    /** 始发地-市编码 */
    private String originCity;

    /** 始发地-区县编码 */
    private String originDistrict;

    /** 发货地址 */
    @NotBlank(message = "发货地址不能为空")
    private String senderAddress;

    /** 收货人 */
    @NotBlank(message = "收货人不能为空")
    private String receiverName;

    /** 收货联系电话 */
    @NotBlank(message = "收货联系电话不能为空")
    private String receiverPhone;

    /** 目的地-省编码 */
    @NotBlank(message = "目的地不能为空")
    private String destinationProvince;

    /** 目的地-市编码 */
    private String destinationCity;

    /** 目的地-区县编码 */
    private String destinationDistrict;

    /** 收货地址 */
    @NotBlank(message = "收货地址不能为空")
    private String receiverAddress;

    /** 期望送达时间 */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date expectArriveTime;

    /** 货物信息列表 */
    @Valid
    @NotEmpty(message = "货物信息不能为空")
    private List<TmsOrderCargoSaveReq> cargoList;

    /** 前端 AreaCascader：["省","市","区"] → 拆字段 */
    @JsonSetter("origin")
    public void setOrigin(List<String> codes) {
        this.originProvince = RegionCodes.at(codes, 0);
        this.originCity = RegionCodes.at(codes, 1);
        this.originDistrict = RegionCodes.at(codes, 2);
    }

    /** 前端 AreaCascader：["省","市","区"] → 拆字段 */
    @JsonSetter("destination")
    public void setDestination(List<String> codes) {
        this.destinationProvince = RegionCodes.at(codes, 0);
        this.destinationCity = RegionCodes.at(codes, 1);
        this.destinationDistrict = RegionCodes.at(codes, 2);
    }

    @JsonIgnore
    public List<String> getOrigin() {
        return RegionCodes.toList(originProvince, originCity, originDistrict);
    }

    @JsonIgnore
    public List<String> getDestination() {
        return RegionCodes.toList(destinationProvince, destinationCity, destinationDistrict);
    }
}
