package com.tms.system.domain.dto;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

/**
 * 客户分页查询
 */
@Data
public class TmsCustomerQuery {
    private String customerLevel;
    private String status;
    private String settleType;
    private String keyword;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date beginCreateTime;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date endCreateTime;
}
