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

    /** 数量 */
    private BigDecimal quantity;

    /** 单位 */
    private String unit;

    /** 重量kg */
    private BigDecimal weight;

    /** 车辆类型（前端枚举文案） */
    private String vehicleType;

    /** 车辆长度（前端枚举文案） */
    private String vehicleLength;

    /** 用车数量 */
    private Integer vehicleCount;

    /** 备注 */
    private String remark;
}
