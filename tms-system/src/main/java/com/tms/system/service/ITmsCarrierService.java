package com.tms.system.service;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.tms.common.utils.poi.ExcelImportCommitResult;
import com.tms.system.domain.dto.TmsCarrierQuery;
import com.tms.system.domain.dto.TmsCarrierSaveReq;
import com.tms.system.domain.vo.TmsCarrierVo;

/**
 * 承运商 业务层
 */
public interface ITmsCarrierService {
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
     * @param req 承运商参数
     * @return true=唯一
     */
    boolean checkCarrierNameUnique(TmsCarrierSaveReq req);

    /**
     * 新增承运商
     *
     * @param req 承运商参数
     * @return 影响行数
     */
    int insertCarrier(TmsCarrierSaveReq req);

    /**
     * 修改承运商
     *
     * @param req 承运商参数
     * @return 影响行数
     */
    int updateCarrier(TmsCarrierSaveReq req);

    /**
     * 批量删除承运商
     *
     * @param carrierIds 承运商ID数组
     * @return 影响行数
     */
    int deleteCarrierByIds(Long[] carrierIds);

    /**
     * 导入承运商
     *
     * @param file 导入文件
     * @param partialCommit true=部分校验通过入库；false=全部通过才入库
     * @param operName 操作人
     */
    ExcelImportCommitResult importCarrier(MultipartFile file, boolean partialCommit, String operName);
}
