
/**
 * 当前组件, 是通过NavBarItem组件来扩展的.
 * 如果需要扩展自己的菜单组件, 可以参考当前这个组件
 *
 * @author towaywu@gmail.com[will]
 * @date 2017-12-17
 */
<template>
<div class="vp-navbar">

 <nav-bar-item :permission="permission" :class="className[0]&&className[0]" :menu="menu" ref="menu0" child="menu1" :index="0" :path="path"  />
 <nav-bar-item :permission="permission" :class="className[1]&&className[1]" ref="menu1" parent="menu0" child="menu2" :index="1" :path="path" />
 <nav-bar-item :permission="permission" :class="className[2]&&className[2]" ref="menu2" parent="menu1" child="menu3" :index="2" :path="path"  />
 <nav-bar-item :permission="permission" :class="className[3]&&className[3]" ref="menu3" parent="menu2" :index="3" :path="path" />

</div>
</template>

<script>
import NavBarItem from "./NavBarItem";

import {
  splitMenu
} from "../../tools/navbarutil";

export default {

  data() {

    let path = this.$route.path;

    let op = {
      find: false,
      path,
      level: []
    };

    splitMenu(this.menu, {}, op);

    return {
      path: op.level
    }
  },

  props: {
    menu: {
      type: Object,
      default: ()=> JSON.parse("{}")
    },

    className: {
     type: Array,
     default: ()=>[]
   },

   permission: {
     type: Array,
     default: () => []
   }
  },

  watch: {

     /**
      * route - 监听路由, 用来解决后退前进触发按钮动作
      *
      * @param  {type} to   description
      * @param  {type} from description
      * @return {type}      description
      */
     '$route':function(to, from){
         let op = {find:false, path: to.path, level:[]};
         splitMenu(this.menu, {}, op);
         this.path = op.level;
     }

  },

  components: {
    NavBarItem
  }
}
</script>
