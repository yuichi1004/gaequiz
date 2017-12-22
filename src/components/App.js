import React, { Component } from 'react'

import Quiz from '../components/Quiz'
import Start from '../components/Start'
import './App.css'

class App extends Component {
  start(a) {
    console.log('start', a)
  }

  render() {
    switch (this.props.screen) {
      case 'LOAD':
        return (
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">Quiz App</h1>
            </header>
            <div>Now Loading...</div>
          </div>
        )
      case 'START':
        return (
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">Quiz App</h1>
            </header>
            <Start onStart={this.props.onStart} onHighScore={this.props.onHighScore} />
          </div>
        )

      case 'QUIZ':
        return (
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">Quiz App</h1>
            </header>
            <Quiz quiz={this.props.quiz[this.props.index]} onAnswer={this.props.onAnswer} />
          </div>
        )

      case 'SCORE':
        var myscore = ""
        if (this.props.name !== undefined) {
          myscore = <p> Your score is {this.props.score}. </p>
        }

        var highscores = ""
        if (this.props.highscores !== undefined) {
          const scores = this.props.highscores.map((hs, index) =>
            <tr key={index}><td>{hs.name}</td><td className="Point">{hs.score} pt</td></tr>
          );
          highscores = 
            <table className="Score">
              <tbody>
                <tr>
                  <th>name</th>
                  <th>socre</th>
                </tr>
                {scores}
              </tbody>
            </table>
        }

        return (
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">Quiz App</h1>
            </header>
            {myscore}
            {highscores}   
          </div>
        )
      default:
        return (<div>Error: Unknown screen</div>)
    }
  }
}

export default App;
