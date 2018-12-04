import React from 'react'

export default class ComposeMessageForm extends React.Component {

  state ={
    subject: '',
    body: ''
  }

  formToState = (string, propToUpdate) => {
    console.log("string: ", string, "propToUpdate: ", propToUpdate)
    this.setState({
      ...this.state,
      [propToUpdate]: string
    })
  }

  sendMessage = () => {
    const newMessage ={
      subject: this.state.subject,
      body: this.state.body
    }
    this.props.sendMessageCB(newMessage)
  }

  render(){
    return(
      <div className="container">
        <form className="form-horizontal well" onSubmit={(e) => {e.preventDefault(); this.sendMessage()}}>
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
              <h4>Compose Message</h4>
            </div>
          </div>
          <div className="form-group">
            <label name="subject" className="col-sm-2 control-label">Subject</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" onChange={(e) => this.formToState(e.target.value, e.target.name)} required/>
            </div>
          </div>
          <div className="form-group">
            <label name="body" className="col-sm-2 control-label">Body</label>
            <div className="col-sm-8">
              <textarea name="body" id="body" className="form-control" onChange={(e) => this.formToState(e.target.value, e.target.name)} required></textarea>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
              <input type="submit" value="Send" className="btn btn-primary"/>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
