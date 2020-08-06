// Based on utils from https://blog.garstasio.com/you-dont-need-jquery/utils/
const data = window.WeakMap ? new WeakMap() : (function () {
  let lastId = 0,
      store = {};

  return {
      set: function(element, info) {
          let id;
          if (element.myCustomDataTag === undefined) {
              id = lastId++;
              element.myCustomDataTag = id;
          }
          store[id] = info;
      },
      get: function(element) {
        return store[element.myCustomDataTag];
      }
  };
}());

export function getData(el) {
  return data.get(el);
};

export function setData(el, obj) {
  data.set(el, obj);
};

export function getComponent(domElement) {
  return getData(domElement).component;
};

export function findComponent(componentClass) {
  const obj = getData(document.querySelector(`[data-component="${componentClass.componentName}"]`));
  if (!obj) {
    console.error(`[App] Couldn\'t find instance of ${componentClass.componentName} component. Check declaration order.`);
    return;
  }
  return obj.component;
};

// https://davidwalsh.name/css-animation-callback
export function whichAnimationEvent() {
  let t,
      el = document.createElement('fakeelement');

  let animations = {
    'animation': 'animationend',
    'OAnimation': 'oAnimationEnd',
    'MozAnimation': 'animationend',
    'WebkitAnimation': 'webkitAnimationEnd'
  };

  for (t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
};

export function whichTransitionEvent() {
  let t,
      el = document.createElement('fakeelement');

  let transitions = {
    'transition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'MozTransition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd'
  };

  for (t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
};

export function getRandom(min, max) {
  return Math.random() * (max - min) + min;
};

export class Timer {
  constructor(callback, delay) {
    let timerId, start, remaining = delay;

    this.pause = function () {
      window.clearTimeout(timerId);
      remaining -= new Date() - start;
    };

    let resume = function () {
      start = new Date();
      timerId = window.setTimeout(function () {
        remaining = delay;
        resume();
        callback();
      }, remaining);
    };
    this.resume = resume;

    this.reset = function () {
      remaining = delay;
    };

    this.resume();
  }
};
