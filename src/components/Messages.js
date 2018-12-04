import React from 'react'
import Message from './Message.js'

export default class Messages extends React.Component{


  render(){
    return(
      <div className="container">
        <div className="list-group">
          <div className="list-group-item">
            {this.props.messages.map((elem, i)=>
              <Message
                key={elem.id}
                messageInfo={this.props.messages[i]}
                selectMessageCB={this.props.selectMessageCB}
                updateStarCB={this.props.updateStarCB}
              />
            )}
          </div>
        </div>
      </div>
      )
  }
}
