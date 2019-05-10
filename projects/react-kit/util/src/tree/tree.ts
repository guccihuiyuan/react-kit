import {TreeConfig} from "./tree.interface";

/**
 * 树服务
 */
export class TreeService {
    private treeConfig: TreeConfig = {
        rootParentId: '0',
        idMapName: 'id',
        parentIdMapName: 'parentId',
        parentMapName: 'parent',
        childrenMapName: 'children',
        clearChildren: true,
        deepMapName: 'deep',
    };

    constructor(treeConfig?: TreeConfig) {
        if (treeConfig) {
            if (treeConfig.rootParentId) {
                this.treeConfig.rootParentId = treeConfig.rootParentId;
            }
            if (treeConfig.idMapName) {
                this.treeConfig.idMapName = treeConfig.idMapName;
            }
            if (treeConfig.parentIdMapName) {
                this.treeConfig.parentIdMapName = treeConfig.parentIdMapName;
            }
            if (treeConfig.parentMapName) {
                this.treeConfig.parentMapName = treeConfig.parentMapName;
            }
            if (treeConfig.childrenMapName) {
                this.treeConfig.childrenMapName = treeConfig.childrenMapName;
            }
            if (treeConfig.clearChildren) {
                this.treeConfig.clearChildren = treeConfig.clearChildren;
            }
            if (treeConfig.deepMapName) {
                this.treeConfig.deepMapName = treeConfig.deepMapName;
            }
        }
    }

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
    }): any[] {
        // 合并
        const configs = this.mergeConfig(options);

        const result = [];

        const deepFn = function (list, parent, deep) {
            for (let _i = 0, list_1 = list; _i < list_1.length; _i++) {
                const i = list_1[_i];
                i[configs.deepMapName] = deep;
                i[configs.parentMapName] = parent;
                if (configs.cb) {
                    configs.cb(i, parent, deep);
                }
                result.push(i);

                const children = i[configs.childrenMapName];

                if (children != null &&
                    Array.isArray(children) &&
                    children.length > 0) {
                    deepFn(children, i, deep + 1);
                }

                if (configs.clearChildren) {
                    delete i[configs.childrenMapName];
                }
            }
        };
        deepFn(tree, 1, null);
        return result;
    }

    /**
     * 数组转成树形结构数组
     * @param arr 数组
     * @param options 配置
     */
    arrToTree(arr: any[] = [], options?: {
        idMapName?: string,
        parentIdMapName?: string,
        rootParentId?: string,
        childrenMapName?: string,
        cb?: (item: any) => void
    }): any[] {
        // 合并
        const configs = this.mergeConfig(options);

        const tree = [];
        const childrenOf = {};

        for (let i = 0, arr_1 = arr; i < arr_1.length; i++) {
            const item = arr_1[i];

            const id = item[configs.idMapName];
            const pid = item[configs.parentIdMapName];

            childrenOf[id] = childrenOf[id] || [];
            item[configs.childrenMapName] = childrenOf[id];

            if (configs.cb) {
                configs.cb(item);
            }

            if ((pid).toString() !== (configs.rootParentId).toString()) {
                childrenOf[pid] = childrenOf[pid] || [];
                childrenOf[pid].push(item);
            } else {
                tree.push(item);
            }
        }
        return tree;
    }

    /**
     * 遍历树形结构
     * @param tree 数组
     * @param cb 回调
     * @param options 配置
     */
    visitTree(tree: any[], cb: (item: any, parent: any, deep: number) => void, options?: {
        childrenMapName?: string;
    }): void {
        // 合并
        const configs = this.mergeConfig(options);

        // 定义一个递归方法
        const deepFn = function (data, parent, deep) {
            for (let i = 0, data_1 = data; i < data_1.length; i++) {
                const item = data_1[i];
                cb(item, parent, deep);
                const childrenVal = item[configs.childrenMapName];
                if (childrenVal && childrenVal.length > 0) {
                    deepFn(childrenVal, item, deep + 1);
                }
            }
        };

        deepFn(tree, null, 1);
    }

    /**
     * 合并，待后期研究怎么使用ES6语言编译再修改
     * @param treeConfig
     */
    private mergeConfig(treeConfig?: TreeConfig): TreeConfig {
        const configs: TreeConfig = JSON.parse(JSON.stringify(this.treeConfig));

        if (treeConfig) {
            if (treeConfig.rootParentId) {
                configs.rootParentId = treeConfig.rootParentId;
            }
            if (treeConfig.idMapName) {
                configs.idMapName = treeConfig.idMapName;
            }
            if (treeConfig.parentIdMapName) {
                configs.parentIdMapName = treeConfig.parentIdMapName;
            }
            if (treeConfig.parentMapName) {
                configs.parentMapName = treeConfig.parentMapName;
            }
            if (treeConfig.childrenMapName) {
                configs.childrenMapName = treeConfig.childrenMapName;
            }
            if (treeConfig.clearChildren) {
                configs.clearChildren = treeConfig.clearChildren;
            }
            if (treeConfig.deepMapName) {
                configs.deepMapName = treeConfig.deepMapName;
            }
        }

        return configs;
    }
}
