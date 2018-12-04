import React from 'react'

export default class Message extends React.Component {

  // state = {
  //   isChecked: false
  // }
  //
  // checkTheBox = () => {
  //   this.setState({
  //     isChecked: !this.state.isChecked
  //   })
  // }


  checkStateOfMessage(read, selected){
    if(read && selected){
      //console.log("read && selected")
      return "row message read selected"
    }
    else if (!read && selected){
      //console.log("unread && selected")
      return "row message unread selected"
    }
    else if (read && (!selected || selected === undefined)){
      //console.log("unread && selected")
      return "row message read"
    }
    else if (!read && (!selected || selected === undefined)){
      //console.log("unread && selected")
      return "row message unread"
    }
    else {
      //console.log("Not sure what happened.")
    }

  }


  render(){
    const isSelected = this.props.isSelected
    const selectedMessages = this.props.selectedMessages
    const {
      subject,
      body,
      labels,
      starred,
      id,
      read,
      selected
    } = this.props.messageInfo
    return(

      <div className={this.checkStateOfMessage(read,selected)}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox"
                checked={isSelected ? "checked" : ''}
                onChange={(e) =>{e.preventDefault();this.props.selectMessageCB(id)}}
               />
            </div>
            <div className="col-xs-2" onClick={(e)=>{console.log(e.target);this.props.updateStarCB(e.target.id)}}>
              {starred ? <i className="star fa fa-star" id={id}></i> : <i className="star fa fa-star-o" id={id}></i>}
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          <a href="#">
            {labels ? labels.map((label, i) =>
              <span className="label label-warning" key={i}>{labels[i]}</span>
            ) : ''}
            {subject}
          </a>
        </div>
      </div>
    )
  }
}
