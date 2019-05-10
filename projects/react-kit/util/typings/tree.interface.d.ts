/**
 * 配置类
 */
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
