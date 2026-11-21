package com.tms.system.service;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.tms.common.utils.poi.ExcelImportCommitResult;
import com.tms.system.domain.dto.TmsCustomerQuery;
import com.tms.system.domain.dto.TmsCustomerSaveReq;
import com.tms.system.domain.vo.TmsCustomerVo;

/**
 * 客户 服务层
 */
public interface ITmsCustomerService {
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
     * @param customer 客户参数
     * @return true=唯一
     */
    boolean checkCustomerNameUnique(TmsCustomerSaveReq customer);

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
     * 批量删除客户
     *
     * @param customerIds 客户ID数组
     * @return 影响行数
     */
    int deleteCustomerByIds(Long[] customerIds);

    /**
     * 导入客户
     *
     * @param file 导入文件
     * @param partialCommit true=部分校验通过入库；false=全部通过才入库
     * @param operName 操作人
     */
    ExcelImportCommitResult importCustomer(MultipartFile file, boolean partialCommit, String operName);
}