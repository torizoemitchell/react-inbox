import React from 'react'
import Message from './Message.js'

export default class Messages extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      selectedMessages: []
    }
    console.log("Messages: this.state.selectedMessages: ", this.state.selectedMessages)
  }

  selectMessageCB = (id) => {
    // this.setState({
    //   ...selectedMessages,
    //   id
    // })
  }

  render(){
    console.log("messages.js messages: ", this.props.messages)
    return(
      <div className="container">
        <div className="list-group">
          <div className="list-group-item">
            {this.props.messages.map((elem, i)=>
              <Message
                key={elem.id}
                messageInfo={this.props.messages[i]}
                selectMessageCB={this.selectMessageCB}
              />
            )}
          </div>
        </div>
      </div>
      )
  }
}
