/*
 * @license
 * cocotte-q v0.1.0
 * Copyright(c) 2015 Yuki Kurata <yuki.kurata@gmail.com>
 * MIT Licensed
 */
module.exports = q;

/*global window*/
// クライアント用
if (typeof window === 'object') {
  if (!window.Cocotte){
    window.Cocotte = {};
  }
  window.Cocotte.q = q;
}

// キューの保存先
var que = [];

// キューの最大個数
var max = 10;

/**
 * 引数あり
 *      メッセージを追加します
 * 引数なし
 *      一番古いメッセージを返し、キューから取り除きます
 * @method q
 * @param  {String} message
 * @return {String} message
 */
function q (message) {
  if (arguments.length === 0) {
    return que.shift();
  } else {
    que.push(message);
    if (max < que.length) {
      que.shift();
    }
  }
}

/**
 * キューの個数
 * @property {Number} length
 */
Object.defineProperty(q, 'length', {
  get: function(){
    return que.length;
  },
  enumerable:true
});

/**
 * キューの最大個数
 * @property {Number} max
 */
Object.defineProperty(q, 'max', {
  get: function () {
    return max;
  },
  set: function (value) {
    value = parseInt(value, 10);
    if (0 < value && value < 1000) {
      max = value;
      var len = que.length;
      if (value < len) {
        que = que.slice(-max);
      }
    }
  },
  enumerable: true
});

/**
 * キューに保存されたメッセージを全てコンソールに表示します
 * @method show
 */
q.show = function () {
  que.forEach(function(message){
    console.log(message);
  });
};

/**
 * キューを空にします
 * @method clear
 */
q.clear = function () {
  que = [];
};

/**
 * キューに保存されたメッセージを全てコンソールに表示して空にします
 * @method drain
 */
q.drain = function () {
  q.show();
  q.clear();
};


// q.max = 50;

// var i = 100;
// while(i--) {
//   q('a' + i);
// }

// q.max = 3;

// q();

// q.drain();
// q.drain();










