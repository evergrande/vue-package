import permission from "./directive/permission";
import Linker from "./components/linker";
import NavBarItem from "./components/navbar/NavBarItem";
import NavBar from "./components/navbar/NavBar";
import TaskStep from "./components/taskstep/TaskStep";
import HdTaskStep from "./components/hdtaskstep/TaskStep";
import Panel from "./components/panel";
import FaIcon from "./components/faicon/FaIcon";
import FanIcon from "./components/fanicon/FanIcon";
import Gantt from "./components/gantt/Gantt.vue";
import Hdtree from "./components/hdtree/Hdtree";

import layer from "./components/layer";
import scroll from "./components/scroll/scrollbar";
import inlinescroll from "./components/inlinescroll/jquery.jscroll";

require("./components/hdtree/css/zTreeStyle/zTreeStyle.css")
require("./components/faicon/css/font-awesome.css");//已转换为tfa
require("./components/fanicon/css/fontawesome-all.min.css");
require('./components/layer/theme/default/layer.css');
require('./components/scroll/scrollbar.css');
import 'iview/dist/styles/iview.css';




import DataStorage from "./tools/datastorage";
import {splitMenu, splitToPath} from "./tools/navbarutil";

export * from "./tools/tool";
export function VuePackage() {};

VuePackage.install = function(Vue, option) {

  // 指令注册
  Vue.directive("permission", permission);

  // 组件注册
  Vue.component("linker", Linker);
  Vue.component("NavBar", NavBar);
  Vue.component("NavBarItem", NavBarItem);
  // Vue.component("TaskStep", TaskStep); //老版
  Vue.component("HdTaskStep", HdTaskStep);//最新版
  Vue.component("HdPanel", Panel);
  Vue.component("FaIcon", FaIcon);
  Vue.component("FanIcon", FanIcon);
  Vue.component("Gantt", Gantt); //甘特图
  Vue.component("Hdtree", Hdtree);

  //实例化属性
  Vue.prototype.$dataStorage = DataStorage;
  Vue.prototype.$splitMenu = splitMenu;
  Vue.prototype.$splitToPath = splitToPath;

  //
  Vue.prototype.$layer = layer;
}
// console.log(VuePackage, "......")
