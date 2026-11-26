package com.tms.system.order.domain.dto;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.tms.common.core.domain.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 订单列表查询参数
 * <p>下单日期按创建时间 create_time 筛选。</p>
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class TmsOrderQuery extends BaseEntity {
    private static final long serialVersionUID = 1L;

    /** 订单编号 */
    private String orderNo;

    /** 关联运单号 */
    private String waybillNo;

    /** 客户ID */
    private Long customerId;

    /** 订单状态 */
    private String orderStatus;

    /** 始发地 */
    private String origin;

    /** 目的地 */
    private String destination;

    /** 下单日期起（按 create_time） */
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date beginOrderTime;

    /** 下单日期止（按 create_time） */
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date endOrderTime;
}
