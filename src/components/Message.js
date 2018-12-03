import React from 'react'

export default class Message extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      newlabels: this.props.messageInfo.labels,
      newread: this.props.messageInfo.read,
      newstarred: this.props.messageInfo.starred,
    }
    console.log("this.state: ", this.state)
  }

  selectMessage = (id) => {
    this.props.selectMessageCB(id)
  }

  render(){
    console.log("this.props.", this.props)
    const subject = this.props.messageInfo.subject
    const body = this.props.messageInfo.body
    const labels = this.props.messageInfo.labels
    const starred = this.props.messageInfo.starred
    const id = this.props.messageInfo.id
    return(
      <div className={this.state.read ? "row message read" : "row message unread"}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" onClick={this.selectMessage(id)} />
            </div>
            <div className="col-xs-2">
              {starred ? <i class="star fa fa-star"></i> : <i className="star fa fa-star-o"></i>}
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          <a href="#">
            {labels ? labels.map((label, i) =>
              <span className="label label-warning">{labels[i]}</span>
            ) : ''}
            {subject}
          </a>
        </div>
      </div>
    )
  }
}
