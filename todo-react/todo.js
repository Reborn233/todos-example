class App extends React.Component {
  state = {
    notes: JSON.parse(fetch('notes-react')) || note.notes,
    status: ALL
  }
  handleInput = e => {
    e.preventDefault()
    const notes = this.state.notes
    const $input = document.getElementById('input')
    if (!$input.value) {
      return
    }
    const item = {
      id: notes[notes.length - 1].id + 1,
      content: $input.value,
      finished: false
    }
    notes.push(item)
    this.setState(
      {
        notes: notes
      },
      () => {
        save('notes-react', this.state.notes)
        $input.value = ''
      }
    )
  }

  tabHandle = e => {
    const status = e.currentTarget.getAttribute('name')
    this.setState({
      status: status
    })
  }

  rowClickHandle = e => {
    const notes = this.state.notes
    const id = e.currentTarget.parentNode.getAttribute('name')
    const row = notes.filter(item => item.id === Number(id))[0]
    row.finished = !row.finished
    this.setState(
      {
        notes: notes
      },
      () => {
        save('notes-react', this.state.notes)
      }
    )
  }

  rowDelHandle = e => {
    const notes = this.state.notes
    const id = e.currentTarget.parentNode.getAttribute('name')
    const index = notes.findIndex(e => e.id === Number(id))
    notes.splice(index, 1)
    this.setState(
      {
        notes: notes
      },
      () => {
        save('notes-react', this.state.notes)
      }
    )
  }

  render() {
    return (
      <div>
        <h2 className="center">Note - React</h2>
        <FormInput
          len={this.state.notes.length}
          handleInput={this.handleInput}
        />
        <Tab status={this.state.status} tabHandle={this.tabHandle} />
        <List
          data={this.state.notes}
          status={this.state.status}
          rowClickHandle={this.rowClickHandle}
          rowDelHandle={this.rowDelHandle}
        />
      </div>
    )
  }
}

class FormInput extends React.Component {
  render() {
    const { len, handleInput } = this.props
    return (
      <form id="form" onSubmit={handleInput}>
        <input id="input" autoFocus type="text" placeholder="写点什么..." />
        <p className="hint">一共 {len} 件事情 </p>
      </form>
    )
  }
}

class Tab extends React.Component {
  render() {
    const { status, tabHandle } = this.props
    return (
      <div className="tab">
        {tabs.map((item, index) => {
          const cname = status === item.value ? `tab-item active` : `tab-item`
          return (
            <div
              onClick={tabHandle}
              className={cname}
              name={item.value}
              key={index}
            >
              {item.label}
            </div>
          )
        })}
      </div>
    )
  }
}

class List extends React.Component {
  filterData = () => {
    let res = []
    if (this.props.status === DOING) {
      res = this.props.data.filter(e => !e.finished)
    } else if (this.props.status === FINISHED) {
      res = this.props.data.filter(e => e.finished)
    } else {
      res = this.props.data
    }
    return res
  }
  render() {
    const { rowClickHandle, rowDelHandle } = this.props
    return (
      <div className="tab-container">
        <ol>
          {this.filterData().map(item => {
            return (
              <ListItem
                key={item.id}
                id={item.id}
                note={item.content}
                status={item.finished}
                completeHandle={rowClickHandle}
                deleteHanlde={rowDelHandle}
              />
            )
          })}
        </ol>
      </div>
    )
  }
}

class ListItem extends React.Component {
  render() {
    const { id, note, status, completeHandle, deleteHanlde } = this.props
    const cname = status ? `content del` : `content`
    return (
      <li name={id}>
        <span className={cname} onClick={completeHandle}>
          {note}
        </span>
        <span className="btn" onClick={deleteHanlde}>
          删除
        </span>
      </li>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
