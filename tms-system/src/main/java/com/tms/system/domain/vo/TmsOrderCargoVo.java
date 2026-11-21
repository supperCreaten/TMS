package com.tms.system.domain.vo;

import java.math.BigDecimal;
import lombok.Data;

/**
 * 订单货物信息返回
 */
@Data
public class TmsOrderCargoVo {
    /** 货物ID */
    private Long cargoId;

    /** 订单ID */
    private Long orderId;

    /** 序号 */
    private Integer sortNum;

    /** 货物名称 */
    private String cargoName;

    /** 货物类型 */
    private String cargoType;

    /** 数量 */
    private BigDecimal quantity;

    /** 单位 */
    private String unit;

    /** 重量kg */
    private BigDecimal weight;

    /** 车辆类型（字典 tms_vehicle_type） */
    private String vehicleType;

    /** 车辆长度（字典 tms_vehicle_length） */
    private String vehicleLength;

    /** 用车数量 */
    private Integer vehicleCount;
}
