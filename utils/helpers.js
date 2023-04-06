// byKeys will return keys instead of values to the passed function
exports.mapObject = (obj, fn, byKeys = false) => {
  return Object.keys(obj).reduce((result, key) => {
    result[key] = byKeys ? fn(key) : fn(obj[key])
    return result
  }, {})
}

exports.delay = (time = 5000, shouldReject = false) => new Promise((res, rej) => setTimeout(shouldReject ? rej : res, time))

exports.getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min

exports.capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

exports.target = url => (url && /^https?:\/\//i.test(url) ? '_blank' : '_self')

exports.handleBodyOverflow = (shouldPreventBodyScroll, stopBodyScrollEnabling = false, blurElementId = false) => {
  let blurElement = null
  if (blurElementId) {
    blurElement = document.getElementById(blurElementId)
  }
  const scrollTop1 = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
  const scrollTop2 = Math.abs(parseInt(document.body.style.top))
  const scrollTop = isNaN(scrollTop2) ? scrollTop1 : scrollTop2

  if (shouldPreventBodyScroll) {
    document.body.style.width = 'calc(100% - 0px)'
    document.body.style.position = 'fixed'
    document.body.style.top = -scrollTop + 'px'
    document.body.style.overflowY = 'hidden'
    blurElement && blurElement.classList.add('blurred')
  } else {
    if (stopBodyScrollEnabling) {
      return
    }
    document.body.style.width = ''
    document.body.style.position = 'static'
    document.body.style.top = ''
    document.body.style.overflowY = 'auto'
    blurElement && blurElement.classList.remove('blurred')
    window.scrollTo(0, scrollTop)
  }
}

exports.throttle = (fn, wait) => {
  let time = Date.now()
  return function () {
    if (time + wait - Date.now() < 0) {
      fn()
      time = Date.now()
    }
  }
}

/*Returns a function, that, as long as it continues to be invoked, will not
 *be triggered. The function will be called after it stops being called for
 *N milliseconds. If `immediate` is passed, trigger the function on the
 *leading edge, instead of the trailing.*/
exports.debounce = (func, wait, immediate) => {
  let timeout
  return () => {
    let ctx = this,
      args = arguments
    let later = () => {
      timeout = null
      if (!immediate) func.apply(ctx, args)
    }
    let callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(ctx, args)
  }
}

exports.shuffle = array => {
  // Based on the Fisher–Yates shuffle
  // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)) // random index from 0 to i
    ;[array[i], array[j]] = [array[j], array[i]] // swap elements
  }
  return array
}

exports.cleanedQuery = (q, prop) => {
  const query = {...q}
  delete query[prop]
  return query
}

exports.range = (start, end) => Array.from({length: end - start}, (v, k) => k + start)

exports.uniqueArray = arr => arr.filter((obj, i) => i === arr.findIndex(o => JSON.stringify(o) === JSON.stringify(obj)))

exports.isIE = () => window.navigator.userAgent.indexOf('Trident/') > 0

exports.isPWA = () => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone

exports.removeProp = (obj, name) => JSON.parse(JSON.stringify(obj), (k, v) => (k === name ? undefined : v))

exports.replaceTemplate = (str, mapObj) => {
  const resObj = Object.entries(mapObj).reduce((obj, [key, val]) => ({...obj, [`{${key}}`]: val}), {})
  const re = new RegExp(Object.keys(resObj).join('|'), 'gi')
  return str.replace(re, matched => resObj[matched])
}
