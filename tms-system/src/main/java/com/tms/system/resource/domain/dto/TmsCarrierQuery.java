package com.tms.system.resource.domain.dto;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

/**
 * 承运商列表查询参数
 */
@Data
public class TmsCarrierQuery {
    /** 是否已签合同 */
    private String contractSigned;
    /** 状态 */
    private String status;
    /** 承运商类型 */
    private String carrierType;
    /** 承运商评级 */
    private String carrierLevel;
    /** 关键字（名称/编号等） */
    private String keyword;

    /** 创建开始日期 */
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date beginCreateTime;

    /** 创建结束日期 */
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date endCreateTime;
}
