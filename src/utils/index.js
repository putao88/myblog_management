/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
    if (arguments.length === 0 || !time) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string')) {
            if ((/^[0-9]+$/.test(time))) {
                // support "1548221490638"
                time = parseInt(time)
            } else {
                // support safari
                // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
                time = time.replace(new RegExp(/-/gm), '/')
            }
        }

        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
        return value.toString().padStart(2, '0')
    })
    return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
    if (('' + time).length === 10) {
        time = parseInt(time) * 1000
    } else {
        time = +time
    }
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return (
            d.getMonth() +
            1 +
            '月' +
            d.getDate() +
            '日' +
            d.getHours() +
            '时' +
            d.getMinutes() +
            '分'
        )
    }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
    const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
    if (!search) {
        return {}
    }
    const obj = {}
    const searchArr = search.split('&')
    searchArr.forEach(v => {
        const index = v.indexOf('=')
        if (index !== -1) {
            const name = v.substring(0, index)
            const val = v.substring(index + 1, v.length)
            obj[name] = val
        }
    })
    return obj
}

/**
 * @param {Object} data
 * hasArticle : 是否包含文章
 * @returns {Object} tree
 * 整合数据成树形结构需要的
 */
export const fixIntoTree = (data, father_id, label, value, children, hasArticle) => {
    var tree = [];
    var temp;
    for (var i = 0; i < data.length; i++) {
        if (data[i].father_id == father_id) {
            if (!hasArticle && data[i].isArticle) {
                continue
            } else {
                var obj = {
                    [value]: data[i].id,
                    [label]: data[i].name,
                    isArticle: data[i].isArticle, //这个字段是为了后续操作特意加的，树形递归不需要
                };
                temp = fixIntoTree(data, data[i].id, label, value, children, hasArticle);
                if (temp.length > 0) {
                    obj[children] = temp;
                }
                tree.push(obj);
            }
        }
    }
    return tree
}

/**
* @param {Object} data : 是一个层叠的数组，Cascader 的options数据
* @returns {Object}
* data是数组数据     id当前子id  prop：表示属性名传参
* 树形层级结构：通过子ID找到所有父级ID
*/
export const getFathersById = (id, data, prop) => {
    var arrRes = []
    const rev = (data, nodeId) => {
      for (var i = 0, length = data.length; i < length; i++) {
        const node = data[i]
        if (node[prop] === nodeId) {
          arrRes.unshift(node[prop])
          return true
        } else {
          if (node.children && node.children.length) {
            if (rev(node.children, nodeId)) {
              arrRes.unshift(node[prop])
              return true
            }
          }
        }
      }
      return false
    }
    rev(data, id)
    return arrRes
}