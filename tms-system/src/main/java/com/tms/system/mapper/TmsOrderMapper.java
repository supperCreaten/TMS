package com.tms.system.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import com.tms.system.domain.dto.TmsOrderQuery;
import com.tms.system.domain.dto.TmsOrderSaveReq;
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
     * 按主键查询订单详情（含货物）
     *
     * @param orderId 订单ID
     * @return 订单详情
     */
    TmsOrderVo selectOrderById(Long orderId);

    /**
     * 按订单编号查询
     *
     * @param orderNo 订单编号
     * @return 订单信息
     */
    TmsOrderVo selectOrderByOrderNo(String orderNo);

    /**
     * 按当天前缀查询最大订单编号（用于四位自增）
     *
     * @param prefix 前缀，如 YWDD20261121
     * @return 最大订单编号，无则 null
     */
    String selectMaxOrderNoByPrefix(@Param("prefix") String prefix);

    /**
     * 新增订单
     *
     * @param req 订单参数
     * @return 影响行数
     */
    int insertOrder(TmsOrderSaveReq req);

    /**
     * 修改订单
     *
     * @param req 订单参数
     * @return 影响行数
     */
    int updateOrder(TmsOrderSaveReq req);

    /**
     * 按主键逻辑删除订单
     *
     * @param orderId 订单ID
     * @return 影响行数
     */
    int deleteOrderById(Long orderId);

    /**
     * 批量逻辑删除订单
     *
     * @param orderIds 订单ID数组
     * @return 影响行数
     */
    int deleteOrderByIds(Long[] orderIds);
}
