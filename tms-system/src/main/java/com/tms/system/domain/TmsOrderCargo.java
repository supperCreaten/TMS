package com.tms.system.domain;

import java.math.BigDecimal;
import com.tms.common.core.domain.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 订单货物信息子表 tms_order_cargo
 *
 * @author tms
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class TmsOrderCargo extends BaseEntity {
    private static final long serialVersionUID = 1L;

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

    /** 体积m³ */
    private BigDecimal volume;

    /** 重量kg */
    private BigDecimal weight;

    /** 删除标志（0存在 1删除） */
    private String isDel;
}
