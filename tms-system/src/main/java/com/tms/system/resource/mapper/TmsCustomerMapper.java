package com.tms.system.resource.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import com.tms.system.resource.domain.dto.TmsCustomerQuery;
import com.tms.system.resource.domain.dto.TmsCustomerSaveReq;
import com.tms.system.resource.domain.vo.TmsCustomerVo;

/**
 * 客户 数据层
 */
public interface TmsCustomerMapper {
    /**
     * 查询客户列表
     *
     * @param query 查询条件
     * @return 客户列表
     */
    List<TmsCustomerVo> selectCustomerList(TmsCustomerQuery query);

    /**
     * 按主键查询客户
     *
     * @param customerId 客户ID
     * @return 客户信息
     */
    TmsCustomerVo selectCustomerById(Long customerId);

    /**
     * 校验客户名称是否唯一
     *
     * @param customerName 客户名称
     * @return 已存在的客户，无则 null
     */
    TmsCustomerVo checkCustomerNameUnique(@Param("customerName") String customerName);

    /**
     * 按前缀查询最大客户编号
     *
     * @param prefix 编号前缀
     * @return 最大编号，无则 null
     */
    String selectMaxCustomerNoByPrefix(@Param("prefix") String prefix);

    /**
     * 新增客户
     *
     * @param customer 客户参数
     * @return 影响行数
     */
    int insertCustomer(TmsCustomerSaveReq customer);

    /**
     * 修改客户
     *
     * @param customer 客户参数
     * @return 影响行数
     */
    int updateCustomer(TmsCustomerSaveReq customer);

    /**
     * 批量逻辑删除客户
     *
     * @param customerIds 客户ID数组
     * @return 影响行数
     */
    int deleteCustomerByIds(@Param("customerIds") Long[] customerIds);
}