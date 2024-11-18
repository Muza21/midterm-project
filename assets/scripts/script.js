// 1.
// const obj = {
//   xy: 30,
// };
// obj.reverse()
// obj.yx = 40;
// obj.xy = 50;

// obj.xy10y = 20;
// obj.yx10x = 20;

// console.log(obj.xy);
// OUTPUT: object reverse is not a function.

// 2.
// var x = 10;

// function foo(foobar) {
//   var x = 40;
//   foobar();
// }

// function bar() {
//   console.log(x);
// }

// foo(bar);
// OUTPUT: 10

// 3.
// const something = new Set(["goal", "success", "failed"]);

// const people = [
//   { name: "nam1", age: 20, goal: "success" },
//   { name: "nam2", age: 22, goal: "fail" },
//   { name: "nam3", age: 23, goal: "goal" },
// ];
// const result = people
//   .filter((person) => something.has(person.goal))
//   .map((person) => person.name);

// console.log(result);
// OUTPUT: names of the people who have

// 4.
var obj = {
  a: 2,
};

function clear() {
  obj.a = 3;
  obj = null;
}

clear();

console.log(obj);
