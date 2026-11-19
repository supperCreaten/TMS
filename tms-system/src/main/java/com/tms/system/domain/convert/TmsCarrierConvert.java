package com.tms.system.domain.convert;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import com.tms.system.domain.TmsCarrier;
import com.tms.system.domain.dto.TmsCarrierQuery;
import com.tms.system.domain.dto.TmsCarrierSaveReq;
import com.tms.system.domain.vo.TmsCarrierVo;

public final class TmsCarrierConvert {
    private TmsCarrierConvert() {
    }

    public static TmsCarrier toEntity(TmsCarrierQuery query) {
        TmsCarrier entity = new TmsCarrier();
        if (query == null) {
            return entity;
        }
        entity.setContractSigned(query.getContractSigned());
        entity.setStatus(query.getStatus());
        entity.setCarrierType(query.getCarrierType());
        entity.setCarrierLevel(query.getCarrierLevel());
        entity.setKeyword(query.getKeyword());
        entity.setBeginCreateTime(query.getBeginCreateTime());
        entity.setEndCreateTime(query.getEndCreateTime());
        return entity;
    }

    public static TmsCarrier toEntity(TmsCarrierSaveReq req) {
        TmsCarrier entity = new TmsCarrier();
        if (req == null) {
            return entity;
        }
        entity.setCarrierId(req.getCarrierId());
        entity.setCarrierName(req.getCarrierName());
        entity.setShortName(req.getShortName());
        entity.setLegalPerson(req.getLegalPerson());
        entity.setCarrierType(req.getCarrierType());
        entity.setCarrierLevel(req.getCarrierLevel());
        entity.setTaxRegNo(req.getTaxRegNo());
        entity.setRegion(req.getRegion());
        entity.setCompanyAddress(req.getCompanyAddress());
        entity.setCompanyEmail(req.getCompanyEmail());
        entity.setStatus(req.getStatus());
        entity.setBusinessLicenseNo(req.getBusinessLicenseNo());
        entity.setBusinessLicenseUrl(req.getBusinessLicenseUrl());
        entity.setRoadPermitNo(req.getRoadPermitNo());
        entity.setRoadPermitUrl(req.getRoadPermitUrl());
        entity.setContactName(req.getContactName());
        entity.setContactPhone(req.getContactPhone());
        entity.setContactDept(req.getContactDept());
        entity.setContactTitle(req.getContactTitle());
        entity.setContactEmail(req.getContactEmail());
        entity.setContactWechat(req.getContactWechat());
        entity.setSettleType(req.getSettleType());
        entity.setInvoiceTitle(req.getInvoiceTitle());
        entity.setTaxNo(req.getTaxNo());
        entity.setBankName(req.getBankName());
        entity.setBankAccountName(req.getBankAccountName());
        entity.setBankAccountNo(req.getBankAccountNo());
        entity.setContractSigned(req.getContractSigned());
        entity.setContractFileUrl(req.getContractFileUrl());
        entity.setContractExpireDate(req.getContractExpireDate());
        entity.setRemark(req.getRemark());
        return entity;
    }

    public static TmsCarrierVo toVo(TmsCarrier entity) {
        if (entity == null) {
            return null;
        }
        TmsCarrierVo vo = new TmsCarrierVo();
        vo.setCarrierId(entity.getCarrierId());
        vo.setCarrierNo(entity.getCarrierNo());
        vo.setCarrierName(entity.getCarrierName());
        vo.setShortName(entity.getShortName());
        vo.setLegalPerson(entity.getLegalPerson());
        vo.setCarrierType(entity.getCarrierType());
        vo.setCarrierLevel(entity.getCarrierLevel());
        vo.setTaxRegNo(entity.getTaxRegNo());
        vo.setRegion(entity.getRegion());
        vo.setCompanyAddress(entity.getCompanyAddress());
        vo.setCompanyEmail(entity.getCompanyEmail());
        vo.setStatus(entity.getStatus());
        vo.setBusinessLicenseNo(entity.getBusinessLicenseNo());
        vo.setBusinessLicenseUrl(entity.getBusinessLicenseUrl());
        vo.setRoadPermitNo(entity.getRoadPermitNo());
        vo.setRoadPermitUrl(entity.getRoadPermitUrl());
        vo.setContactName(entity.getContactName());
        vo.setContactPhone(entity.getContactPhone());
        vo.setContactDept(entity.getContactDept());
        vo.setContactTitle(entity.getContactTitle());
        vo.setContactEmail(entity.getContactEmail());
        vo.setContactWechat(entity.getContactWechat());
        vo.setSettleType(entity.getSettleType());
        vo.setInvoiceTitle(entity.getInvoiceTitle());
        vo.setTaxNo(entity.getTaxNo());
        vo.setBankName(entity.getBankName());
        vo.setBankAccountName(entity.getBankAccountName());
        vo.setBankAccountNo(entity.getBankAccountNo());
        vo.setContractSigned(entity.getContractSigned());
        vo.setContractFileUrl(entity.getContractFileUrl());
        vo.setContractExpireDate(entity.getContractExpireDate());
        vo.setDriverCount(0);
        vo.setVehicleCount(0);
        vo.setRemark(entity.getRemark());
        vo.setCreateBy(entity.getCreateBy());
        vo.setCreateTime(entity.getCreateTime());
        return vo;
    }

    public static List<TmsCarrierVo> toVoList(List<TmsCarrier> list) {
        if (list == null || list.isEmpty()) {
            return Collections.emptyList();
        }
        List<TmsCarrierVo> result = new ArrayList<>(list.size());
        for (TmsCarrier item : list) {
            result.add(toVo(item));
        }
        return result;
    }

    public static TmsCarrier fromImportVo(TmsCarrierVo vo) {
        TmsCarrier entity = new TmsCarrier();
        if (vo == null) {
            return entity;
        }
        entity.setCarrierName(vo.getCarrierName());
        entity.setShortName(vo.getShortName());
        entity.setLegalPerson(vo.getLegalPerson());
        entity.setCarrierType(vo.getCarrierType());
        entity.setCarrierLevel(vo.getCarrierLevel());
        entity.setTaxRegNo(vo.getTaxRegNo());
        entity.setCompanyAddress(vo.getCompanyAddress());
        entity.setCompanyEmail(vo.getCompanyEmail());
        entity.setStatus(vo.getStatus());
        entity.setContactName(vo.getContactName());
        entity.setContactPhone(vo.getContactPhone());
        entity.setSettleType(vo.getSettleType());
        entity.setInvoiceTitle(vo.getInvoiceTitle());
        entity.setTaxNo(vo.getTaxNo());
        entity.setContractSigned(vo.getContractSigned());
        entity.setContractExpireDate(vo.getContractExpireDate());
        entity.setRemark(vo.getRemark());
        return entity;
    }
}
