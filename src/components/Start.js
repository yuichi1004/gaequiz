import React, { Component } from 'react'

class Start extends Component {
  render() {
    return (
      <div className="Start">
        <h1>Type your name to start</h1>
        <p>
          <input type="text" ref={node => {this.input = node}} />
          <input type="button" value="Start" onClick={() => {this.props.onStart(this.input.value)}} />
        </p>
        <a href="javascript:void(0)" onClick={this.props.onHighScore}>see high score</a>
      </div>
    )
  }
}

export default Start;

