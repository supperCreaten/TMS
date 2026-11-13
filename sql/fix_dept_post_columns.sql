-- 对齐已有库表字段（岗位排序列名、部门祖级列）
-- 可重复执行

-- 1) 岗位：若仍存在错误的 order_num 列则忽略；业务字段为 post_sort
-- Mapper 已改为使用 post_sort，无需改表（现有库本来就是 post_sort）

-- 2) 部门：补 ancestors
SET @exist := (
  SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'sys_dept' AND COLUMN_NAME = 'ancestors'
);
SET @sql := IF(
  @exist = 0,
  'ALTER TABLE sys_dept ADD COLUMN ancestors VARCHAR(500) DEFAULT ''0'' COMMENT ''祖级列表'' AFTER parent_id',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

UPDATE sys_dept
SET ancestors = '0'
WHERE parent_id = '0' OR parent_id = 0 OR parent_id IS NULL OR parent_id = '';

UPDATE sys_dept d
INNER JOIN sys_dept p ON CAST(d.parent_id AS CHAR) = CAST(p.dept_id AS CHAR)
SET d.ancestors = CONCAT(IFNULL(NULLIF(p.ancestors, ''), '0'), ',', p.dept_id)
WHERE d.parent_id <> '0' AND d.parent_id <> 0 AND d.parent_id IS NOT NULL AND d.parent_id <> '';
