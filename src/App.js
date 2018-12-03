import React, {Component} from 'react'
import './App.css'
import Toolbar from './components/Toolbar.js'
import Messages from './components/Messages.js'

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      isLoaded: false,
      messages: {},
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
          <Messages messages={this.state.messages}/>
        </div>
      )
    }
  }

}

export default App
