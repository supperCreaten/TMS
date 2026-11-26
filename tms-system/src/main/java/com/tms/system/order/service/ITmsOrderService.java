package com.tms.system.order.service;

import com.tms.system.order.domain.dto.TmsOrderQuery;
import com.tms.system.order.domain.dto.TmsOrderSaveReq;
import com.tms.system.order.domain.vo.TmsOrderVo;

import java.util.List;

/**
 * 订单 业务层
 */
public interface ITmsOrderService {

    /**
     * 分页查询订单列表
     *
     * @param orderQuery 查询条件
     * @return 订单列表
     */
    List<TmsOrderVo> selectPageQuery(TmsOrderQuery orderQuery);

    /**
     * 新增订单及货物明细
     * <p>订单编号规则：YWDD + yyyyMMdd + 四位自增序号</p>
     *
     * @param tmsOrderSaveReq 订单及货物
     */
    void insertOrder(TmsOrderSaveReq tmsOrderSaveReq);

    /**
     * 修改订单及货物明细
     *
     * @param tmsOrderSaveReq 订单及货物（须含 orderId）
     */
    void updateOrder(TmsOrderSaveReq tmsOrderSaveReq);

    /**
     * 修改订单及货物明细
     *
     * @param orderId 订单主键id
     */
    TmsOrderVo selectOrderById(Long orderId);
}
