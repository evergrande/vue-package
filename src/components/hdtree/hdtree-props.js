import {combine} from "../../tools/tool";
export default {

  computed: {
    defaultkey(){
       let key = {
         title: "title",
         name: "name",
         children: "children",
         pageNum: "pageNum",
         pageSize: "pageSize",
         data: "data",
         total: "total"
       };
       return combine(key, this.keyMap);
    }
  },
  /**
   * 选中事件
   * 保存事件
   * 删除事件
   * 增加事件
   */
  props: {

    deleteMsg: {type: String, default: "真的要删除这一项吗?"},
    limitLen: {type: Number, default: 20},
    limitMsg: {type: String, default: "字符不能为空, 且长度不能大于20"},

    /**
     * 数据
     */
    nodes: {
      type: Array,
      default: () => []
    },


    /**
     * 异步是否开启
     */
    async: {
      type: Boolean,
      default: false
    },

    /**
     * 异步开启的url
     */
    url: {
      type: String
    },

    ispage: {
      type: Boolean,
      default: false
    },

    /**
     * 是否可以编辑
     */
    edit: {
      type: Boolean,
      default: false
    },

    levelShow: {
      type: Number,
      default: 0
    },


    /**
     * 键值映射
     */
    keyMap: {
       type: Object,
       default: () => {
          return {}
       }
    },

    selectEvent: {
      type: Function
    },

    updateEvent: {
      type: Function
    },

    deleteEvent: {
      type: Function
    },

    addEvent: {
      type: Function
    },

    expandEvent: {
      type: Function
    },

    collapseEvent: {
      type: Function
    },

    title: {
      type: String,
      default: "false"
    },

    nodeid: {
      type: String,
      required: true
    },

    padding: {
      type: Number,
      default: 15
    },

    foot: {
      type: Boolean,
      default: false
    }
  }
}
