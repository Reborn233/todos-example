const ALL = 'all'
const DOING = 'doing'
const FINISHED = 'finished'
const note = {
  name: 'Reborn',
  notes: [
    {
      id: 1,
      content: 'Vue js',
      finished: false
    },
    {
      id: 2,
      content: 'React js',
      finished: true
    },
    {
      id: 3,
      content: 'Angular js',
      finished: false
    }
  ]
}
const state = {
  status: ALL,
  id: 0
}
const tabs = [
  {
    label: '全部',
    value: ALL
  },
  {
    label: '进行中',
    value: DOING
  },
  {
    label: '已完成',
    value: FINISHED
  }
]

function save(key, data) {
  if (typeof data === 'string') {
    localStorage.setItem(key, data)
  }
  if (typeof data === 'object') {
    localStorage.setItem(key, JSON.stringify(data))
  }
}

function fetch(key) {
  const notes = localStorage.getItem(key)
  return notes ? notes : null
}
