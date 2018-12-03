import React, {Component} from 'react'
import './App.css'
import Toolbar from './components/Toolbar.js'
import Messages from './components/Messages.js'

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      isLoaded: false,
      messages: [],
    }
  }

  async componentDidMount() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}messages`)
    const jsonResponse = await response.json()
    console.log("recieved response: ", jsonResponse)
    this.setState({
      messages: jsonResponse,
      isLoaded: true,
    })
  }

  findIndexOfId = (findId) => {
    console.log("type of findId", typeof findId)
    const messages = this.state.messages
    for(let i = 0; i < messages.length; i++){
      if(messages[i].id === parseInt(findId)){
        return i
      }
    }
    return -1
  }

  selectMessageCB = (id) => {
    console.log("id: ", id)
    console.log("this.state: ", this.state.messages)
    console.log("set state here")

    let i = this.findIndexOfId(id)
    //flip the selected value in that message
    let newMessage = {
      ...this.state.messages[i],
      selected: (!this.state.messages[i].selected || false)
    }
    //set new state
    this.setState({
      ...this.state,
      messages:[
        ...this.state.messages.slice(0, i),
        newMessage,
        ...this.state.messages.slice(i + 1)
      ]
    })
  }

  updateStarCB = (id) => {
    let i = this.findIndexOfId(id)
    //toggle starred
    console.log("i: ", i)
    console.log("this.state.messages: ", this.state.messages)
    let newMessage = {
      ...this.state.messages[i],
      starred: (!this.state.messages[i].starred)
    }
    //set new state
    this.setState({
      ...this.state,
      messages: [
        ...this.state.messages.slice(0, i),
        newMessage,
        ...this.state.messages.slice(i + 1)
      ]
    })

  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      )
    } else {
      return (
          <div>
          <Toolbar/>
        <Messages
          messages={this.state.messages}
          selectMessageCB={this.selectMessageCB}
          updateStarCB={this.updateStarCB}
        />
        </div>
      )
    }
  }

}

export default App
