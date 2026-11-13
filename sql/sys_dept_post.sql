-- 部门 / 岗位建表及菜单权限（MySQL）
-- 执行前请确认 system 目录菜单已存在；下方菜单插入会按 menu_path='system' 查找父级

-- ----------------------------
-- 1. 部门表
-- ----------------------------
CREATE TABLE IF NOT EXISTS sys_dept (
  dept_id      BIGINT(20)      NOT NULL AUTO_INCREMENT COMMENT '部门id',
  parent_id    BIGINT(20)      DEFAULT 0               COMMENT '父部门id',
  ancestors    VARCHAR(500)    DEFAULT ''              COMMENT '祖级列表',
  dept_name    VARCHAR(50)     DEFAULT ''              COMMENT '部门名称',
  order_num    INT(4)          DEFAULT 0               COMMENT '显示顺序',
  leader       VARCHAR(50)     DEFAULT NULL            COMMENT '负责人',
  phone        VARCHAR(20)     DEFAULT NULL            COMMENT '联系电话',
  email        VARCHAR(100)    DEFAULT NULL            COMMENT '邮箱',
  status       CHAR(1)         DEFAULT '0'             COMMENT '部门状态（0正常 1停用）',
  is_del       CHAR(1)         DEFAULT '0'             COMMENT '删除标志（0存在 1删除）',
  create_by    VARCHAR(64)     DEFAULT ''              COMMENT '创建者',
  create_time  DATETIME                                COMMENT '创建时间',
  update_by    VARCHAR(64)     DEFAULT ''              COMMENT '更新者',
  update_time  DATETIME                                COMMENT '更新时间',
  remark       VARCHAR(500)    DEFAULT NULL            COMMENT '备注',
  PRIMARY KEY (dept_id)
) ENGINE=InnoDB COMMENT='部门表';

-- 根部门示例（可按需调整）
INSERT INTO sys_dept (dept_id, parent_id, ancestors, dept_name, order_num, leader, phone, email, status, is_del, create_by, create_time, update_by, update_time, remark)
SELECT 100, 0, '0', '总公司', 0, NULL, NULL, NULL, '0', '0', 'admin', NOW(), 'admin', NOW(), NULL
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM sys_dept WHERE dept_id = 100);

-- ----------------------------
-- 2. 岗位表
-- ----------------------------
CREATE TABLE IF NOT EXISTS sys_post (
  post_id      BIGINT(20)      NOT NULL AUTO_INCREMENT COMMENT '岗位ID',
  post_code    VARCHAR(64)     NOT NULL                COMMENT '岗位编码',
  post_name    VARCHAR(50)     NOT NULL                COMMENT '岗位名称',
  dept_id      INT             NOT NULL DEFAULT 0      COMMENT '部门ID',
  post_sort    INT(4)          NOT NULL                COMMENT '显示顺序',
  status       CHAR(1)         NOT NULL                COMMENT '状态（0正常 1停用）',
  is_del       CHAR(1)         DEFAULT '0'             COMMENT '删除标志（0存在 1删除）',
  create_by    VARCHAR(64)     DEFAULT ''              COMMENT '创建者',
  create_time  DATETIME                                COMMENT '创建时间',
  update_by    VARCHAR(64)     DEFAULT ''              COMMENT '更新者',
  update_time  DATETIME                                COMMENT '更新时间',
  remark       VARCHAR(500)    DEFAULT NULL            COMMENT '备注',
  PRIMARY KEY (post_id)
) ENGINE=InnoDB COMMENT='岗位信息表';

-- ----------------------------
-- 3. 菜单：部门管理 / 岗位管理（挂到 path=system 的目录下）
-- ----------------------------
SET @systemParentId := (SELECT menu_id FROM sys_menu WHERE menu_path = 'system' AND is_del = '0' AND menu_type = '0' LIMIT 1);

INSERT INTO sys_menu (menu_name, menu_path, parent_id, menu_type, order_num, hidden, keep_alive, status, is_del, perms, icon, create_by, update_by, create_time, update_time)
SELECT '部门管理', 'system/dept', @systemParentId, '1', 4, '0', 1, '0', '0', 'system:dept:list', 'dept', 'admin', 'admin', NOW(), NOW()
FROM DUAL
WHERE @systemParentId IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM sys_menu WHERE menu_path = 'system/dept' AND is_del = '0');

INSERT INTO sys_menu (menu_name, menu_path, parent_id, menu_type, order_num, hidden, keep_alive, status, is_del, perms, icon, create_by, update_by, create_time, update_time)
SELECT '岗位管理', 'system/post', @systemParentId, '1', 5, '0', 1, '0', '0', 'system:post:list', 'post', 'admin', 'admin', NOW(), NOW()
FROM DUAL
WHERE @systemParentId IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM sys_menu WHERE menu_path = 'system/post' AND is_del = '0');

SET @deptMenuId := (SELECT menu_id FROM sys_menu WHERE menu_path = 'system/dept' AND is_del = '0' LIMIT 1);
SET @postMenuId := (SELECT menu_id FROM sys_menu WHERE menu_path = 'system/post' AND is_del = '0' LIMIT 1);

-- 部门按钮权限
INSERT INTO sys_menu (menu_name, menu_path, parent_id, menu_type, order_num, hidden, keep_alive, status, is_del, perms, icon, create_by, update_by, create_time, update_time)
SELECT '部门查询', '', @deptMenuId, '2', 1, '0', 0, '0', '0', 'system:dept:query', NULL, 'admin', 'admin', NOW(), NOW()
FROM DUAL WHERE @deptMenuId IS NOT NULL AND NOT EXISTS (SELECT 1 FROM sys_menu WHERE perms = 'system:dept:query' AND is_del = '0');

INSERT INTO sys_menu (menu_name, menu_path, parent_id, menu_type, order_num, hidden, keep_alive, status, is_del, perms, icon, create_by, update_by, create_time, update_time)
SELECT '部门新增', '', @deptMenuId, '2', 2, '0', 0, '0', '0', 'system:dept:edit', NULL, 'admin', 'admin', NOW(), NOW()
FROM DUAL WHERE @deptMenuId IS NOT NULL AND NOT EXISTS (SELECT 1 FROM sys_menu WHERE perms = 'system:dept:edit' AND is_del = '0');

INSERT INTO sys_menu (menu_name, menu_path, parent_id, menu_type, order_num, hidden, keep_alive, status, is_del, perms, icon, create_by, update_by, create_time, update_time)
SELECT '部门删除', '', @deptMenuId, '2', 3, '0', 0, '0', '0', 'system:dept:remove', NULL, 'admin', 'admin', NOW(), NOW()
FROM DUAL WHERE @deptMenuId IS NOT NULL AND NOT EXISTS (SELECT 1 FROM sys_menu WHERE perms = 'system:dept:remove' AND is_del = '0');

-- 岗位按钮权限
INSERT INTO sys_menu (menu_name, menu_path, parent_id, menu_type, order_num, hidden, keep_alive, status, is_del, perms, icon, create_by, update_by, create_time, update_time)
SELECT '岗位查询', '', @postMenuId, '2', 1, '0', 0, '0', '0', 'system:post:query', NULL, 'admin', 'admin', NOW(), NOW()
FROM DUAL WHERE @postMenuId IS NOT NULL AND NOT EXISTS (SELECT 1 FROM sys_menu WHERE perms = 'system:post:query' AND is_del = '0');

INSERT INTO sys_menu (menu_name, menu_path, parent_id, menu_type, order_num, hidden, keep_alive, status, is_del, perms, icon, create_by, update_by, create_time, update_time)
SELECT '岗位新增', '', @postMenuId, '2', 2, '0', 0, '0', '0', 'system:post:edit', NULL, 'admin', 'admin', NOW(), NOW()
FROM DUAL WHERE @postMenuId IS NOT NULL AND NOT EXISTS (SELECT 1 FROM sys_menu WHERE perms = 'system:post:edit' AND is_del = '0');

INSERT INTO sys_menu (menu_name, menu_path, parent_id, menu_type, order_num, hidden, keep_alive, status, is_del, perms, icon, create_by, update_by, create_time, update_time)
SELECT '岗位删除', '', @postMenuId, '2', 3, '0', 0, '0', '0', 'system:post:remove', NULL, 'admin', 'admin', NOW(), NOW()
FROM DUAL WHERE @postMenuId IS NOT NULL AND NOT EXISTS (SELECT 1 FROM sys_menu WHERE perms = 'system:post:remove' AND is_del = '0');
