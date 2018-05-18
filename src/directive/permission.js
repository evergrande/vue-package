/**
 * 用来细粒度控制权限问题, 使用该指令时, 必须配置一个href属性, 其值为权限url
 */
const permission = {
  inserted(el, binding, vnode, ovnode) {

     let href = binding.value.replace(/^\/?#/g, "");
     let UserAu = vnode.context.$dataStorage.get("permissionsLibrary");
     //console.log("permission inserted", UserAu)
     if(href && href != "" && UserAu.indexOf(href) == -1) {
        el.parentNode.removeChild(el);
     }
  }
}

export default permission;
