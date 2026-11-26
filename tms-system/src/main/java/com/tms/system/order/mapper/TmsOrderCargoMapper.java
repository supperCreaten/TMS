package com.tms.system.order.mapper;

import java.util.List;
import com.tms.system.order.domain.dto.TmsOrderCargoSaveReq;
import com.tms.system.order.domain.vo.TmsOrderCargoVo;
import org.apache.ibatis.annotations.Param;

/**
 * 订单货物信息 数据层
 *
 * @author tms
 */
public interface TmsOrderCargoMapper {
    /**
     * 根据订单ID查询货物列表
     *
     * @param orderId 订单ID
     * @return 货物列表
     */
    List<TmsOrderCargoVo> selectCargoListByOrderId(Long orderId);

    /**
     * 新增货物信息
     *
     * @param tmsOrderCargoSaveReq 货物信息
     * @return 结果
     */
    int insertCargo(TmsOrderCargoSaveReq tmsOrderCargoSaveReq);

    /**
     * 批量新增货物信息
     *
     * @param cargoList 货物列表
     * @return 结果
     */
    int batchInsertCargo(@Param("list") List<TmsOrderCargoSaveReq> cargoList);

    /**
     * 修改货物信息
     *
     * @param cargo 货物信息
     * @return 结果
     */
    int updateCargo(TmsOrderCargoSaveReq cargo);

    /**
     * 批量修改货物信息
     *
     * @param cargoList 货物列表
     * @return 结果
     */
    int batchUpdateCargo(@Param("cargoList") List<TmsOrderCargoSaveReq> cargoList);

    /**
     * 按订单ID逻辑删除货物
     *
     * @param orderId 订单ID
     * @return 结果
     */
    int deleteCargoByOrderId(Long orderId);

    /**
     * 按货物ID逻辑删除
     *
     * @param cargoId 货物ID
     * @return 结果
     */
    int deleteCargoById(Long cargoId);
}
