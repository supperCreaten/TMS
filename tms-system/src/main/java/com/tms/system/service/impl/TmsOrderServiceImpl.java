package com.tms.system.service.impl;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import com.tms.system.domain.dto.TmsOrderCargoSaveReq;
import com.tms.system.domain.dto.TmsOrderSaveReq;
import com.tms.system.mapper.TmsOrderCargoMapper;
import com.tms.system.mapper.TmsOrderMapper;
import com.tms.system.service.ITmsOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TmsOrderServiceImpl implements ITmsOrderService {

    private static String ORDERKEY = "YWDD";
    @Autowired
    private TmsOrderMapper tmsOrderMapper;

    @Autowired
    private TmsOrderCargoMapper tmsOrderCargoMapper;

    @Transactional(rollbackFor = Exception.class)
    public void insertOrder(TmsOrderSaveReq req) {
        List<TmsOrderCargoSaveReq> cargoList = req.getCargoList();
        if (cargoList == null || cargoList.isEmpty()) {
            throw new SecurityException("请至少添加一条货物信息");
        }
        String orderNo = ORDERKEY + LocalDate.now().format(DateTimeFormatter.ofPattern("YYYYMMDD"));
        tmsOrderMapper.insertOrder(req);
        Long orderId = req.getOrderId();
        for (TmsOrderCargoSaveReq cargo : cargoList) {
            cargo.setOrderId(orderId);
        }
        tmsOrderCargoMapper.batchInsertCargo(cargoList);
    }
}
