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
import com.tms.system.domain.TmsCustomer;
import com.tms.system.domain.convert.TmsCustomerConvert;
import com.tms.system.domain.dto.TmsCustomerQuery;
import com.tms.system.domain.dto.TmsCustomerSaveReq;
import com.tms.system.domain.vo.TmsCustomerVo;
import com.tms.system.service.ITmsCustomerService;

/**
 * 客户管理（对齐 /api/customer）
 */
@RestController
@Tag(name = "客户管理")
@RequestMapping("/customer")
public class TmsCustomerController extends BaseController {
    @Autowired
    private ITmsCustomerService customerService;

    @PreAuthorize("@ss.hasPermi('resource:customer:list')")
    @Operation(summary = "客户分页列表")
    @PostMapping("/pageQuery")
    public AjaxResult pageQuery(@RequestBody(required = false) TmsCustomerQuery query) {
        startPage();
        List<TmsCustomer> list = customerService.selectCustomerList(TmsCustomerConvert.toEntity(query));
        PageInfo<TmsCustomer> pageInfo = new PageInfo<>(list);
        return getDataTable(TmsCustomerConvert.toVoList(list), pageInfo);
    }

    @PreAuthorize("@ss.hasPermi('resource:customer:edit')")
    @Log(title = "客户管理", businessType = BusinessType.INSERT)
    @Operation(summary = "新增客户")
    @PostMapping("/insert")
    public AjaxResult insert(@Validated @RequestBody TmsCustomerSaveReq req) {
        TmsCustomer customer = TmsCustomerConvert.toEntity(req);
        if (!customerService.checkCustomerNameUnique(customer)) {
            return error("新增客户'" + customer.getCustomerName() + "'失败，客户名称已存在");
        }
        return toAjax(customerService.insertCustomer(customer));
    }

    @PreAuthorize("@ss.hasPermi('resource:customer:edit')")
    @Log(title = "客户管理", businessType = BusinessType.UPDATE, bizId = "#req.customerId")
    @Operation(summary = "修改客户")
    @PostMapping("/update")
    public AjaxResult update(@Validated @RequestBody TmsCustomerSaveReq req) {
        if (req.getCustomerId() == null) {
            return error("客户ID不能为空");
        }
        TmsCustomer customer = TmsCustomerConvert.toEntity(req);
        if (!customerService.checkCustomerNameUnique(customer)) {
            return error("修改客户'" + customer.getCustomerName() + "'失败，客户名称已存在");
        }
        return toAjax(customerService.updateCustomer(customer));
    }

    @PreAuthorize("@ss.hasPermi('resource:customer:query')")
    @Operation(summary = "客户详情")
    @PostMapping("/queryById/{id}")
    public AjaxResult queryById(@PathVariable("id") Long id) {
        return success(TmsCustomerConvert.toVo(customerService.selectCustomerById(id)));
    }

    @PreAuthorize("@ss.hasPermi('resource:customer:remove')")
    @Log(title = "客户管理", businessType = BusinessType.DELETE)
    @Operation(summary = "删除客户")
    @PostMapping("/delete")
    public AjaxResult delete(@RequestBody Long[] ids) {
        return toAjax(customerService.deleteCustomerByIds(ids));
    }

    @PreAuthorize("@ss.hasPermi('resource:customer:export')")
    @Log(title = "客户管理", businessType = BusinessType.EXPORT)
    @Operation(summary = "导出客户")
    @PostMapping("/export")
    public void export(HttpServletResponse response, @RequestBody(required = false) TmsCustomerQuery query) {
        List<TmsCustomer> list = customerService.selectCustomerList(TmsCustomerConvert.toEntity(query));
        ExcelUtil<TmsCustomerVo> util = new ExcelUtil<>(TmsCustomerVo.class);
        util.exportExcel(response, TmsCustomerConvert.toVoList(list), "客户数据");
    }

    @PreAuthorize("@ss.hasPermi('resource:customer:import')")
    @Operation(summary = "导入模板")
    @PostMapping("/importTemplate")
    public void importTemplate(HttpServletResponse response) {
        ExcelUtil<TmsCustomerVo> util = new ExcelUtil<>(TmsCustomerVo.class);
        util.importTemplateExcel(response, "客户数据");
    }

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
