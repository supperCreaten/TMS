package com.tms.system.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import com.tms.system.domain.TmsCarrier;

public interface TmsCarrierMapper {
    List<TmsCarrier> selectCarrierList(TmsCarrier query);

    TmsCarrier selectCarrierById(Long carrierId);

    TmsCarrier checkCarrierNameUnique(@Param("carrierName") String carrierName);

    String selectMaxCarrierNoByPrefix(@Param("prefix") String prefix);

    int insertCarrier(TmsCarrier carrier);

    int updateCarrier(TmsCarrier carrier);

    int deleteCarrierByIds(@Param("carrierIds") Long[] carrierIds);
}
