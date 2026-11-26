package com.tms.system.order.domain.enums;

/**
 * 订单状态
 *
 * @author tms
 */
public enum OrderStatus {
    /** 待接单 */
    PENDING_ACCEPT("pending_accept", "待接单"),
    /** 已接单：公司已接，尚未绑定司机 */
    ACCEPTED("accepted", "已接单"),
    /** 待发车：司机和运单已确定，尚未发车 */
    PENDING_DEPART("pending_depart", "待发车"),
    /** 运输中 */
    IN_TRANSIT("in_transit", "运输中"),
    /** 已签收 */
    SIGNED("signed", "已签收"),
    /** 已完成 */
    COMPLETED("completed", "已完成"),
    /** 已拒绝 */
    REJECTED("rejected", "已拒绝"),
    /** 已取消 */
    CANCELED("canceled", "已取消"),
    /** 异常 */
    EXCEPTION("exception", "异常");

    private final String code;
    private final String info;

    OrderStatus(String code, String info) {
        this.code = code;
        this.info = info;
    }

    /** 状态码 */
    public String getCode() {
        return code;
    }

    /** 状态中文 */
    public String getInfo() {
        return info;
    }

    /**
     * 按状态码解析枚举，未知码返回 null
     */
    public static OrderStatus fromCode(String code) {
        if (code == null || code.isEmpty()) {
            return null;
        }
        for (OrderStatus status : values()) {
            if (status.code.equals(code)) {
                return status;
            }
        }
        return null;
    }

    /**
     * 按状态码取中文，未知码返回原值
     */
    public static String getInfoByCode(String code) {
        OrderStatus status = fromCode(code);
        return status != null ? status.info : code;
    }
}
