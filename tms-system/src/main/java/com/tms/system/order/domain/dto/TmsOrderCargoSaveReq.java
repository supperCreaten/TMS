package com.tms.system.order.domain.dto;

import java.math.BigDecimal;
import com.tms.common.core.domain.BaseEntity;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 订单货物信息新增/修改参数
 * <p>审计字段继承自 BaseEntity，由 MyBatis 拦截器自动填充。</p>
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class TmsOrderCargoSaveReq extends BaseEntity {
    private static final long serialVersionUID = 1L;

    /** 货物ID（修改时可选） */
    private Long cargoId;
    /** 订单ID */
    private Long orderId;

    /** 货物名称 */
    @NotBlank(message = "货物名称不能为空")
    private String cargoName;

    /** 货物类型（字典 tms_cargo_type） */
    @NotBlank(message = "货物类型不能为空")
    private String cargoType;

    /** 数量 */
    @NotNull(message = "数量不能为空")
    private BigDecimal quantity;

    /** 单位（字典 tms_cargo_unit） */
    @NotBlank(message = "单位不能为空")
    private String unit;

    /** 重量kg */
    @NotNull(message = "重量不能为空")
    private BigDecimal weight;

    /** 车辆类型（字典 tms_vehicle_type） */
    @NotBlank(message = "车辆类型不能为空")
    private String vehicleType;

    /** 车辆长度（字典 tms_vehicle_length） */
    @NotBlank(message = "车辆长度不能为空")
    private String vehicleLength;

    /** 用车数量 */
    @NotNull(message = "用车数量不能为空")
    @Min(value = 1, message = "用车数量至少为1")
    private Integer vehicleCount;
}
