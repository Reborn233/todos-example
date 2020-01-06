const root = document.body

// tab切换栏
var Tab = {
  view: function(vnode) {
    return m('div', { class: 'tab' }, [
      tabs.map((item, index) => {
        var active = app.state.status === item.value ? 'active' : ''
        return m(TabItem, { key: index, item: item, active: active })
      })
    ])
  }
}

var TabItem = {
  view: function(vnode) {
    var active = vnode.attrs.active
    var item = vnode.attrs.item
    return m(
      'div', {
        class: 'tab-item ' + active,
        onclick: function() {
          m.route.set('/' + item.value)
        }
      },
      item.label
    )
  }
}

var Form = {
  view: function(vnode) {
    var inputHandle = vnode.attrs.inputHandle
    return m(
      'form', {
        id: 'form',
        onsubmit: function(e) {
          inputHandle.apply(app, [e])
        }
      },
      [
        m('input', { id: 'input', placeholder: '写点什么...' }),
        m('p', { class: 'hint' }, `一共 ${app.state.notes.length} 件事情`)
      ]
    )
  }
}

// notes 列表
var List = {
  view: function(vnode) {
    var toggle = vnode.attrs.toggleHandle
    var del = vnode.attrs.delHandle
    return m('div', { class: 'tab-container' }, [
      m('ol', [
        app.filterData().map(item => {
          return m(ListItem, {
            key: item.id,
            list: item,
            toggle: toggle,
            del: del
          })
        })
      ])
    ])
  }
}
// notes列表行
var ListItem = {
  view: function(vnode) {
    var item = vnode.attrs.list
    var toggle = vnode.attrs.toggle
    var remove = vnode.attrs.del
    var del = item.finished ? 'del' : ''
    return m('li', { name: item.id }, [
      m(
        'span', {
          class: `content ${del}`,
          onclick: function() {
            toggle.apply(app, [item])
          }
        },
        item.content
      ),
      m(
        'span', {
          class: 'btn',
          onclick: function() {
            remove.apply(app, [item.id])
          }
        },
        '删除'
      )
    ])
  }
}

// 主视图
var app = {
  view: function(vnode) {
    app.state.status = vnode.attrs.status
    return m('main', { id: 'app', class: 'card' }, [
      m('h2', { class: 'center' }, 'Note - mithril'),
      m(Form, { inputHandle: this.inputHandle }),
      m(Tab),
      m(List, { toggleHandle: this.toggleHandle, delHandle: this.remove })
    ])
  },
  state: {
    status: ALL,
    notes: JSON.parse(fetch('notes-mithril')) || note.notes
  },
  filterData: function() {
    if (this.state.status === ALL) {
      return this.state.notes
    } else if (this.state.status === DOING) {
      return this.state.notes.filter(e => !e.finished)
    } else if (this.state.status === FINISHED) {
      return this.state.notes.filter(e => e.finished)
    }
  },
  inputHandle: function(e) {
    e.preventDefault()
    var val = document.getElementById('input').value
    if (!val) return
    this.state.notes.push({
      id: this.nextId(),
      content: val,
      finished: false
    })
    document.getElementById('input').value = ''
    this.save()
  },
  toggleHandle: function(item) {
    item.finished = !item.finished
    this.save()
  },
  remove: function(id) {
    var index = this.state.notes.findIndex(e => e.id === Number(id))
    this.state.notes.splice(index, 1)
    this.save()
  },
  nextId: function() {
    var len = this.state.notes.length
    if (!len) return 1
    return this.state.notes[len - 1].id + 1
  },
  save: function() {
    save('notes-mithril', this.state.notes)
  }
}
m.route(root, '/all', {
  '/:status': app
})