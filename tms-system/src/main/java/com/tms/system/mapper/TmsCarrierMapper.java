package com.tms.system.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import com.tms.system.domain.dto.TmsCarrierQuery;
import com.tms.system.domain.dto.TmsCarrierSaveReq;
import com.tms.system.domain.vo.TmsCarrierVo;

public interface TmsCarrierMapper {
    List<TmsCarrierVo> selectCarrierList(TmsCarrierQuery query);

    TmsCarrierVo selectCarrierById(Long carrierId);

    TmsCarrierVo checkCarrierNameUnique(@Param("carrierName") String carrierName);

    String selectMaxCarrierNoByPrefix(@Param("prefix") String prefix);

    int insertCarrier(TmsCarrierSaveReq carrier);

    int updateCarrier(TmsCarrierSaveReq carrier);

    int deleteCarrierByIds(@Param("carrierIds") Long[] carrierIds);
}
