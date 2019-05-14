# react-kit/util
------
通用工具

## TreeService
> * 可配置
> * 处理数组与树之间的转换

### 配置参数
```
export interface TreeConfig {
    /**
     * 根ID
     */
    rootParentId?: string;
    /**
     * 编号项名
     */
    idMapName?: string;
    /**
     * 父编号项名
     */
    parentIdMapName?: string;
    /**
     * 扁平后数组的父数据项名
     */
    parentMapName?: string;
    /**
     * 源数据子项名
     */
    childrenMapName?: string;
    /**
     * 是否移除children
     */
    clearChildren?: boolean;
    /**
     * 深度项名
     */
    deepMapName?: string;


    /**
     * 回调方法
     * @param item
     */
    cb?: (item: any, parent?: any, deep?: number) => void;
}
```

### 示例(传入参数可点击方法进去查看)
```
import { TreeService } from '@react-kit/util';

// 初始化，可传入配置
export const treeService = new TreeService();

// 树转换成数组
treeService.treeToArr();

// 数组转换成树
treeService.arrToTree();

// 遍历树
treeService.visitTree();
```
