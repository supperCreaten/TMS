package com.tms.system.domain.dto;

import java.math.BigDecimal;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * 订单货物信息新增/修改参数
 */
@Data
public class TmsOrderCargoSaveReq {
    /** 货物ID（修改时可选） */
    private Long cargoId;

    /** 序号 */
    private Integer sortNum;

    /** 货物名称 */
    @NotBlank(message = "货物名称不能为空")
    private String cargoName;

    /** 数量 */
    @NotNull(message = "数量不能为空")
    private BigDecimal quantity;

    /** 单位 */
    @NotBlank(message = "单位不能为空")
    private String unit;

    /** 体积m³ */
    private BigDecimal volume;

    /** 重量kg */
    @NotNull(message = "重量不能为空")
    private BigDecimal weight;

    /** 备注 */
    private String remark;
}
