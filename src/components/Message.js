import React from 'react'

export default class Message extends React.Component {

  state = {
    selected: false
  }

  selectMessage = (id) => {
    this.setState({
      selected: !this.state.selected
    })
  }

  checkStateOfMessage(read, selected){
    if(read && selected){
      console.log("read && selected")
      return "row message read selected"
    }
    else if (!read && selected){
      console.log("unread && selected")
      return "row message unread selected"
    }
    else if (read && !selected){
      console.log("unread && selected")
      return "row message unread selected"
    }
    else if (!read && !selected){
      console.log("unread && selected")
      return "row message unread"
    }
    else {
      console.log("Not sure what happened.")
    }

  }


  render(){
    console.log("this.props.", this.props)
    const {
      subject,
      body,
      labels,
      starred,
      id,
      read
    } = this.props.messageInfo
    const selected = this.state.selected

    return(

      <div className={this.checkStateOfMessage(read, selected)}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" onClick={(e) =>{e.preventDefault();this.selectMessage(id)}} />
            </div>
            <div className="col-xs-2">
              {starred ? <i className="star fa fa-star"></i> : <i className="star fa fa-star-o"></i>}
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
