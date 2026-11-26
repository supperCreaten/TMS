package com.tms.system.order.controller;

import com.github.pagehelper.PageInfo;
import com.tms.common.annotation.Log;
import com.tms.common.core.controller.BaseController;
import com.tms.common.core.domain.AjaxResult;
import com.tms.common.enums.BusinessType;
import com.tms.system.order.domain.dto.TmsOrderQuery;
import com.tms.system.order.domain.dto.TmsOrderSaveReq;
import com.tms.system.order.domain.vo.TmsOrderVo;
import com.tms.system.order.service.ITmsOrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 订单管理
 */
@RestController
@Tag(name = "订单管理")
@RequestMapping("/order")
public class TmsOrderController extends BaseController {
    @Autowired
    private ITmsOrderService orderService;

    @Operation(summary = "查询订单分页列表")
    @PostMapping("/pageQuery")
    public AjaxResult pageQuery(@RequestBody TmsOrderQuery query) {
        startPage();
        List<TmsOrderVo> list = orderService.selectPageQuery(query);
        PageInfo<TmsOrderVo> pageInfo = new PageInfo<>(list);
        return getDataTable(list, pageInfo);
    }

    /**
     * 新增订单（含货物明细）
     */
    @Log(title = "订单管理", businessType = BusinessType.INSERT)
    @Operation(summary = "新增订单")
    @PostMapping("/insert")
    public AjaxResult insert(@Validated @RequestBody TmsOrderSaveReq tmsOrderSaveReq) {
        try {
            orderService.insertOrder(tmsOrderSaveReq);
            return toAjax(true);
        } catch (Exception e) {
            throw new SecurityException(e);
        }
    }

    /**
     * 修改订单（含货物明细）
     */
    @Log(title = "订单管理", businessType = BusinessType.UPDATE)
    @Operation(summary = "修改订单")
    @PostMapping("/update")
    public AjaxResult update(@Validated @RequestBody TmsOrderSaveReq tmsOrderSaveReq) {
        try {
            orderService.updateOrder(tmsOrderSaveReq);
            return toAjax(true);
        } catch (Exception e) {
            throw new SecurityException(e);
        }
    }

    @Operation(summary = "查询订单分页列表")
    @PostMapping("/queryById/{orederId}")
    public AjaxResult  queryById(@PathVariable("orederId") Long orederId) {
        return success(orderService.selectOrderById(orederId));
    }
}
