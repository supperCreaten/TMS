package com.tms.system.service.impl;

import com.tms.common.utils.StringUtils;
import com.tms.system.domain.dto.TmsOrderCargoSaveReq;
import com.tms.system.domain.dto.TmsOrderQuery;
import com.tms.system.domain.dto.TmsOrderSaveReq;
import com.tms.system.domain.vo.TmsOrderCargoVo;
import com.tms.system.domain.vo.TmsOrderVo;
import com.tms.system.mapper.TmsOrderCargoMapper;
import com.tms.system.mapper.TmsOrderMapper;
import com.tms.system.service.ITmsOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 * 订单 业务层处理
 */
@Service
public class TmsOrderServiceImpl implements ITmsOrderService {

    /**
     * 订单编号前缀
     */
    private static final String ORDERKEY = "YWDD";

    @Autowired
    private TmsOrderMapper tmsOrderMapper;

    @Autowired
    private TmsOrderCargoMapper tmsOrderCargoMapper;

    /**
     * 生成订单编号：YWDD + yyyyMMdd + 四位自增
     */
    private String generateOrderNo() {
        String prefix = ORDERKEY + LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String maxNo = tmsOrderMapper.selectMaxOrderNoByPrefix(prefix);
        int seq = 1;
        if (StringUtils.isNotEmpty(maxNo) && maxNo.length() >= prefix.length() + 4) {
            try {
                seq = Integer.parseInt(maxNo.substring(prefix.length())) + 1;
            } catch (NumberFormatException ignored) {
                seq = 1;
            }
        }
        return prefix + String.format("%04d", seq);
    }

    /**
     * 分页查询订单列表
     */
    @Override
    public List<TmsOrderVo> selectPageQuery(TmsOrderQuery orderQuery) {
        return tmsOrderMapper.selectOrderList(orderQuery);
    }

    /**
     * 新增订单：生成单号、写主表、批量写货物
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void insertOrder(TmsOrderSaveReq orderSaveReq) {

        try {
            List<TmsOrderCargoSaveReq> cargoList = orderSaveReq.getCargoList();
            if (cargoList == null || cargoList.isEmpty()) {
                throw new SecurityException("请至少添加一条货物信息");
            }
            String orderNo = generateOrderNo();
            orderSaveReq.setOrderNo(orderNo);
            tmsOrderMapper.insertOrder(orderSaveReq);
            Long orderId = orderSaveReq.getOrderId();
            for (TmsOrderCargoSaveReq cargo : cargoList) {
                cargo.setOrderId(orderId);
            }
            tmsOrderCargoMapper.batchInsertCargo(cargoList);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 修改订单：更新主表、批量更新货物
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateOrder(TmsOrderSaveReq orderSaveReq) {
        try {

            Long orderId = orderSaveReq.getOrderId();
            if (orderId == null) {
                throw new RuntimeException("主键ID不能为空");
            }
            List<TmsOrderCargoSaveReq> cargoList = orderSaveReq.getCargoList();
            if (cargoList == null || cargoList.isEmpty()) {
                throw new SecurityException("请至少添加一条货物信息");
            }
            tmsOrderMapper.updateOrder(orderSaveReq);
            tmsOrderCargoMapper.batchUpdateCargo(cargoList);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 根据主键id获取订单详情
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public TmsOrderVo selectOrderById(Long orderId) {
        try {
            if (orderId == null) {
                throw new RuntimeException("主键ID不能为空");
            }
            TmsOrderVo orderVos = tmsOrderMapper.selectOrderById(orderId);
            List<TmsOrderCargoVo> cargoList = tmsOrderCargoMapper.selectCargoListByOrderId(orderId);
            orderVos.setCargoList(cargoList);
            return orderVos;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }
}
