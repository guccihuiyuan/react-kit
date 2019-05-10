import {TreeConfig} from "./tree.interface";
export declare class TreeService {
    private treeConfig;
    /**
     * 初始化函数
     */
    constructor(treeConfig?: TreeConfig);

    /**
     * 将树形数组转换成数组
     * @param tree 树形结构数组
     * @param options 配置
     */
    treeToArr(tree: any[], options?: {
        deepMapName?: string;
        parentMapName?: string;
        childrenMapName?: string;
        clearChildren?: boolean;
        /** 转换成数组结构时回调 */
        cb?: (item: any, parent: any, deep: number) => void;
    }): any[]

    /**
     * 数组转成树形结构数组
     * @param arr 数组
     * @param options 配置
     */
    arrToTree(arr: any[], options?: {
        idMapName?: string,
        parentIdMapName?: string,
        rootParentId?: string,
        childrenMapName?: string,
        cb?: (item: any) => void
    }): any[]

    /**
     * 遍历树形结构
     * @param tree 数组
     * @param cb 回调
     * @param options 配置
     */
    visitTree(tree: any[], cb: (item: any, parent: any, deep: number) => void, options?: {
        childrenMapName?: string;
    }): void
}
