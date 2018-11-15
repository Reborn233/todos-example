$(function() {
  //克隆对象
  Object.prototype.clone = function() {
    var obj = {}
    for (var p in this) obj[p] = this[p]
    return obj
  }
  const App = {
    title: 'Notes - Knockout',
    tabs: tabs,
    status: ko.observable(ALL),
    notes: ko.observableArray(
      JSON.parse(fetch('notes-knockout')) || note.notes
    ),
    val: ko.observable(''),
    filterNotes: ko.pureComputed(function() {
      if (App.status() === ALL) return App.notes()
      if (App.status() === DOING) return App.notes().filter(e => !e.finished)
      if (App.status() === FINISHED) return App.notes().filter(e => e.finished)
    })
  }

  App.nextId = function() {
    var len = App.notes().length
    if (!len) return 1
    return App.notes()[len - 1].id + 1
  }

  App.inputHandle = function(formElement) {
    if (!App.val()) return
    App.notes.push({
      id: App.nextId(),
      content: App.val(),
      finished: false
    })
    save('notes-knockout', App.notes())
    App.val('')
  }

  App.delHandle = function() {
    App.notes.remove(this)
    save('notes-knockout', App.notes())
  }

  App.tabHandle = function() {
    App.status(this.value)
  }

  App.rowClickHandle = function() {
    const temp = this.clone()
    temp.finished = !temp.finished
    const index = App.notes.indexOf(this)
    App.notes.replace(this, temp)
    save('notes-knockout', App.notes())
  }

  ko.applyBindings(App)
})
