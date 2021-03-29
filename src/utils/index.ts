import { EventType, SelectorMatcherOptions } from "@testing-library/dom";

export function isElementInViewport(el: HTMLElement) {
     //获取元素是否在可视区域
     let rect = el.getBoundingClientRect();
     return (
       rect.top >= 0 &&
       rect.left >= 0 &&
       rect.bottom <=
         (window.innerHeight || document.documentElement.clientHeight) &&
       rect.right <= (window.innerWidth || document.documentElement.clientWidth)
     );

}
export function debounce(fn: Function, wait: number) {
  let timeout: number | null = null;
  return function () {
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
  };
}
export function testColor(color:string) {
  var re1 = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i
  var re2 = /^rgb\(([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\,([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\,([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\)$/i
  var re3 = /^rgba\(([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\,([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\,([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\,(1|1.0|0.[0-9])\)$/i
  return re2.test(color) || re1.test(color) || re3.test(color);
}
export function rgb(){
  var r = Math.floor(Math.random()*256);
  var g = Math.floor(Math.random()*256);
  var b = Math.floor(Math.random()*256);
  var rgb = '('+r+','+g+','+b+')';
  return rgb;
}
export const delegate=(element:Element, eventType:EventType, selector:string, fn:Function)=> {
  element.addEventListener(eventType, e => {
      let el = e.target as any 
      while (!el.matches(selector)) {
          if (element === el) {
              el = null
              break
          }
          el = el.parentNode
      }
      el && fn.call(el, e, el)
  },false)
  return element
}
export const sleep =(time:number)=> {
  return new Promise((resolve) => setTimeout(resolve, time));
}