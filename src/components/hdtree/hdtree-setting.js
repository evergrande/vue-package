import callback from "./hdtree-callbacks.js";
import view from "./hdtree-view.js";
import {combine} from "../../tools/tool";


function editconfig() {
  return {
    edit:{
      showRemoveBtn:(treeid, treeNode)=>{
        if(treeNode.level == 0) {
            return false;
        }
        return true
      }
    }
  }
}


export default function() {
  return combine(editconfig.call(this), callback.call(this), view.call(this))
};
