export const log = console.log.bind(console)

export class Stack {
  constructor() {
    this.dataStore = []
    this.top = 0
  }

  push(ele) {
    this.dataStore[this.top++] = ele
  }

  pop() {
    return this.dataStore[--this.top]
  }

  peek() {
    return this.top > 0 ? this.dataStore[this.top - 1] : 'Empty'
  }

  clear() {
    this.top = 0
  }

  length() {
    return this.top
  }
}

export const e = name => document.querySelector(name)

export const es = name => document.querySelectorAll(name)
