package com.tms.system.service;

import com.tms.system.domain.dto.TmsOrderSaveReq;

public interface ITmsOrderService {
    void insertOrder(TmsOrderSaveReq tmsOrderSaveReq);
}
