
/**
 * 这里包含了权限的对比
 * permission 是一个权限Url的数组. 其他属性参考router-link
 * @author towaywu@gmail.com[will]
 * @date 2017-12-15
 */

export default {
  name: "Linker",
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: [String, Array],
      default: 'click'
    },
    permission: {
      type:Array,
      default: ()=>[]
    },
    link: {
      type: String,
      default: ""
    },
    hide: Function,
  },

  render(h) {
    let attrs = {};
    attrs.to = this.to;
    let permission = this.permission;

    if(permission.length <= 0) {
       permission = this.$dataStorage.get("permissionsLibrary");
      //console.log("this.permission =>", this.permission);
    }

    if(this.link && this.link.length > 0 && permission && (permission.indexOf(this.link) == -1)) {
      //this.$emit('hide', true);
      return h("");
    }
    this.tag&&(attrs.tag = this.tag);
    this.exact&&(attrs.exact = this.exact);
    this.append&&(attrs.append = this.append);
    this.replace&&(attrs.replace = this.replace);
    this.activeClass&&(attrs.activeClass = this.activeClass);
    this.exactActiveClass&&(attrs.exactActiveClass = this.exactActiveClass);
    this.event&&(attrs.event = this.event);
    //console.log(attrs)

    return h("router-link", {attrs:attrs}, this.$slots.default)
  }
}
