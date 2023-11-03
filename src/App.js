import './App.css'
import {Component} from 'react'
import {v4 as v4id} from 'uuid'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
const EachTask = props => {
  const {details} = props
  const {task, tag} = details
  const findItem = tagsList.find(item => item.optionId === tag)

  return (
    <li className="task-list-item">
      <p className="task-para">{task}</p>
      <p className="tag-para">{findItem.displayText}</p>
    </li>
  )
}

const TagItem = props => {
  const {details, onClickTag} = props
  const {displayText, optionId, isTrue} = details
  const buttonClass = isTrue ? 'bg-button' : 'tag-button'
  const onClick = () => {
    onClickTag(optionId)
  }

  return (
    <li>
      <button type="button" className={buttonClass} onClick={onClick}>
        {displayText}
      </button>
    </li>
  )
}

class App extends Component {
  state = {
    task: '',
    tag: tagsList[0].optionId,
    list: [],
    selectTag: '',
    newList: tagsList,
  }

  onChangeSelect = e => {
    this.setState({tag: e.target.value})
  }

  onChangeTask = e => {
    this.setState({task: e.target.value})
  }

  onClickTag = id => {
    const {newList} = this.state
    const findItem = newList.find(item => item.optionId === id)

    if (findItem.isTrue === false) {
      const filteredList = newList.map(each => {
        if (each.optionId === id) {
          return {...each, isTrue: true}
        }
        return {...each, isTrue: false}
      })
      this.setState({newList: filteredList, selectTag: ''})
    }
  }

  onSubmitTask = e => {
    e.preventDefault()
    const {task, tag} = this.state
    const taskValue = {
      id: v4id(),
      task,
      tag,
    }
    this.setState(prev => ({
      list: [...prev.list, taskValue],
      task: '',
      tag: tagsList[0].optionId,
    }))
  }

  render() {
    const {tag, list, selectTag, task, newList} = this.state
    const filteredList = list.filter(each => each.tag.includes(selectTag))

    return (
      <div className="bg-container">
        <form className="form-container" onSubmit={this.onSubmitTask}>
          <h1 className="heading">Create a task!</h1>
          <div className="input-container">
            <label htmlFor="task" className="label">
              Task
            </label>
            <input
              placeholder="Enter the task here"
              id="task"
              className="input"
              value={task}
              onChange={this.onChangeTask}
            />
          </div>
          <div className="input-container">
            <label htmlFor="tags" className="label">
              Tags
            </label>
            <select
              id="tags"
              className="input"
              value={tag}
              onChange={this.onChangeSelect}
            >
              {tagsList.map(each => (
                <option value={each.optionId} key={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="add-button">
            Add Task
          </button>
        </form>
        <div className="container">
          <h1 className="tags-heading">Tags</h1>
          <ul className="ul-container">
            {newList.map(each => (
              <TagItem
                key={each.optionId}
                details={each}
                onClickTag={this.onClickTag}
              />
            ))}
          </ul>
          <h1 className="tags-heading">Tasks</h1>
          <ul className="tasks-container">
            {filteredList.length === 0 ? (
              <div className="no-tasks-para">
                <p>No Tasks Added Yet</p>
              </div>
            ) : (
              filteredList.map(each => (
                <EachTask key={each.optionId} details={each} />
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
