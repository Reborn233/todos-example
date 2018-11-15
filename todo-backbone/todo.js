$(function() {
  const Todo = Backbone.Model.extend({
    defaults: function() {
      return {
        id: Todos.nextId(),
        content: 'one note',
        finished: false
      }
    },
    initialize: function() {
      if (!this.get('content')) {
        this.set({ content: this.defaults().content })
      }
    },
    toggle: function() {
      this.save({ finished: !this.get('finished') })
    }
  })

  const TodoList = Backbone.Collection.extend({
    model: Todo,
    localStorage: new Backbone.LocalStorage('todos-backbone'),
    doing: function() {
      return new TodoList(this.where({ finished: false }))
    },
    finished: function() {
      return new TodoList(this.where({ finished: true }))
    },
    all: function() {
      return this
    },
    nextId: function() {
      if (!this.length) return 1
      return this.last().get('id') + 1
    }
  })

  const Todos = new TodoList()

  const TodoView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#todos-tpl').html()),
    initialize: function() {
      this.listenTo(this.model, 'change', this.render)
      this.listenTo(this.model, 'destroy', this.remove)
    },
    events: {
      'click .btn': 'del',
      'click .content': 'complete'
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()))
      return this
    },
    del: function() {
      this.model.destroy()
    },
    complete: function() {
      this.model.save({ finished: !this.model.get('finished') })
    }
  })

  const StatusModel = Backbone.Model.extend({
    defaults: function() {
      return {
        status: ALL
      }
    }
  })

  const status = new StatusModel()

  const AppView = Backbone.View.extend({
    el: '#app',
    statsTemplate: _.template($('#footer-tpl').html()),
    initialize: function() {
      this.$form = this.$('#form')
      this.$input = this.$('#input')
      this.listenTo(Todos, 'add', this.addOne)
      this.listenTo(Todos, 'all', this.render)
      this.listenTo(this.model, 'change:status', this.filterAll)
      Todos.fetch()
    },
    events: {
      'submit #form': 'inputHandle',
      'click .tab-item': 'tabHandle'
    },
    render: function() {
      if (Todos.length) {
        this.$('.tab').show()
        this.$('.footer').show()
        this.$('.footer').html(this.statsTemplate({ len: Todos.length }))
      } else {
        this.$('.tab').hide()
        this.$('.footer').hide()
      }
    },
    addOne: function(todo) {
      const view = new TodoView({ model: todo })
      this.$('#todos-list').append(view.render().el)
    },
    filterAll: function() {
      this.$('#todos-list').empty()
      if (this.model.get('status') === ALL) {
        Todos.each(this.addOne, this)
      } else if (this.model.get('status') === DOING) {
        Todos.doing().each(this.addOne, this)
      } else if (this.model.get('status') === FINISHED) {
        Todos.finished().each(this.addOne, this)
      }
    },
    tabHandle: function(e) {
      $('.tab-item').removeClass('active')
      $(e.currentTarget).addClass('active')
      this.model.set('status', $(e.currentTarget).attr('name'))
    },
    inputHandle: function(e) {
      e.preventDefault()
      if (this.$input.val()) {
        Todos.create({ content: this.$input.val() })
        this.$input.val('')
      }
    }
  })

  const appView = new AppView({ model: status })
})
