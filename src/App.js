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
      composeMessage: false
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
    const messages = this.state.messages
    for(let i = 0; i < messages.length; i++){
      if(messages[i].id === parseInt(findId)){
        return i
      }
    }
    return -1
  }

  //takes an array of ids to be changed, a command(string)
  //returns the response from the server (an array of the new messages, with the patch applied.)
  updateMessages = async(ids, command, keyAndVal) => {
    console.log("keyAndVal.key: ", keyAndVal.key, "keyAndVal.value", keyAndVal.value)
    const response = await fetch(`${process.env.REACT_APP_API_URL}messages`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messageIds: ids,
        command: command,
        [keyAndVal.key]: keyAndVal.value
      })
    })
    const jsonResponse = await response.json()
    return jsonResponse
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
    const ids = [parseInt(id)]
    //set the new state
    this.setState({
      ...this.state,
      messages: await this.updateMessages(ids, "star")
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

  getUnreadMessages = (list) => {
    let retArray = []
    for(let i = 0; i < list.length; i++){
      if(!list[i].read){
        retArray.push(list[i])
      }
    }
    return retArray
  }

  bulkSelectCB = () => {
    const messages = this.state.messages
    const selectedMessages = this.getSelectedMessages(messages)
    let newMessages = []
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
    }
    //if all of the messages are selected, deselect them all
    else if (selectedMessages.length === messages.length){
      for(let i = 0; i < messages.length; i++){
        let newMessage = {
          ...messages[i],
          selected: false
        }
        newMessages.push(newMessage)
      }
    }
    //update State
    this.setState({
      ...this.state,
      messages: newMessages
    })
  }

  markAsReadCB = async() => {
    const messages = this.state.messages
    let unreadAndSelected = []
    //if the message is unread and selected,
    //push the id into unreadAndSelected.
    for(let i = 0; i < messages.length; i++){
      if(messages[i].selected && !messages[i].read){
        unreadAndSelected.push(messages[i].id)
      }
    }
    //send the id's to the backend
    const response = await this.updateMessages(unreadAndSelected, "read", {key: "read", val:true})
    console.log("response: ", response)
    //set new state
    this.setState({
      ...this.state,
      messages: response
    })
  }

  markAsUnreadCB = async() => {
    const messages = this.state.messages
    let readAndSelected = []
    //if the message is read and selected,
    //push the id into readAndSelected.
    for(let i = 0; i < messages.length; i++){
      if(messages[i].selected && messages[i].read){
        readAndSelected.push(messages[i].id)
      }
    }
    //send the id's to the backend
    const response = await this.updateMessages(readAndSelected, "read", {key: "read", val:false})
    console.log("response: ", response)
    //set new state
    this.setState({
      ...this.state,
      messages: response
    })
  }

  deleteMessagesCB = async () => {
    console.log("delete messages")
    const messages = this.state.messages
    let toDelete = []
    //if the message is selected,
    //push the id into toDelete.
    for(let i = 0; i < messages.length; i++){
      if(messages[i].selected){
        toDelete.push(messages[i].id)
      }
    }
    //send the id's to the backend
    const response = await this.updateMessages(toDelete, "delete")
    console.log("response: ", response)
    //set new state
    this.setState({
      ...this.state,
      messages: response
    })
  }

  addLabelsCB = async(label) => {
    const messages = this.state.messages
    let addLabelsTo = []
    //if the message is selected,
    //push the id into addLabelsToThese.
    for(let i = 0; i < messages.length; i++){
      if(messages[i].selected){
        addLabelsTo.push(messages[i].id)
      }
    }
    //send the id's to the backend
    const response = await this.updateMessages(addLabelsTo, "addLabel", {key: "label", value: label})
    //update the state
    this.setState({
      ...this.state,
      messages: response
    })
  }

  removeLabelsCB = async(label) => {
    console.log("removeLabels")
    const messages = this.state.messages
    let removeLabelsFrom = []
    //if the message is selected,
    //push the id into removeLabelsFrom.
    for(let i = 0; i < messages.length; i++){
      if(messages[i].selected){
        removeLabelsFrom.push(messages[i].id)
      }
    }
    //send the id's to the backend
    const response = await this.updateMessages(removeLabelsFrom, "removeLabel", {key: "label", value: label})
    console.log("response: ", response)
    //update the state
    this.setState({
      ...this.state,
      messages: response
    })
  }

  composeMessageCB = () => {
    console.log("show compose message form")
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
          markAsReadCB = {this.markAsReadCB}
          markAsUnreadCB = {this.markAsUnreadCB}
          numOfUnreadMessages = {this.getUnreadMessages(this.state.messages).length}
          deleteMessagesCB = {this.deleteMessagesCB}
          addLabelsCB = {this.addLabelsCB}
          removeLabelsCB = {this.removeLabelsCB}
          composeMessageCB = {this.composeMessageCB}
        />
      {composeMessage ? <ComposeMessageForm/> : ''}
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
