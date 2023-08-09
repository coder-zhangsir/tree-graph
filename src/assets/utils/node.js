/**
 * @description 查找包含自身节点的父代节点
 * @param tree 需要查找的树数据
 * @param curKey 当前节点key
 * @param keyField 自定义 key 字段
 * @param node 找到的node 可以不传
 */
export function findCurNode(tree, curKey, keyField, node = null) {
    tree.forEach((item) => {
        if (item[keyField] == curKey) {
            node = item
        }
        if (item.children && item.children.length) {
            const findChildren = findCurNode(item.children, curKey, keyField, node)
            if (findChildren) {
                node = findChildren
            }
        }
    })
    return node
}
