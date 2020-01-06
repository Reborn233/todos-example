import {
  Component,
  DefineMap,
  DefineList,
  domEvents,
  enterEvent
} from '//unpkg.com/can/everything.mjs'

domEvents.addEvent(enterEvent)

const State = DefineMap.extend('State', {
  status: 'string',
  isActive(state) {
    return this.status === state
  }
})
const Todo = DefineMap.extend('Todo', {
  id: 'number',
  content: 'string',
  finished: { type: 'boolean', default: false }
})

Todo.List = DefineList.extend('TodoList', {
  '#': Todo,
  get doing() {
    return this.filter({ finished: false })
  },
  get finished() {
    return this.filter({ finished: true })
  },
  save(note) {
    this.push(note)
  },
  nextId() {
    if (!this.length) return 1
    return this[this.length - 1].id + 1
  }
})

const NoteList = new Todo.List(JSON.parse(fetch('notes-canjs')) || note.notes)
const state = new State({
  status: ALL
})

Component.extend({
  tag: 'todo-mvc',
  view: `
    <div id='form'>
      <input on:enter='inputHandle()' value:from="note" on:input:value:to="note" type="text" autofocus placeholder='写点什么...' />
      <p class='hint'>一共 {{this.len()}} 件事情</p>
    </div>
    <div class='tab'>
      <div class='tab-item {{# if(this.state.isActive("all")) }}active{{/ if }}' on:click='this.tabHandle("all")'>全部</div>
      <div class='tab-item {{# if(this.state.isActive("doing")) }}active{{/ if }}' on:click='this.tabHandle("doing")'>进行中</div>
      <div class='tab-item {{# if(this.state.isActive("finished")) }}active{{/ if }}' on:click='this.tabHandle("finished")'>已完成</div>
    </div>
    <div class="tab-container">
    <ol>
      {{ # for(todo of this.todos()}}
        <li name='{{todo.id}}'>
          <span class='content {{# if(todo.finished) }}del{{/ if }}'>{{todo.content}}</span>
          <span class='btn'>删除</span>
        </li>
      {{/ for}}
    </ol>
    </div>
  `,
  ViewModel: {
    note: {
      default() {
        return 'one note'
      }
    },
    tabs: {
      default() {
        return tabs
      }
    },
    len() {
      return NoteList.length
    },
    todo: {
      Default: Todo
    },
    todos() {
      if (this.state.status === ALL) return NoteList
      if (this.state.status === DOING) return NoteList.doing
      if (this.state.status === FINISHED) return NoteList.finished
    },
    state: {
      default() {
        return state
      }
    },
    inputHandle() {
      if (!this.note) return
      console.log(this)
    },
    tabHandle(state) {
      this.state.status = state
    }
  }
})
