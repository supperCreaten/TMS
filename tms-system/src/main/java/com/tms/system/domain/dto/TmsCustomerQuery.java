package com.tms.system.domain.dto;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

/**
 * 客户分页查询
 */
@Data
public class TmsCustomerQuery {
    /** 客户级别 */
    private String customerLevel;
    /** 状态 */
    private String status;
    /** 结算方式 */
    private String settleType;
    /** 关键字 */
    private String keyword;

    @JsonFormat(pattern = "yyyy-MM-dd")
    /** 创建开始时间 */
    private Date beginCreateTime;

    @JsonFormat(pattern = "yyyy-MM-dd")
    /** 创建结束时间 */
    private Date endCreateTime;
}

