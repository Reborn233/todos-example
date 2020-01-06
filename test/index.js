import { log, e } from './utils.js';
import { Component, mount } from './Component.js';

// class LikeButton extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       isLiked: false
//     }
//   }

//   onClick() {
//     this.setState({
//       isLiked: !this.state.isLiked
//     })
//   }
//   render() {
//     return `
//       <button style='background:${this.props.bgColor}'>
//         <span>${this.state.isLiked ? '取消' : '点赞'}</span>
//         <span>👍</span>
//       </button>
//     `
//   }
// }

// const likeButton = new LikeButton({
//   bgColor: '#ccc'
// })
const $root = e('#root');

// mount(likeButton, $root)

function fib(n) {
  if (n === 1 || n === 2) return 1;
  return fib(n - 1) + fib(n - 2);
}

function fib_list(n) {
  var res = [];

  for (var i = 1; i <= n; i++) {
    res.push(fib(i));
  }

  return res;
}

function armstrong(n) {
  var res = [];

  for (var i = 1; i <= n; i++) {
    var l = i.toString().length;
    var temp = i,
      sum = 0;

    while (temp > 0) {
      var digit = temp % 10;
      sum += digit ** l;
      temp = Math.floor(temp / 10);
    }

    if (i == sum) res.push(i);
  }

  return res;
}

function hcf(x, y) {
  var res;
  var smaller = x > y ? y : x;

  for (var i = 1; i <= smaller + 1; i++) {
    if (x % i == 0 && y % i == 0) res = i;
  }

  return res;
}

function lcm(x, y) {
  var res;
  var greater = x > y ? x : y;

  while (true) {
    if (greater % x == 0 && greater % y == 0) {
      res = greater;
      break;
    }
    greater += 1;
  }

  return res;
}

log('斐波那契数列: ', fib_list(10));
log('阿姆斯特朗数列: ', armstrong(1000));
log('最大公约数: ', hcf(1296, 24));
log('最小公倍数: ', lcm(54, 24));

function multiplication() {
  for (var i = 1; i < 10; i++) {
    var res = '';
    for (var j = 1; j < i + 1; j++) {
      res += j + 'x' + i + '=' + j * i + ' ';
    }
    log(res);
  }
}
// multiplication()

var array = [
  {
    id: '12987124',
    name: '王小虎',
    amount1: '234',
    amount2: '3.2',
    amount3: 10
  },
  {
    id: '12987124',
    name: '王小虎',
    amount1: '165',
    amount2: '4.43',
    amount3: 12
  },
  {
    id: '12987124',
    name: '王小虎',
    amount1: '324',
    amount2: '1.9',
    amount3: 9
  },
  {
    id: '12987124',
    name: '王小虎',
    amount1: '621',
    amount2: '2.2',
    amount3: 17
  },
  {
    id: '12987124',
    name: '王小虎',
    amount1: '621',
    amount2: '2.2',
    amount3: 17
  },
  {
    id: '12987122',
    name: '王小虎',
    amount1: '539',
    amount2: '4.1',
    amount3: 15
  }
];

function filter(lists) {
  let array = [];
  let start = 0,
    end = 1,
    id = '',
    t = 0;

  lists.forEach(item => {
    t++;
    array.push(0);
    if (!id) {
      id = item.id;
    } else {
      if (id === item.id) {
        if (t === lists.length) {
          end++;
          array[start] = end;
        } else {
          end++;
        }
      } else {
        array[start] = end;
        start = end;
        end = 1;
        id = item.id;
        if (t === lists.length) {
          array[array.length - 1] = 1;
        }
      }
    }
  });

  return array;
}

console.log(filter(array));
