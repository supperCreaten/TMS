package com.tms.system.mapper;

import java.util.List;
import com.tms.system.domain.TmsOrder;
import com.tms.system.domain.dto.TmsOrderQuery;
import com.tms.system.domain.vo.TmsOrderVo;

/**
 * 订单主表 数据层
 *
 * @author tms
 */
public interface TmsOrderMapper {
    /**
     * 查询订单列表
     *
     * @param query 查询条件
     * @return 订单列表
     */
    List<TmsOrderVo> selectOrderList(TmsOrderQuery query);

    /**
     * 根据订单ID查询订单（含货物明细）
     *
     * @param orderId 订单ID
     * @return 订单详情
     */
    TmsOrderVo selectOrderById(Long orderId);

    /**
     * 根据订单编号查询
     *
     * @param orderNo 订单编号
     * @return 订单信息
     */
    TmsOrder selectOrderByOrderNo(String orderNo);

    /**
     * 新增订单
     *
     * @param order 订单信息
     * @return 结果
     */
    int insertOrder(TmsOrder order);

    /**
     * 修改订单
     *
     * @param order 订单信息
     * @return 结果
     */
    int updateOrder(TmsOrder order);

    /**
     * 逻辑删除订单
     *
     * @param orderId 订单ID
     * @return 结果
     */
    int deleteOrderById(Long orderId);

    /**
     * 批量逻辑删除订单
     *
     * @param orderIds 订单ID数组
     * @return 结果
     */
    int deleteOrderByIds(Long[] orderIds);
}
