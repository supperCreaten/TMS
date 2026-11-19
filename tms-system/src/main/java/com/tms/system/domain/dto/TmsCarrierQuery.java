package com.tms.system.domain.dto;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

@Data
public class TmsCarrierQuery {
    private String contractSigned;
    private String status;
    private String carrierType;
    private String carrierLevel;
    private String keyword;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date beginCreateTime;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date endCreateTime;
}
