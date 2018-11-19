const app = new Vue({
  el: '#app',
  data() {
    return {
      notes: JSON.parse(fetch('notes-vue')) || note.notes,
      status: ALL,
      note: ''
    }
  },
  computed: {
    list() {
      if (this.status === ALL) return this.notes
      if (this.status === DOING) return this.notes.filter(e => e.finished)
      if (this.status === FINISHED) return this.notes.filter(e => !e.finished)
    }
  },
  methods: {
    tabHandle(item) {
      this.status = item.value
    },
    inputHandle() {
      if (!this.note) return
      const item = {
        id: this.notes[this.notes.length - 1].id + 1,
        content: this.note,
        finished: false
      }
      this.notes.push(item)
      save('notes-vue', this.notes)
      this.note = ''
    },
    rowClickHandle(item) {
      item.finished = !item.finished
      save('notes-vue', this.notes)
    },
    delClickHandle(id) {
      const index = this.notes.findIndex(e => e.id === Number(id))
      this.notes.splice(index, 1)
      save('notes-vue', this.notes)
    }
  }
})
