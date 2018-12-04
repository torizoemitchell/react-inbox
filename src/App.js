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
      ...this.state,
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

  //does not persist on page refresh
  selectMessageCB = (id) => {
    let i = this.findIndexOfId(id)
    //toggle the value of selected on the message at that index
    const newMessage = {
      ...this.state.messages[i],
      selected: !this.state.messages[i].selected
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

    //check to see if the message is already selected
    // for(let i = 0; i < this.state.selectedMessages.length; i++){
    //   if(this.state.selectedMessages[i].id === id){
    //     //toggle off - remove from state
    //     console.log("remove")
    //     console.log("this.state.selectedMessages[i].id: ", this.state.selectedMessages[i].id)
    //     console.log("id: ", id)
    //     this.setState({
    //       ...this.setState,
    //       selectedMessages: this.state.selectedMessages.filter((message) => message.id != id)
    //     })
    //     return
    //   }else{
    //     console.log("adding to selected messages")
    //     this.setState({
    //       ...this.state,
    //       selectedMessages: [
    //         ...this.state.selectedMessages,
    //         this.state.messages[i]
    //       ]
    //     })
    //     return
    //   }
    //
    // }
  }

  //persists on page refresh
  updateStarCB = async(id) => {
    //post changes to API
    const response = await fetch(`${process.env.REACT_APP_API_URL}messages`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messageIds: [parseInt(id)],
        command: "star"
      })
    })
    const jsonResponse = await response.json()
    //set the new state
    this.setState({
      ...this.state,
      messages: jsonResponse
    })
  }

  //returns an array of selected messages from the provided list
  getSelectedMessages = (list) => {
    let retArray = []
    for(let i = 0; i < list.length; i++){
      if(list[i].selected){
        retArray.push(list[i])
      }
    }
    return retArray
  }

  bulkSelectCB = () => {
    console.log("bulkSelectCB")
    const messages = this.state.messages
    const selectedMessages = this.getSelectedMessages(messages)
    let newMessages = []
    console.log("selectedMessages: ", selectedMessages.length, "messages: ", messages.length)
    //if none of the messages are selected, select them all
    if(selectedMessages.length < messages.length){
      console.log('change the state to selected for all')
      for(let i = 0; i < messages.length; i++){
        let newMessage = {
          ...messages[i],
          selected: true
        }
        newMessages.push(newMessage)
      }
      console.log("newMessages: ", newMessages)
    }
    //if all of the messages are selected, deselect them all
    else if (selectedMessages.length === messages.length){
      console.log('change the state to NOT SELECTED for all')
      for(let i = 0; i < messages.length; i++){
        let newMessage = {
          ...messages[i],
          selected: false
        }
        newMessages.push(newMessage)
      }
      console.log("newMessages: ", newMessages)
    }

    //update State
    this.setState({
      ...this.state,
      messages: newMessages
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
        <Toolbar
          messages={this.state.messages}
          selectedMessages={this.getSelectedMessages(this.state.messages)}
          bulkSelectCB = {this.bulkSelectCB}
        />
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
