
/**
 * 菜单栏, 带有权限控制
 */
<template>
<ul v-if="size">
  <li v-for="(item, key, index) in pri_menu" :key="key" :class="{'menu-nest': spread&&item.children}">

    <linker :permission="permission" :link="item.link?item.link:''" :to="item.path" @click.native="(spread&&item.children)?showchild(index):change(item)" :ref="'spread' + index" state="0">
      <i v-if="item.icon" :class="item.icon"></i> {{item.name}}
      <span class="child-control" v-if="spread&&item.children"><img :src="icon" alt="" /></span>
    </linker>
    <ul v-if="spread&&item.children" style="display: none;">
      <li v-for="(sitem, skey) in item.children" :key="skey">
        <linker :permission="permission" :link="sitem.link?sitem.link:''" :to="sitem.path"><i v-if="sitem.icon" :class="sitem.icon"></i> {{sitem.name}}</linker>
      </li>
    </ul>
  </li>
</ul>
</template>

<script>

export default {

  data() {
    return {
      pri_menu: {},
      have: false,
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAmklEQVQ4T2NkoBAwUqifYRAZMGvWLIO0tLQLxHgJWS3cCzNnzvzw79+/gszMzAX4DJk+fXoCExPThPT0dAGQOrgBIFP///9/AJ8hMM2MjIwOMNeiBCI+Q7BpRnEBzNnYDMGlGasBIEFkQ0B8kJ+RnY0cRjjTAcwQsC1IfkYPYLwJafr06QogDZmZmQ9wxcwgSonEpEBsaij2AgCHpVwRD3BMhwAAAABJRU5ErkJggg=="
    }
  },


  props: {

    /**
     * 主数据, 在第一个菜单上传入就可以, 其他可以不用传入
     */
    menu: {
      type: Object,
      default: () => {}
    },

    /**
     * 指向的下一个菜单
     */
    child: {
      type: String
    },

    /**
     * 指向父菜单
     */
    parent: {
      type: String
    },

    /**
     * 当前URL的在菜单数据中的路径
     */
    path: {
      type: Array,
      required: true
    },

    /**
     * 当前菜单条在所有菜单条的索引位置
     */
    index: {
      type: Number,
      required: true
    },

    /**
     * 是否展开
     */
    spread: {
      type: Boolean,
      default: false
    },

    callback: {
      type: Function,
      default: () => {}
    },

    permission: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    size() {
      return this.pri_menu ? Object.keys(this.pri_menu).length : 0;
    }
  },

  watch: {
    path: function() {
      enter.call(this);
      this.callback("change", this.pri_menu, this.index, this.path);
    }
  },


  methods: {

    /**
     * change - 用户点击菜单, 子菜单会显示出来
     *
     * @param  {type} menu description
     * @return {type}      description
     */
    change(menu) {


      clickItem.call(this, menu);

      this.callback("click", menu, this.index, this.path); //回调函数


    },

    showchild(index) {

      this.$nextTick(()=>{

        let el = this.$refs["spread" + index][0].$el;
        //console.log(el);
        let state = el.getAttribute('state');
        if(state == 0) {
            const icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAgElEQVQ4T82TQQ2AMBAEpw6QgAQkgBMkgBMk4AQLSEACEkjJNWmavfLoh75vJruXa6DxhUae/wt6q3h5VWsVBuAwcAJOJfEECV4N2oBRSZQgh3cTzICUlAIFp+RSkgtqsCvJBTewACm2t/iUpIsDZQK5aWGKad/Z/1/i519rrvAApxQXEX+yHsoAAAAASUVORK5CYII=";
            el.setAttribute("state", "1");
            const img = el.getElementsByTagName("img")[0];
            img.src = icon;
            //console.log(el.nextElementSibling, "--")
            el.nextElementSibling.style.display="block"
        } else {
           const icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAmklEQVQ4T2NkoBAwUqifYRAZMGvWLIO0tLQLxHgJWS3cCzNnzvzw79+/gszMzAX4DJk+fXoCExPThPT0dAGQOrgBIFP///9/AJ8hMM2MjIwOMNeiBCI+Q7BpRnEBzNnYDMGlGasBIEFkQ0B8kJ+RnY0cRjjTAcwQsC1IfkYPYLwJafr06QogDZmZmQ9wxcwgSonEpEBsaij2AgCHpVwRD3BMhwAAAABJRU5ErkJggg=="
           el.setAttribute("state", 0);
           const img = el.getElementsByTagName("img")[0];
           img.src = icon;
           el.nextElementSibling.style.display="none";
        }

      })

    }

  },

  mounted() {

    enter.call(this)
    this.callback("loaded", this.pri_menu, this.index, this.path);

  }
}


/**
 * clickItem - 点击数据
 *
 * @param {object}  菜单数据
 */
function clickItem(menu) {
  if (menu.children) {

    let child = this.$parent.$refs[this.child];
    child && (child.pri_menu = menu.children);

    while (child) {

      let keys = Object.keys(child.pri_menu);

      if (keys.length > 0) {
        let children = child.pri_menu[keys[0]].children;

        if (children) {

          child = this.$parent.$refs[child.child]
          child.pri_menu = children;

        } else { //没有children的要将后面的数据清空

          let nochild = this.$parent.$refs[child.child];

          while (nochild) {
            nochild.pri_menu = {};
            nochild = this.$parent.$refs[nochild.child];
          }
          child = null;
        }

      }

    }
  } else {
    let nochild = this.$parent.$refs[this.child];
    while (nochild) {
      nochild.pri_menu = {};
      nochild = this.$parent.$refs[nochild.child];
    }
  }
}



/**
 * enter - 默认初始化数据
 *
 * @return {type}  description
 */
function enter() {

  this.pri_menu = this.menu;
  if(this.path&&this.path.length <= 0) return;
  //
  // 获取父类数据
  if (this.parent) {
    //console.log(this.parent, "----", this.$parent.$refs[this.parent])
    let pri_menu_to_key = this.$parent.$refs[this.parent].pri_menu;
    let keys = Object.keys(pri_menu_to_key || {});

    if (keys.length > 0) {
      let i = 0;

      if (this.path.length >= this.index) {
        i = this.path[this.index - 1].split("-")[0];
      }

      let p = this.$parent.$refs[this.parent].pri_menu[keys[i]];
      p.children ? (this.pri_menu = p.children) : (this.pri_menu = {});
    }

  }
  //
}
</script>
