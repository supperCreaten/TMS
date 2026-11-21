package com.tms.system.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import com.tms.system.domain.dto.TmsCustomerQuery;
import com.tms.system.domain.dto.TmsCustomerSaveReq;
import com.tms.system.domain.vo.TmsCustomerVo;

/**
 * 客户 数据层
 */
public interface TmsCustomerMapper {
    List<TmsCustomerVo> selectCustomerList(TmsCustomerQuery query);

    TmsCustomerVo selectCustomerById(Long customerId);

    TmsCustomerVo checkCustomerNameUnique(@Param("customerName") String customerName);

    String selectMaxCustomerNoByPrefix(@Param("prefix") String prefix);

    int insertCustomer(TmsCustomerSaveReq customer);

    int updateCustomer(TmsCustomerSaveReq customer);

    int deleteCustomerByIds(@Param("customerIds") Long[] customerIds);
}
