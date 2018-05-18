
/**
 * _combine - 合并两个对象
 *
 * @param  {type} one description
 * @param  {type} two description
 * @return {type}     description
 */
function _combine(one, two) {
    for(let k in two) {
        let item  = two[k];

        if(item && item.constructor == Object) {

            if(!one[k] || one[k].constructor != Object) {
               one[k] = {};
            }
            one[k] = _combine(one[k], item);
        } else if (item && item.constructor == Array) {

           if(!one[k] || one[k].constructor != Array) {
              one[k] = [];
           }

           one[k] = _combine(one[k], item);
        } else {
           one[k] = item;
        }
    }

    return one;
}


/**
 * combine - 合并多个对象
 *
 * @return {type}  description
 */
export function combine() {
    //console.log(arguments.length)
   let args = arguments;
   if(args.length == 1 && args[0].constructor == Object) {
      args = args[0];
   }

   //console.log(args, args[0])

   if(args.length < 2) return args[0]||{};
   let start = _combine(args[0], args[1]);
   for(let i = 2; i < args.length; i++) {
      start = _combine(start, args[i]);
   }

   return start;
}

/**
 * combine2vue - 合并为vue相关对象
 *
 * @return {type}  description
 */
export function combine2vue() {
    let result = combine(arguments);
     // console.log(result.data)
    if(result.data) {
       result.data = (function(data) {
         return function() {
            return data;
         }
       }(result.data));
    }

    return result;
}
