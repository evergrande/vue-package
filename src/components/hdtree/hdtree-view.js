export default function(){
  return {
  view: {
    showLine: true,
    addHoverDom: (treeid, treeNode)=> {
      // console.log(treeid, treeNode, $("#btn-plus-"+treeNode.tId))
      if (treeNode.editNameFlag || $("#btn-plus-" + treeNode.tId).length > 0 || !this.edit) return;
      let editarea = $("#" + treeNode.tId + "_span");
      let plus = $("<span class='button add' id='btn-plus-" + treeNode.tId + "'><span>");

      plus.on("click", ()=> {
         
        var zTree = $.fn.zTree.getZTreeObj(this.nodeid);
        zTree.addNodes(treeNode, {
          id: "add" + new Date().getTime(),
          pId: treeNode.id,
          name: "node name"
        });
      })
      editarea.after(plus)
    },
    showIcon: false,
    removeHoverDom: function(treeId, treeNode) {
      $("#btn-plus-" + treeNode.tId).unbind().remove();
    }
  }
}
}
