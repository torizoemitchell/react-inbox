import React from 'react'
// import FilterLink from '../containers/FilterLink'
// import { VisibilityFilters } from '../actions'

export default class Toolbar extends React.Component {

  selectionIndicator = (selectedMessages, messages) => {
    if(selectedMessages.length === messages.length){
      // console.log("all checked")
      return "fa fa-check-square-o"
    }
    else if(selectedMessages.length > 0){
      // console.log("some checked")
      return "fa fa-minus-square-o"
    }
    else{
      // console.log("none checked")
      return "fa fa-square-o"
    }
  }


  render(){
    const {
      selectedMessages,
      messages,
      bulkSelectCB,
      markAsReadCB,
      markAsUnreadCB,
      deleteMessagesCB,
      addLabelsCB,
      removeLabelsCB,
      composeMessageCB,
      numOfUnreadMessages
    } = this.props

    return(
      <div className="container">
        <div className="row toolbar">
          <div className="col-md-12">
            <p className="pull-right">
              <span className="badge badge">{numOfUnreadMessages}</span>
            {numOfUnreadMessages === 1 ? "unread message" : "unread messages"}
            </p>

            <a className="btn btn-danger" href="somewhere" onClick={(e) => {e.preventDefault(); composeMessageCB()}}>
              <i className="fa fa-plus"></i>
            </a>

            <button className="btn btn-default" onClick={(e) => {e.preventDefault(); bulkSelectCB()}}>
              <i className={this.selectionIndicator(selectedMessages, messages)}></i>
            </button>

            <button className="btn btn-default" onClick={(e) => {e.preventDefault(); markAsReadCB()}} disabled={selectedMessages.length === 0 ? true : false}>Mark As Read</button>

          <button className="btn btn-default" onClick={(e) => {e.preventDefault(); markAsUnreadCB()}} disabled={selectedMessages.length === 0 ? true : false}>Mark As Unread</button>

        <select className="form-control label-select" disabled={selectedMessages.length === 0 ? true : false} onChange={(e) => {e.preventDefault(); addLabelsCB(e.target.value)}}>
              <option>Apply label</option>
              <option value="dev">dev</option>
              <option value="personal">personal</option>
              <option value="gschool">gschool</option>
            </select>

            <select className="form-control label-select" disabled={selectedMessages.length === 0 ? true : false} onChange={(e) => {e.preventDefault(); removeLabelsCB(e.target.value)}}>
              <option>Remove label</option>
              <option value="dev">dev</option>
              <option value="personal">personal</option>
              <option value="gschool">gschool</option>
            </select>

            <button className="btn btn-default" onClick={(e) => {e.preventDefault(); deleteMessagesCB()}} disabled={selectedMessages.length === 0 ? true : false}>
              <i className="fa fa-trash-o"></i>
            </button>
          </div>
        </div>
      </div>
    )
  }
}
