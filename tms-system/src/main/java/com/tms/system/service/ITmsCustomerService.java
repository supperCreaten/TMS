package com.tms.system.service;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.tms.common.utils.poi.ExcelImportCommitResult;
import com.tms.system.domain.TmsCustomer;

/**
 * 客户 服务层
 */
public interface ITmsCustomerService {
    List<TmsCustomer> selectCustomerList(TmsCustomer query);

    TmsCustomer selectCustomerById(Long customerId);

    boolean checkCustomerNameUnique(TmsCustomer customer);

    int insertCustomer(TmsCustomer customer);

    int updateCustomer(TmsCustomer customer);

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
