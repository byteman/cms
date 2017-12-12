/**
 * Created by jiachenpan on 16/11/18.
 */

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
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
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function getTime() {
  var mydate = new Date()
  var myyear = mydate.getFullYear()
  var mymonth = mydate.getMonth() + 1
  var mydat = mydate.getDate()
  var myhours = mydate.getHours()
  var myminutes = mydate.getMinutes()
  var myseconds = mydate.getSeconds()
  var myday = mydate.getDay()
  var xingqi = ''
  switch (myday) {
    case 0: xingqi = "星期日"
      break;
    case 1: xingqi = "星期一"
      break;
    case 2: xingqi = "星期二"
      break;
    case 3: xingqi = "星期三"
      break;
    case 4: xingqi = "星期四"
      break;
    case 5: xingqi = "星期五"
      break;
    case 6: xingqi = "星期六"
      break;
    default: xingqi = "系统错误！"
  }
  var nowTime = myyear + '-' + bu0(mymonth) + '-' + bu0(mydat) + ' ' + bu0(myhours) + ':' + bu0(myminutes) + ':' + bu0(myseconds) + ' ' + xingqi;
  return nowTime
}

function bu0(num) {
  var ret = num
  if (num <= 9) {
    ret = '0' + num
  }
  return ret
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}
