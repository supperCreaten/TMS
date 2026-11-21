package com.tms.system.controller;

import com.tms.common.annotation.Log;
import com.tms.common.core.controller.BaseController;
import com.tms.common.core.domain.AjaxResult;
import com.tms.common.enums.BusinessType;
import com.tms.system.domain.dto.TmsOrderSaveReq;
import com.tms.system.service.ITmsOrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "订单管理")
@RequestMapping("/order")
public class TmsOrderController extends BaseController {
    @Autowired
    private ITmsOrderService orderService;

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
}
