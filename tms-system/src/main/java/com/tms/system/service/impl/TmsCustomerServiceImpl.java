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
import com.tms.system.domain.dto.TmsCustomerQuery;
import com.tms.system.domain.dto.TmsCustomerSaveReq;
import com.tms.system.domain.vo.TmsCustomerVo;
import com.tms.system.mapper.TmsCustomerMapper;
import com.tms.system.service.ITmsCustomerService;

/**
 * 客户 服务实现
 */
@Service
public class TmsCustomerServiceImpl implements ITmsCustomerService {
    @Autowired
    private TmsCustomerMapper customerMapper;

    @Override
    public List<TmsCustomerVo> selectCustomerList(TmsCustomerQuery query) {
        return customerMapper.selectCustomerList(query == null ? new TmsCustomerQuery() : query);
    }

    @Override
    public TmsCustomerVo selectCustomerById(Long customerId) {
        return customerMapper.selectCustomerById(customerId);
    }

    @Override
    public boolean checkCustomerNameUnique(TmsCustomerSaveReq customer) {
        long id = customer.getCustomerId() == null ? -1L : customer.getCustomerId();
        TmsCustomerVo info = customerMapper.checkCustomerNameUnique(customer.getCustomerName());
        return info == null || info.getCustomerId().longValue() == id;
    }

    @Override
    public int insertCustomer(TmsCustomerSaveReq customer) {
        if (StringUtils.isEmpty(customer.getStatus())) {
            customer.setStatus("0");
        }
        customer.setCustomerNo(generateCustomerNo());
        return customerMapper.insertCustomer(customer);
    }

    @Override
    public int updateCustomer(TmsCustomerSaveReq customer) {
        return customerMapper.updateCustomer(customer);
    }

    @Override
    public int deleteCustomerByIds(Long[] customerIds) {
        if (customerIds == null || customerIds.length == 0) {
            return 0;
        }
        return customerMapper.deleteCustomerByIds(customerIds);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public ExcelImportCommitResult importCustomer(MultipartFile file, boolean partialCommit, String operName) {
        if (file == null || file.isEmpty()) {
            throw new ServiceException("导入文件不能为空");
        }
        try {
            byte[] fileBytes = file.getBytes();
            ExcelUtil<TmsCustomerVo> util = new ExcelUtil<>(TmsCustomerVo.class);
            List<TmsCustomerVo> vos = util.importExcel(new ByteArrayInputStream(fileBytes));
            if (vos == null || vos.isEmpty()) {
                throw new ServiceException("导入客户数据不能为空");
            }

            Map<Integer, String> errors = new LinkedHashMap<>();
            List<TmsCustomerSaveReq> toInsert = new ArrayList<>();
            Set<String> pendingNames = new HashSet<>();
            for (int i = 0; i < vos.size(); i++) {
                int sheetRow = i + 1;
                TmsCustomerVo vo = vos.get(i);
                List<String> messages = new ArrayList<>();
                String validateMsg = ExcelImportHelper.validateRow(vo, TmsCustomerVo.class);
                if (StringUtils.isNotEmpty(validateMsg)) {
                    messages.add(validateMsg);
                }
                TmsCustomerSaveReq req = fromImportVo(vo);
                if (StringUtils.isEmpty(req.getCustomerLevel())) {
                    req.setCustomerLevel("normal");
                }
                if (StringUtils.isEmpty(req.getStatus())) {
                    req.setStatus("0");
                }
                if (StringUtils.isEmpty(req.getSettleType())) {
                    req.setSettleType("monthly");
                }
                if (StringUtils.isEmpty(req.getInvoiceTitle()) && StringUtils.isNotEmpty(req.getCustomerName())) {
                    req.setInvoiceTitle(req.getCustomerName());
                }
                String customerName = req.getCustomerName();
                if (StringUtils.isNotEmpty(customerName)) {
                    if (pendingNames.contains(customerName)) {
                        messages.add("导入文件中客户名称重复");
                    } else if (!checkCustomerNameUnique(req)) {
                        messages.add("客户「" + customerName + "」已存在");
                    }
                }
                if (!messages.isEmpty()) {
                    errors.put(sheetRow, String.join("；", messages));
                    continue;
                }
                pendingNames.add(customerName);
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
            for (TmsCustomerSaveReq item : toInsert) {
                insertCustomer(item);
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
            throw new ServiceException("导入客户失败：" + e.getMessage());
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
            return "客户导入错误明细.xlsx";
        }
        int dot = originalName.lastIndexOf('.');
        String prefix = dot > 0 ? originalName.substring(0, dot) : originalName;
        return prefix + "_错误明细.xlsx";
    }

    private String generateCustomerNo() {
        String prefix = "KH" + new SimpleDateFormat("yyyyMMdd").format(new Date());
        String maxNo = customerMapper.selectMaxCustomerNoByPrefix(prefix);
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
    private static TmsCustomerSaveReq fromImportVo(TmsCustomerVo vo) {
        TmsCustomerSaveReq req = new TmsCustomerSaveReq();
        if (vo == null) {
            return req;
        }
        req.setCustomerName(vo.getCustomerName());
        req.setShortName(vo.getShortName());
        req.setIndustry(vo.getIndustry());
        req.setCustomerLevel(vo.getCustomerLevel());
        req.setStatus(vo.getStatus());
        req.setCustomerSource(vo.getCustomerSource());
        req.setSalesUserName(vo.getSalesUserName());
        req.setContactName(vo.getContactName());
        req.setContactPhone(vo.getContactPhone());
        req.setSettleType(vo.getSettleType());
        req.setCreditLimit(vo.getCreditLimit());
        req.setPayPeriodDays(vo.getPayPeriodDays());
        req.setInvoiceTitle(vo.getInvoiceTitle());
        req.setTaxNo(vo.getTaxNo());
        return req;
    }
}
