package com.tms.system.service.impl;

import java.io.ByteArrayInputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import com.tms.common.exception.ServiceException;
import com.tms.common.utils.StringUtils;
import com.tms.common.utils.poi.ExcelImportCommitResult;
import com.tms.common.utils.poi.ExcelImportHelper;
import com.tms.common.utils.poi.ExcelUtil;
import com.tms.system.domain.dto.TmsCarrierQuery;
import com.tms.system.domain.dto.TmsCarrierSaveReq;
import com.tms.system.domain.vo.TmsCarrierVo;
import com.tms.system.mapper.TmsCarrierMapper;
import com.tms.system.service.ITmsCarrierService;

/**
 * 承运商 业务层处理
 */
@Service
public class TmsCarrierServiceImpl implements ITmsCarrierService {
    @Autowired
    private TmsCarrierMapper carrierMapper;

    /**
     * 查询承运商列表
     */
    @Override
    public List<TmsCarrierVo> selectCarrierList(TmsCarrierQuery query) {
        return carrierMapper.selectCarrierList(query == null ? new TmsCarrierQuery() : query);
    }

    /**
     * 根据ID查询承运商
     */
    @Override
    public TmsCarrierVo selectCarrierById(Long carrierId) {
        return carrierMapper.selectCarrierById(carrierId);
    }

    /**
     * 校验承运商名称唯一
     */
    @Override
    public boolean checkCarrierNameUnique(TmsCarrierSaveReq req) {
        long id = req.getCarrierId() == null ? -1L : req.getCarrierId();
        TmsCarrierVo info = carrierMapper.checkCarrierNameUnique(req.getCarrierName());
        return info == null || info.getCarrierId().longValue() == id;
    }

    /**
     * 新增承运商
     */
    @Override
    public int insertCarrier(TmsCarrierSaveReq req) {
        if (StringUtils.isEmpty(req.getStatus())) {
            req.setStatus("0");
        }
        if (StringUtils.isEmpty(req.getContractSigned())) {
            req.setContractSigned("0");
        }
        req.setCarrierNo(generateCarrierNo());
        return carrierMapper.insertCarrier(req);
    }

    /**
     * 修改承运商
     */
    @Override
    public int updateCarrier(TmsCarrierSaveReq req) {
        return carrierMapper.updateCarrier(req);
    }

    /**
     * 批量删除承运商
     */
    @Override
    public int deleteCarrierByIds(Long[] carrierIds) {
        if (carrierIds == null || carrierIds.length == 0) {
            return 0;
        }
        return carrierMapper.deleteCarrierByIds(carrierIds);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    /**
     * 导入承运商
     */
    public ExcelImportCommitResult importCarrier(MultipartFile file, boolean partialCommit, String operName) {
        if (file == null || file.isEmpty()) {
            throw new ServiceException("导入文件不能为空");
        }
        try {
            byte[] fileBytes = file.getBytes();
            ExcelUtil<TmsCarrierVo> util = new ExcelUtil<>(TmsCarrierVo.class);
            List<TmsCarrierVo> vos = util.importExcel(new ByteArrayInputStream(fileBytes));
            if (vos == null || vos.isEmpty()) {
                throw new ServiceException("导入承运商数据不能为空");
            }

            Map<Integer, String> errors = new LinkedHashMap<>();
            List<TmsCarrierSaveReq> toInsert = new ArrayList<>();
            Set<String> pendingNames = new HashSet<>();
            for (int i = 0; i < vos.size(); i++) {
                int sheetRow = i + 1;
                TmsCarrierVo vo = vos.get(i);
                List<String> messages = new ArrayList<>();
                String validateMsg = ExcelImportHelper.validateRow(vo, TmsCarrierVo.class);
                if (StringUtils.isNotEmpty(validateMsg)) {
                    messages.add(validateMsg);
                }
                TmsCarrierSaveReq req = fromImportVo(vo);
                if (StringUtils.isEmpty(req.getStatus())) {
                    req.setStatus("0");
                }
                if (StringUtils.isEmpty(req.getSettleType())) {
                    req.setSettleType("monthly");
                }
                if (StringUtils.isEmpty(req.getContractSigned())) {
                    req.setContractSigned("0");
                }
                if (StringUtils.isEmpty(req.getInvoiceTitle()) && StringUtils.isNotEmpty(req.getCarrierName())) {
                    req.setInvoiceTitle(req.getCarrierName());
                }
                String carrierName = req.getCarrierName();
                if (StringUtils.isNotEmpty(carrierName)) {
                    if (pendingNames.contains(carrierName)) {
                        messages.add("导入文件中承运商名称重复");
                    } else if (!checkCarrierNameUnique(req)) {
                        messages.add("承运商「" + carrierName + "」已存在");
                    }
                }
                if (!messages.isEmpty()) {
                    errors.put(sheetRow, String.join("；", messages));
                    continue;
                }
                pendingNames.add(carrierName);
                req.setCreateBy(operName);
                req.setUpdateBy(operName);
                toInsert.add(req);
            }

            ExcelImportCommitResult result = buildImportResult(vos.size(), errors, fileBytes, file.getOriginalFilename());
            if (!partialCommit && !errors.isEmpty()) {
                result.setSuccessCount(0);
                result.setMessage("校验未全部通过，未入库。失败 " + errors.size() + " 条，请下载错误日志");
                return result;
            }
            for (TmsCarrierSaveReq item : toInsert) {
                insertCarrier(item);
            }
            result.setSuccessCount(toInsert.size());
            if (errors.isEmpty()) {
                result.setMessage("恭喜您，数据已全部导入成功！共 " + toInsert.size() + " 条");
            } else {
                result.setMessage("部分导入成功：成功 " + toInsert.size() + " 条，失败 " + errors.size() + " 条，请下载错误日志");
            }
            return result;
        } catch (ServiceException e) {
            throw e;
        } catch (Exception e) {
            throw new ServiceException("导入承运商失败：" + e.getMessage());
        }
    }

    private ExcelImportCommitResult buildImportResult(int totalCount, Map<Integer, String> errors, byte[] fileBytes,
                                                      String originalFilename) {
        ExcelImportCommitResult result = new ExcelImportCommitResult();
        result.setTotalCount(totalCount);
        result.setFailCount(errors.size());
        result.setSuccessCount(0);
        if (!errors.isEmpty()) {
            String errorFileName = buildErrorFileName(originalFilename);
            result.setErrorFileName(errorFileName);
            result.setErrorFileBase64(ExcelImportHelper.toBase64(ExcelImportHelper.writeErrorColumn(fileBytes, errors)));
        }
        return result;
    }

    private String buildErrorFileName(String originalName) {
        if (StringUtils.isEmpty(originalName)) {
            return "承运商导入错误明细.xlsx";
        }
        int dot = originalName.lastIndexOf('.');
        String prefix = dot > 0 ? originalName.substring(0, dot) : originalName;
        return prefix + "_错误明细.xlsx";
    }

    private String generateCarrierNo() {
        String prefix = "CYS" + new SimpleDateFormat("yyyyMMdd").format(new Date());
        String maxNo = carrierMapper.selectMaxCarrierNoByPrefix(prefix);
        int seq = 1;
        if (StringUtils.isNotEmpty(maxNo) && maxNo.length() >= prefix.length() + 4) {
            try {
                seq = Integer.parseInt(maxNo.substring(prefix.length())) + 1;
            } catch (NumberFormatException ignored) {
                seq = 1;
            }
        }
        return prefix + String.format("%04d", seq);
    }

    /** Excel 导入行 → SaveReq */
    private static TmsCarrierSaveReq fromImportVo(TmsCarrierVo vo) {
        TmsCarrierSaveReq req = new TmsCarrierSaveReq();
        if (vo == null) {
            return req;
        }
        req.setCarrierName(vo.getCarrierName());
        req.setShortName(vo.getShortName());
        req.setLegalPerson(vo.getLegalPerson());
        req.setCarrierType(vo.getCarrierType());
        req.setCarrierLevel(vo.getCarrierLevel());
        req.setTaxRegNo(vo.getTaxRegNo());
        req.setCompanyAddress(vo.getCompanyAddress());
        req.setCompanyEmail(vo.getCompanyEmail());
        req.setStatus(vo.getStatus());
        req.setContactName(vo.getContactName());
        req.setContactPhone(vo.getContactPhone());
        req.setSettleType(vo.getSettleType());
        req.setInvoiceTitle(vo.getInvoiceTitle());
        req.setTaxNo(vo.getTaxNo());
        req.setContractSigned(vo.getContractSigned());
        req.setContractExpireDate(vo.getContractExpireDate());
        req.setRemark(vo.getRemark());
        return req;
    }
}

