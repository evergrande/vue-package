<template id="">
<hd-panel :title="title" :hdbgcolor="true" :hdbdradius="false" :padding="padding" :foot="foot">
  <div slot="right">

  <div class="tree-page" v-if="ispage">
    <a href="#" @click.prevent="firstPage"><fa-icon type="step-backward"></fa-icon></a>
    <a href="#" @click.prevent="prevPage"><fa-icon type="chevron-circle-left"></fa-icon></a>
    <a href="#" @click.prevent="nextPage"><fa-icon type="chevron-circle-right"></fa-icon></a>
    <a href="#" @click.prevent="lastPage"><fa-icon type="step-forward"></fa-icon></a>
  </div>

  </div>
  <ul :id="nodeid" class="ztree"></ul>
</hd-panel>
</template>

<script>
import $ from "jquery";
import ztree from "./js/jquery.ztree.all.min";
import {combine2vue, combine} from "../../tools/tool";
import setting from "./hdtree-setting.js";
import hdtreePage from "./hdtree-page.js";
import hdtreeProps from "./hdtree-props.js";

export default combine2vue({
  data: {
     params: ""
  },
  watch: {
    nodes(val) {
      // console.log(val)
      // var zTree = $.fn.zTree.getZTreeObj("tree");
      // console.log(zTree)
      // zTree.reAsyncChildNodes(val, "refresh");
      //zTree.refresh()
      //
      (!this.async)&&this.redraw(val);
    },

    url(val) {
       let query =  val.split("?")[1];
       this.params = query;
       this.loadData();
    }
  },

  methods: {

     redraw(nodes) {
        // console.log(this.defaultkey, "--", this.nodeid)
       let options = combine({
         edit: {
           enable: this.edit
         },
         data: {
           key: this.defaultkey
         }
       }, setting.call(this));

       $.fn.zTree.init($("#" + this.nodeid), options,nodes);
       if(this.levelShow > 0) {
          this.expandLevel();
       }

     },

     expandLevel() {
        const tree = $.fn.zTree.getZTreeObj(this.nodeid);
        const nodes = tree.getNodes();
        nodes.forEach(item=> {
            tree.expandNode(item, true, false, true, true);
        })
     }
  },

  mounted() {
     //this.defaultkey = combine(this.defaultkey, this.keyMap);
     this.redraw(this.nodes);
  }

}, hdtreePage, hdtreeProps)
</script>

<style>

.tree-page {
   padding: 0 10px;
}

.tree-page a {
  display: inline-block;
  margin-right: 5px;
}
</style>
