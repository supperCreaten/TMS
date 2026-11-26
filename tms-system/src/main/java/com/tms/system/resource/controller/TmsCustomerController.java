package com.tms.system.resource.controller;

import com.github.pagehelper.PageInfo;
import com.tms.common.annotation.Log;
import com.tms.common.core.controller.BaseController;
import com.tms.common.core.domain.AjaxResult;
import com.tms.common.enums.BusinessType;
import com.tms.common.utils.poi.ExcelImportCommitResult;
import com.tms.common.utils.poi.ExcelUtil;
import com.tms.system.resource.domain.dto.TmsCustomerQuery;
import com.tms.system.resource.domain.dto.TmsCustomerSaveReq;
import com.tms.system.resource.domain.vo.TmsCustomerVo;
import com.tms.system.resource.service.ITmsCustomerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * 客户管理（对齐 /api/customer）
 */
@RestController
@Tag(name = "客户管理")
@RequestMapping("/customer")
public class TmsCustomerController extends BaseController {
    @Autowired
    private ITmsCustomerService customerService;

    /**
     * 分页查询
     */
    @PreAuthorize("@ss.hasPermi('resource:customer:list')")
    @Operation(summary = "客户分页列表")
    @PostMapping("/pageQuery")
    public AjaxResult pageQuery(@RequestBody(required = false) TmsCustomerQuery query) {
        startPage();
        List<TmsCustomerVo> list = customerService.selectCustomerList(query);
        PageInfo<TmsCustomerVo> pageInfo = new PageInfo<>(list);
        return getDataTable(list, pageInfo);
    }

    /**
     * 全量列表查询
     */
    @PreAuthorize("@ss.hasPermi('resource:customer:list')")
    @Operation(summary = "客户全量列表")
    @PostMapping("/allQuery")
    public AjaxResult allQuery() {
        return success(customerService.selectCustomerList(new TmsCustomerQuery()));
    }

    /**
     * 新增
     */
    @PreAuthorize("@ss.hasPermi('resource:customer:edit')")
    @Log(title = "客户管理", businessType = BusinessType.INSERT)
    @Operation(summary = "新增客户")
    @PostMapping("/insert")
    public AjaxResult insert(@Validated @RequestBody TmsCustomerSaveReq req) {
        if (!customerService.checkCustomerNameUnique(req)) {
            return error("新增客户'" + req.getCustomerName() + "'失败，客户名称已存在");
        }
        return toAjax(customerService.insertCustomer(req));
    }

    /**
     * 修改
     */
    @PreAuthorize("@ss.hasPermi('resource:customer:edit')")
    @Log(title = "客户管理", businessType = BusinessType.UPDATE, bizId = "#req.customerId")
    @Operation(summary = "修改客户")
    @PostMapping("/update")
    public AjaxResult update(@Validated @RequestBody TmsCustomerSaveReq req) {
        if (req.getCustomerId() == null) {
            return error("客户ID不能为空");
        }
        if (!customerService.checkCustomerNameUnique(req)) {
            return error("修改客户'" + req.getCustomerName() + "'失败，客户名称已存在");
        }
        return toAjax(customerService.updateCustomer(req));
    }

    /**
     * 根据ID查询
     */
    @PreAuthorize("@ss.hasPermi('resource:customer:query')")
    @Operation(summary = "客户详情")
    @PostMapping("/queryById/{id}")
    public AjaxResult queryById(@PathVariable("id") Long id) {
        return success(customerService.selectCustomerById(id));
    }

    /**
     * 删除
     */
    @PreAuthorize("@ss.hasPermi('resource:customer:remove')")
    @Log(title = "客户管理", businessType = BusinessType.DELETE)
    @Operation(summary = "删除客户")
    @PostMapping("/delete")
    public AjaxResult delete(@RequestBody Long[] ids) {
        return toAjax(customerService.deleteCustomerByIds(ids));
    }

    /**
     * 导出
     */
    @PreAuthorize("@ss.hasPermi('resource:customer:export')")
    @Log(title = "客户管理", businessType = BusinessType.EXPORT)
    @Operation(summary = "导出客户")
    @PostMapping("/export")
    public void export(HttpServletResponse response, @RequestBody(required = false) TmsCustomerQuery query) {
        List<TmsCustomerVo> list = customerService.selectCustomerList(query);
        ExcelUtil<TmsCustomerVo> util = new ExcelUtil<>(TmsCustomerVo.class);
        util.exportExcel(response, list, "客户数据");
    }

    /**
     * 下载导入模板
     */
    @PreAuthorize("@ss.hasPermi('resource:customer:import')")
    @Operation(summary = "导入模板")
    @PostMapping("/importTemplate")
    public void importTemplate(HttpServletResponse response) {
        ExcelUtil<TmsCustomerVo> util = new ExcelUtil<>(TmsCustomerVo.class);
        util.importTemplateExcel(response, "客户数据");
    }

    /**
     * 导入数据
     */
    @PreAuthorize("@ss.hasPermi('resource:customer:import')")
    @Log(title = "客户管理", businessType = BusinessType.IMPORT)
    @Operation(summary = "导入客户")
    @PostMapping("/import")
    public AjaxResult importData(
            MultipartFile file,
            @RequestParam(value = "partialCommit", defaultValue = "false") boolean partialCommit) {
        ExcelImportCommitResult result = customerService.importCustomer(file, partialCommit, getUsername());
        return success(result);
    }
}

