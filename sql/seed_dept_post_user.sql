-- 物流/运输公司：部门(1-3级共20个) + 每部门5岗位 + 用户绑定
-- 对齐真实库字段：sys_dept 无 remark；status/is_del 为 int
-- 用法：mysql -uroot -p -D tms --default-character-set=utf8mb4 < sql/seed_dept_post_user.sql

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- 0. 清理旧演示数据（保留用户账号）
-- ----------------------------
UPDATE sys_post SET is_del = 1, update_time = NOW() WHERE is_del = 0;
UPDATE sys_dept SET is_del = 1, update_time = NOW() WHERE is_del = 0;
DELETE FROM sys_post WHERE post_id BETWEEN 1000 AND 1999;
DELETE FROM sys_dept WHERE dept_id BETWEEN 100 AND 199;

-- ----------------------------
-- 1. 部门：1 根(一级) + 6 中心(二级) + 13 科室(三级) = 20
-- ----------------------------
INSERT INTO sys_dept
  (dept_id, parent_id, ancestors, dept_name, order_num, leader, phone, email, status, is_del, create_by, create_time, update_by, update_time)
VALUES
-- 一级
(100, '0',   '0',         '中铝物流集团',     0,  '张明',   '13800001000', 'hq@tms.com',         0, 0, 'admin', NOW(), 'admin', NOW()),

-- 二级
(101, '100', '0,100',     '综合管理中心',     1,  '李伟',   '13800001001', 'admin@tms.com',      0, 0, 'admin', NOW(), 'admin', NOW()),
(102, '100', '0,100',     '运营调度中心',     2,  '王芳',   '13800001002', 'ops@tms.com',        0, 0, 'admin', NOW(), 'admin', NOW()),
(103, '100', '0,100',     '仓储配送中心',     3,  '赵丽',   '13800001003', 'wh@tms.com',         0, 0, 'admin', NOW(), 'admin', NOW()),
(104, '100', '0,100',     '运输事业部',       4,  '陈浩',   '13800001004', 'transport@tms.com',  0, 0, 'admin', NOW(), 'admin', NOW()),
(105, '100', '0,100',     '客户服务中心',     5,  '周宇轩', '13800001005', 'cs@tms.com',         0, 0, 'admin', NOW(), 'admin', NOW()),
(106, '100', '0,100',     '安全质量部',       6,  '吴雨桐', '13800001006', 'sq@tms.com',         0, 0, 'admin', NOW(), 'admin', NOW()),

-- 三级
(111, '101', '0,100,101', '人力资源部',       1,  '郑浩然', '13800001101', 'hr@tms.com',         0, 0, 'admin', NOW(), 'admin', NOW()),
(112, '101', '0,100,101', '行政后勤部',       2,  '孙思涵', '13800001102', 'oa@tms.com',         0, 0, 'admin', NOW(), 'admin', NOW()),
(121, '102', '0,100,102', '干线调度部',       1,  '钱子墨', '13800001201', 'trunk@tms.com',      0, 0, 'admin', NOW(), 'admin', NOW()),
(122, '102', '0,100,102', '城配调度部',       2,  '冯欣怡', '13800001202', 'city@tms.com',       0, 0, 'admin', NOW(), 'admin', NOW()),
(123, '102', '0,100,102', '运力管理部',       3,  '陈俊杰', '13800001203', 'fleet@tms.com',      0, 0, 'admin', NOW(), 'admin', NOW()),
(131, '103', '0,100,103', '华北仓储部',       1,  '褚诗涵', '13800001301', 'wh-n@tms.com',       0, 0, 'admin', NOW(), 'admin', NOW()),
(132, '103', '0,100,103', '华东仓储部',       2,  '卫明轩', '13800001302', 'wh-e@tms.com',       0, 0, 'admin', NOW(), 'admin', NOW()),
(133, '103', '0,100,103', '库存计划部',       3,  '蒋梦瑶', '13800001303', 'inventory@tms.com',  0, 0, 'admin', NOW(), 'admin', NOW()),
(141, '104', '0,100,104', '公路运输部',       1,  '沈志强', '13800001401', 'road@tms.com',       0, 0, 'admin', NOW(), 'admin', NOW()),
(142, '104', '0,100,104', '铁路运输部',       2,  '韩雅婷', '13800001402', 'rail@tms.com',       0, 0, 'admin', NOW(), 'admin', NOW()),
(143, '104', '0,100,104', '多式联运部',       3,  '杨嘉豪', '13800001403', 'intermodal@tms.com', 0, 0, 'admin', NOW(), 'admin', NOW()),
(151, '105', '0,100,105', '大客户服务部',     1,  '朱静怡', '13800001501', 'ka@tms.com',         0, 0, 'admin', NOW(), 'admin', NOW()),
(152, '105', '0,100,105', '售后理赔部',       2,  '秦天佑', '13800001502', 'claim@tms.com',      0, 0, 'admin', NOW(), 'admin', NOW());

-- ----------------------------
-- 2. 岗位：每部门 5 个（共 100）
-- ----------------------------
INSERT INTO sys_post
  (post_id, post_code, post_name, dept_id, post_sort, status, remark, is_del, create_by, create_time, update_by, update_time)
VALUES
(1001, 'D100_GM',     '总经理',         100, 1, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1002, 'D100_DGM',    '副总经理',       100, 2, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1003, 'D100_SEC',    '总裁办秘书',     100, 3, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1004, 'D100_STRAT',  '战略专员',       100, 4, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1005, 'D100_AUDIT',  '内审专员',       100, 5, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),

(1011, 'D101_DIR',    '中心主任',       101, 1, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1012, 'D101_HRM',    '人事经理',       101, 2, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1013, 'D101_ADM',    '行政经理',       101, 3, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1014, 'D101_BUY',    '采购专员',       101, 4, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1015, 'D101_CLERK',  '综合文员',       101, 5, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),

(1021, 'D102_DIR',    '调度中心主任',   102, 1, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1022, 'D102_SM',     '调度经理',       102, 2, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1023, 'D102_PLAN',   '运力计划员',     102, 3, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1024, 'D102_MON',    '在途监控员',     102, 4, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1025, 'D102_DISP',   '值班调度员',     102, 5, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),

(1031, 'D103_DIR',    '仓储中心主任',   103, 1, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1032, 'D103_WM',     '仓储经理',       103, 2, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1033, 'D103_DM',     '配送经理',       103, 3, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1034, 'D103_INV',    '库存专员',       103, 4, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1035, 'D103_WH',     '仓管员',         103, 5, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),

(1041, 'D104_DIR',    '事业部总经理',   104, 1, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1042, 'D104_OPS',    '运输经理',       104, 2, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1043, 'D104_LINE',   '线路专员',       104, 3, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1044, 'D104_COST',   '运价核算员',     104, 4, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1045, 'D104_FLEET',  '车队主管',       104, 5, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),

(1051, 'D105_DIR',    '客服中心主任',   105, 1, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1052, 'D105_KA',     '大客户经理',     105, 2, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1053, 'D105_CS',     '客服主管',       105, 3, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1054, 'D105_CLAIM',  '理赔专员',       105, 4, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1055, 'D105_SEAT',   '客服坐席',       105, 5, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),

(1061, 'D106_DIR',    '安质部经理',     106, 1, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1062, 'D106_SAFE',   '安全主管',       106, 2, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1063, 'D106_QA',     '质量主管',       106, 3, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1064, 'D106_CHECK',  '安检专员',       106, 4, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1065, 'D106_TRAIN',  '安全培训员',     106, 5, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),

(1111, 'D111_MGR',    '人力资源经理',   111, 1, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1112, 'D111_REC',    '招聘专员',       111, 2, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1113, 'D111_SAL',    '薪酬专员',       111, 3, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1114, 'D111_TRAIN',  '培训专员',       111, 4, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1115, 'D111_REL',    '员工关系专员',   111, 5, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),

(1121, 'D112_MGR',    '行政经理',       112, 1, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1122, 'D112_ASSET',  '资产管理员',     112, 2, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1123, 'D112_MEET',   '会务专员',       112, 3, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1124, 'D112_DRV',    '司机班长',       112, 4, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1125, 'D112_LOG',    '后勤专员',       112, 5, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),

(1211, 'D121_MGR',    '干线调度经理',   121, 1, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1212, 'D121_LEAD',   '调度班长',       121, 2, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1213, 'D121_DISP',   '干线调度员',     121, 3, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1214, 'D121_TRACK',  '轨迹跟踪员',     121, 4, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1215, 'D121_DOC',    '运单录入员',     121, 5, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),

(1221, 'D122_MGR',    '城配调度经理',   122, 1, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1222, 'D122_LEAD',   '城配班长',       122, 2, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1223, 'D122_DISP',   '城配调度员',     122, 3, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1224, 'D122_ROUTE',  '线路优化员',     122, 4, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1225, 'D122_DOC',    '配送单员',       122, 5, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),

(1231, 'D123_MGR',    '运力经理',       123, 1, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1232, 'D123_CARR',   '承运商管理员',   123, 2, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1233, 'D123_VEH',    '车辆管理员',     123, 3, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1234, 'D123_DRV',    '驾驶员管理员',   123, 4, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1235, 'D123_EVAL',   '运力评估员',     123, 5, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),

(1311, 'D131_MGR',    '华北仓经理',     131, 1, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1312, 'D131_SUP',    '仓库主管',       131, 2, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1313, 'D131_IN',     '入库员',         131, 3, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1314, 'D131_OUT',    '出库员',         131, 4, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1315, 'D131_FORK',   '叉车司机',       131, 5, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),

(1321, 'D132_MGR',    '华东仓经理',     132, 1, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1322, 'D132_SUP',    '仓库主管',       132, 2, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1323, 'D132_IN',     '入库员',         132, 3, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1324, 'D132_OUT',    '出库员',         132, 4, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1325, 'D132_PICK',   '拣货员',         132, 5, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),

(1331, 'D133_MGR',    '库存计划经理',   133, 1, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1332, 'D133_PLAN',   '补货计划员',     133, 2, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1333, 'D133_ANA',    '库存分析师',     133, 3, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1334, 'D133_CYCLE',  '盘点专员',       133, 4, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1335, 'D133_SKU',    'SKU管理员',      133, 5, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),

(1411, 'D141_MGR',    '公路运输经理',   141, 1, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1412, 'D141_CAP',    '车队长',         141, 2, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1413, 'D141_DRV',    '货运司机',       141, 3, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1414, 'D141_ESC',    '押运员',         141, 4, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1415, 'D141_MAIN',   '车辆维保员',     141, 5, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),

(1421, 'D142_MGR',    '铁路运输经理',   142, 1, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1422, 'D142_PLAN',   '班列计划员',     142, 2, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1423, 'D142_BOX',    '箱管专员',       142, 3, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1424, 'D142_STA',    '站台协调员',     142, 4, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1425, 'D142_DOC',    '铁路单证员',     142, 5, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),

(1431, 'D143_MGR',    '多式联运经理',   143, 1, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1432, 'D143_SOL',    '联运方案专员',   143, 2, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1433, 'D143_PORT',   '口岸协调员',     143, 3, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1434, 'D143_CUST',   '报关协调员',     143, 4, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1435, 'D143_DOC',    '联运单证员',     143, 5, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),

(1511, 'D151_MGR',    '大客户部经理',   151, 1, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1512, 'D151_KA',     '大客户经理',     151, 2, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1513, 'D151_SOL',    '解决方案顾问',   151, 3, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1514, 'D151_OP',     '客户运营专员',   151, 4, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1515, 'D151_SUP',    '客户支持专员',   151, 5, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),

(1521, 'D152_MGR',    '理赔部经理',     152, 1, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1522, 'D152_LEAD',   '理赔主管',       152, 2, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1523, 'D152_CLAIM',  '理赔专员',       152, 3, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1524, 'D152_SUR',    '定损员',         152, 4, 0, NULL, 0, 'admin', NOW(), 'admin', NOW()),
(1525, 'D152_DOC',    '理赔单证员',     152, 5, 0, NULL, 0, 'admin', NOW(), 'admin', NOW());

-- ----------------------------
-- 3. 用户绑定部门 + 对应岗位
-- ----------------------------
DROP TEMPORARY TABLE IF EXISTS tmp_user_bind;
CREATE TEMPORARY TABLE tmp_user_bind (
  seq INT PRIMARY KEY,
  dept_id VARCHAR(32) NOT NULL,
  post_id VARCHAR(32) NOT NULL
);

INSERT INTO tmp_user_bind (seq, dept_id, post_id) VALUES
(1,  '111', '1111'),
(2,  '112', '1121'),
(3,  '121', '1211'),
(4,  '122', '1221'),
(5,  '123', '1231'),
(6,  '131', '1311'),
(7,  '132', '1321'),
(8,  '133', '1331'),
(9,  '141', '1411'),
(10, '142', '1421'),
(11, '143', '1431'),
(12, '151', '1511'),
(13, '152', '1521'),
(14, '121', '1213'),
(15, '122', '1223'),
(16, '131', '1313'),
(17, '132', '1324'),
(18, '141', '1413'),
(19, '142', '1422'),
(20, '143', '1432'),
(21, '151', '1512'),
(22, '152', '1523'),
(23, '111', '1112'),
(24, '112', '1122'),
(25, '123', '1233'),
(26, '133', '1332'),
(27, '121', '1214'),
(28, '122', '1224'),
(29, '141', '1412'),
(30, '152', '1524'),
(31, '131', '1315'),
(32, '132', '1325'),
(33, '143', '1433'),
(34, '151', '1514'),
(35, '123', '1232');

UPDATE sys_user u
JOIN (
  SELECT user_id, ROW_NUMBER() OVER (ORDER BY user_id) AS rn
  FROM sys_user
  WHERE is_del = 0
) ranked ON ranked.user_id = u.user_id
JOIN tmp_user_bind b ON b.seq = ranked.rn
SET u.dept_id = b.dept_id,
    u.post_id = b.post_id,
    u.update_time = NOW()
WHERE u.is_del = 0;

DROP TEMPORARY TABLE IF EXISTS tmp_user_bind;
SET FOREIGN_KEY_CHECKS = 1;

SELECT 'dept' AS t, COUNT(*) AS cnt FROM sys_dept WHERE is_del = 0
UNION ALL
SELECT 'post', COUNT(*) FROM sys_post WHERE is_del = 0
UNION ALL
SELECT 'user_bound', COUNT(*) FROM sys_user WHERE is_del = 0 AND IFNULL(dept_id,'') <> '' AND IFNULL(post_id,'') <> '';
