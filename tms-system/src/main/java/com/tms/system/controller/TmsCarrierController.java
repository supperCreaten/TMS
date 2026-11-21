package com.tms.system.controller;

import java.util.List;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.github.pagehelper.PageInfo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import com.tms.common.annotation.Log;
import com.tms.common.core.controller.BaseController;
import com.tms.common.core.domain.AjaxResult;
import com.tms.common.enums.BusinessType;
import com.tms.common.utils.poi.ExcelImportCommitResult;
import com.tms.common.utils.poi.ExcelUtil;
import com.tms.system.domain.dto.TmsCarrierQuery;
import com.tms.system.domain.dto.TmsCarrierSaveReq;
import com.tms.system.domain.vo.TmsCarrierVo;
import com.tms.system.service.ITmsCarrierService;

@RestController
@Tag(name = "承运商管理")
@RequestMapping("/carrier")
public class TmsCarrierController extends BaseController {
    @Autowired
    private ITmsCarrierService carrierService;

    @PreAuthorize("@ss.hasPermi('resource:carrier:list')")
    @Operation(summary = "承运商分页列表")
    @PostMapping("/pageQuery")
    public AjaxResult pageQuery(@RequestBody(required = false) TmsCarrierQuery query) {
        startPage();
        List<TmsCarrierVo> list = carrierService.selectCarrierList(query);
        PageInfo<TmsCarrierVo> pageInfo = new PageInfo<>(list);
        return getDataTable(list, pageInfo);
    }

    @PreAuthorize("@ss.hasPermi('resource:carrier:edit')")
    @Log(title = "承运商管理", businessType = BusinessType.INSERT)
    @Operation(summary = "新增承运商")
    @PostMapping("/insert")
    public AjaxResult insert(@Validated @RequestBody TmsCarrierSaveReq req) {
        if (!carrierService.checkCarrierNameUnique(req)) {
            return error("新增承运商'" + req.getCarrierName() + "'失败，名称已存在");
        }
        return toAjax(carrierService.insertCarrier(req));
    }

    @PreAuthorize("@ss.hasPermi('resource:carrier:edit')")
    @Log(title = "承运商管理", businessType = BusinessType.UPDATE, bizId = "#req.carrierId")
    @Operation(summary = "修改承运商")
    @PostMapping("/update")
    public AjaxResult update(@Validated @RequestBody TmsCarrierSaveReq req) {
        if (req.getCarrierId() == null) {
            return error("承运商ID不能为空");
        }
        if (!carrierService.checkCarrierNameUnique(req)) {
            return error("修改承运商'" + req.getCarrierName() + "'失败，名称已存在");
        }
        return toAjax(carrierService.updateCarrier(req));
    }

    @PreAuthorize("@ss.hasPermi('resource:carrier:query')")
    @Operation(summary = "承运商详情")
    @PostMapping("/queryById/{id}")
    public AjaxResult queryById(@PathVariable("id") Long id) {
        return success(carrierService.selectCarrierById(id));
    }

    @PreAuthorize("@ss.hasPermi('resource:carrier:remove')")
    @Log(title = "承运商管理", businessType = BusinessType.DELETE)
    @Operation(summary = "删除承运商")
    @PostMapping("/delete")
    public AjaxResult delete(@RequestBody Long[] ids) {
        return toAjax(carrierService.deleteCarrierByIds(ids));
    }

    @PreAuthorize("@ss.hasPermi('resource:carrier:export')")
    @Log(title = "承运商管理", businessType = BusinessType.EXPORT)
    @Operation(summary = "导出承运商")
    @PostMapping("/export")
    public void export(HttpServletResponse response, @RequestBody(required = false) TmsCarrierQuery query) {
        List<TmsCarrierVo> list = carrierService.selectCarrierList(query);
        ExcelUtil<TmsCarrierVo> util = new ExcelUtil<>(TmsCarrierVo.class);
        util.exportExcel(response, list, "承运商数据");
    }

    @PreAuthorize("@ss.hasPermi('resource:carrier:import')")
    @Operation(summary = "导入模板")
    @PostMapping("/importTemplate")
    public void importTemplate(HttpServletResponse response) {
        ExcelUtil<TmsCarrierVo> util = new ExcelUtil<>(TmsCarrierVo.class);
        util.importTemplateExcel(response, "承运商数据");
    }

    @PreAuthorize("@ss.hasPermi('resource:carrier:import')")
    @Log(title = "承运商管理", businessType = BusinessType.IMPORT)
    @Operation(summary = "导入承运商")
    @PostMapping("/import")
    public AjaxResult importData(
            MultipartFile file,
            @RequestParam(value = "partialCommit", defaultValue = "false") boolean partialCommit) {
        ExcelImportCommitResult result = carrierService.importCarrier(file, partialCommit, getUsername());
        return success(result);
    }
}
