
export default function() {
  return {
  callback: {
    beforeRemove: (tree, treeNode) => {
      return confirm(this.deleteMsg);
    },

    onRemove: (e, tree, treeNode) => {
      this.deleteEvent(tree, treeNode);
    },

    beforeRename: (e, tree, treeNode) => {

      let judge = (treeNode.trim().length == 0) || (treeNode.trim().length > this.limitLen);

      if(judge) {
        alert(this.limitMsg)

        return false;
      }
      return true;
    },

    onRename: (e, tree, treeNode) => {
      if (this.updateEvent) {
        this.updateEvent(e, tree, treeNode);
      }
    },

    onClick: (e, tree, treeNode) => {

      if (this.selectEvent) {
        this.selectEvent(e, tree, treeNode);
      }
    },

    onExpand: (e, tree, treeNode) => {
      if (this.expandEvent) {
        this.expandEvent(e, tree, treeNode, (data) =>{
             data.forEach(item=>{
               if(item.isParent == undefined) {
                  item.isParent = true;
               }
             })
             let ztree = $.fn.zTree.getZTreeObj(this.nodeid);
             ztree.addNodes(treeNode, -1, data , false);
        });
      }
    },

    onCollapse: (e, tree, treeNode) => {
      if (this.collapseEvent) this.collapseEvent(e, tree, treeNode);

      //如果异步的话, 要收起来的时候要删除数据
      if(this.async && !this.ispage) {
        let ztree = $.fn.zTree.getZTreeObj(this.nodeid);
        ztree.removeChildNodes(treeNode);
        treeNode.isParent = true;
        ztree.updateNode(treeNode);
      }

    }
  }
}

}
