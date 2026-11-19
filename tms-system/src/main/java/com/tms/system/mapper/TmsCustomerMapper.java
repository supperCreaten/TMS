package com.tms.system.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import com.tms.system.domain.TmsCustomer;

/**
 * 客户 数据层
 */
public interface TmsCustomerMapper {
    List<TmsCustomer> selectCustomerList(TmsCustomer query);

    TmsCustomer selectCustomerById(Long customerId);

    TmsCustomer checkCustomerNameUnique(@Param("customerName") String customerName);

    String selectMaxCustomerNoByPrefix(@Param("prefix") String prefix);

    int insertCustomer(TmsCustomer customer);

    int updateCustomer(TmsCustomer customer);

    int deleteCustomerByIds(@Param("customerIds") Long[] customerIds);
}
