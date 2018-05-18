
/**
 * splitMenu - 分离菜单及保存URL在数据中的位置
 *
 * @param  {object} menu  原始菜单数据
 * @param  {object} menus 分割后的菜单数据, 会保存在一个hashtable中
 * @param  {object} op   保存搜索的相关数据, find - 代表找到, path - 当前路径, level - 路径保存的位置
 */
export function splitMenu(menu, menus, op) {
   let i = 0;
   for(let key in menu) {
       menus[key] = menu[key];
       op.level.push(i+"-" + key); //入栈
       if(key == op.path) {
         op.find = true;
         break;
       }

       if(menu[key].children) {
          splitMenu(menu[key].children, menus, op);
       }

       if(op.find) break; //找到了, 就终止程序, 不让路径再出栈
       op.level.pop(); //出栈
       i++;
   }
}


/**
 * splitToPath - 分割菜单, 只返回路由的路径
 *
 * @param  {object} menu 菜单数据
 * @param  {string} rt   路由地址
 * @return {type}      路由所在菜单的路径
 */
export function splitToPath(menu, rt) {
    let op = {
      find: false,
      path: rt,
      level: []
    };
    splitMenu(menu, {}, op)
    return op.level;
}
