package com.tms.system.service;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.tms.common.utils.poi.ExcelImportCommitResult;
import com.tms.system.domain.dto.TmsCarrierQuery;
import com.tms.system.domain.dto.TmsCarrierSaveReq;
import com.tms.system.domain.vo.TmsCarrierVo;

public interface ITmsCarrierService {
    List<TmsCarrierVo> selectCarrierList(TmsCarrierQuery query);

    TmsCarrierVo selectCarrierById(Long carrierId);

    boolean checkCarrierNameUnique(TmsCarrierSaveReq req);

    int insertCarrier(TmsCarrierSaveReq req);

    int updateCarrier(TmsCarrierSaveReq req);

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
