package com.tms.system.mapper;

import java.util.List;
import com.tms.system.domain.dto.TmsOrderQuery;
import com.tms.system.domain.dto.TmsOrderSaveReq;
import com.tms.system.domain.vo.TmsOrderVo;

/**
 * 订单主表 数据层
 *
 * @author tms
 */
public interface TmsOrderMapper {
    List<TmsOrderVo> selectOrderList(TmsOrderQuery query);

    TmsOrderVo selectOrderById(Long orderId);

    TmsOrderVo selectOrderByOrderNo(String orderNo);

    int insertOrder(TmsOrderSaveReq req);

    int updateOrder(TmsOrderSaveReq req);

    int deleteOrderById(Long orderId);

    int deleteOrderByIds(Long[] orderIds);
}
