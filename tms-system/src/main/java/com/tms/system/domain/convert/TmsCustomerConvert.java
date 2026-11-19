package com.tms.system.domain.convert;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import com.tms.system.domain.TmsCustomer;
import com.tms.system.domain.dto.TmsCustomerQuery;
import com.tms.system.domain.dto.TmsCustomerSaveReq;
import com.tms.system.domain.vo.TmsCustomerVo;

/**
 * 客户 DTO / Entity / VO 转换
 */
public final class TmsCustomerConvert {
    private TmsCustomerConvert() {
    }

    public static TmsCustomer toEntity(TmsCustomerQuery query) {
        TmsCustomer entity = new TmsCustomer();
        if (query == null) {
            return entity;
        }
        entity.setCustomerLevel(query.getCustomerLevel());
        entity.setStatus(query.getStatus());
        entity.setSettleType(query.getSettleType());
        entity.setKeyword(query.getKeyword());
        entity.setBeginCreateTime(query.getBeginCreateTime());
        entity.setEndCreateTime(query.getEndCreateTime());
        return entity;
    }

    public static TmsCustomer toEntity(TmsCustomerSaveReq req) {
        TmsCustomer entity = new TmsCustomer();
        if (req == null) {
            return entity;
        }
        entity.setCustomerId(req.getCustomerId());
        entity.setCustomerName(req.getCustomerName());
        entity.setShortName(req.getShortName());
        entity.setIndustry(req.getIndustry());
        entity.setCustomerLevel(req.getCustomerLevel());
        entity.setCustomerTags(req.getCustomerTags());
        entity.setRegion(req.getRegion());
        entity.setCompanyAddress(req.getCompanyAddress());
        entity.setStatus(req.getStatus());
        entity.setCustomerSource(req.getCustomerSource());
        entity.setSalesUserName(req.getSalesUserName());
        entity.setBusinessLicenseNo(req.getBusinessLicenseNo());
        entity.setBusinessLicenseUrl(req.getBusinessLicenseUrl());
        entity.setContactName(req.getContactName());
        entity.setContactPhone(req.getContactPhone());
        entity.setContactDept(req.getContactDept());
        entity.setContactTitle(req.getContactTitle());
        entity.setContactEmail(req.getContactEmail());
        entity.setContactWechat(req.getContactWechat());
        entity.setSettleType(req.getSettleType());
        entity.setCreditLimit(req.getCreditLimit());
        entity.setPayPeriodDays(req.getPayPeriodDays());
        entity.setInvoiceTitle(req.getInvoiceTitle());
        entity.setTaxNo(req.getTaxNo());
        entity.setBankName(req.getBankName());
        entity.setBankAccountName(req.getBankAccountName());
        entity.setBankAccountNo(req.getBankAccountNo());
        entity.setRemark(req.getRemark());
        return entity;
    }

    public static TmsCustomerVo toVo(TmsCustomer entity) {
        if (entity == null) {
            return null;
        }
        TmsCustomerVo vo = new TmsCustomerVo();
        vo.setCustomerId(entity.getCustomerId());
        vo.setCustomerNo(entity.getCustomerNo());
        vo.setCustomerName(entity.getCustomerName());
        vo.setShortName(entity.getShortName());
        vo.setIndustry(entity.getIndustry());
        vo.setCustomerLevel(entity.getCustomerLevel());
        vo.setCustomerTags(entity.getCustomerTags());
        vo.setRegion(entity.getRegion());
        vo.setCompanyAddress(entity.getCompanyAddress());
        vo.setStatus(entity.getStatus());
        vo.setCustomerSource(entity.getCustomerSource());
        vo.setSalesUserName(entity.getSalesUserName());
        vo.setBusinessLicenseNo(entity.getBusinessLicenseNo());
        vo.setBusinessLicenseUrl(entity.getBusinessLicenseUrl());
        vo.setContactName(entity.getContactName());
        vo.setContactPhone(entity.getContactPhone());
        vo.setContactDept(entity.getContactDept());
        vo.setContactTitle(entity.getContactTitle());
        vo.setContactEmail(entity.getContactEmail());
        vo.setContactWechat(entity.getContactWechat());
        vo.setSettleType(entity.getSettleType());
        vo.setCreditLimit(entity.getCreditLimit());
        vo.setPayPeriodDays(entity.getPayPeriodDays());
        vo.setInvoiceTitle(entity.getInvoiceTitle());
        vo.setTaxNo(entity.getTaxNo());
        vo.setBankName(entity.getBankName());
        vo.setBankAccountName(entity.getBankAccountName());
        vo.setBankAccountNo(entity.getBankAccountNo());
        vo.setRemark(entity.getRemark());
        vo.setCreateBy(entity.getCreateBy());
        vo.setCreateTime(entity.getCreateTime());
        return vo;
    }

    public static List<TmsCustomerVo> toVoList(List<TmsCustomer> list) {
        if (list == null || list.isEmpty()) {
            return Collections.emptyList();
        }
        List<TmsCustomerVo> result = new ArrayList<>(list.size());
        for (TmsCustomer item : list) {
            result.add(toVo(item));
        }
        return result;
    }

    public static TmsCustomer fromImportVo(TmsCustomerVo vo) {
        TmsCustomer entity = new TmsCustomer();
        if (vo == null) {
            return entity;
        }
        entity.setCustomerName(vo.getCustomerName());
        entity.setShortName(vo.getShortName());
        entity.setIndustry(vo.getIndustry());
        entity.setCustomerLevel(vo.getCustomerLevel());
        entity.setStatus(vo.getStatus());
        entity.setCustomerSource(vo.getCustomerSource());
        entity.setSalesUserName(vo.getSalesUserName());
        entity.setContactName(vo.getContactName());
        entity.setContactPhone(vo.getContactPhone());
        entity.setSettleType(vo.getSettleType());
        entity.setCreditLimit(vo.getCreditLimit());
        entity.setPayPeriodDays(vo.getPayPeriodDays());
        entity.setInvoiceTitle(vo.getInvoiceTitle());
        entity.setTaxNo(vo.getTaxNo());
        return entity;
    }
}
