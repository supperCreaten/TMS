package com.tms.system.resource.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import com.tms.system.resource.domain.dto.TmsCarrierQuery;
import com.tms.system.resource.domain.dto.TmsCarrierSaveReq;
import com.tms.system.resource.domain.vo.TmsCarrierVo;

/**
 * 承运商 数据层
 */
public interface TmsCarrierMapper {
    /**
     * 查询承运商列表
     *
     * @param query 查询条件
     * @return 承运商列表
     */
    List<TmsCarrierVo> selectCarrierList(TmsCarrierQuery query);

    /**
     * 按主键查询承运商
     *
     * @param carrierId 承运商ID
     * @return 承运商信息
     */
    TmsCarrierVo selectCarrierById(Long carrierId);

    /**
     * 校验承运商名称是否唯一
     *
     * @param carrierName 承运商名称
     * @return 已存在的承运商，无则 null
     */
    TmsCarrierVo checkCarrierNameUnique(@Param("carrierName") String carrierName);

    /**
     * 按前缀查询最大承运商编号
     *
     * @param prefix 编号前缀
     * @return 最大编号，无则 null
     */
    String selectMaxCarrierNoByPrefix(@Param("prefix") String prefix);

    /**
     * 新增承运商
     *
     * @param carrier 承运商参数
     * @return 影响行数
     */
    int insertCarrier(TmsCarrierSaveReq carrier);

    /**
     * 修改承运商
     *
     * @param carrier 承运商参数
     * @return 影响行数
     */
    int updateCarrier(TmsCarrierSaveReq carrier);

    /**
     * 批量逻辑删除承运商
     *
     * @param carrierIds 承运商ID数组
     * @return 影响行数
     */
    int deleteCarrierByIds(@Param("carrierIds") Long[] carrierIds);
}
