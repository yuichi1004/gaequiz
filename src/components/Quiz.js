import React, { Component } from 'react'
import './Quiz.css'

class Quiz extends Component {
  render() {
    const { quiz, onAnswer } = this.props
    return (
      <div className="Quiz">
        <h1>{quiz.question}</h1>
        <ol>
          <li onClick={() => onAnswer(1)}>{quiz.option1}</li>
          <li onClick={() => onAnswer(2)}>{quiz.option2}</li>
          <li onClick={() => onAnswer(3)}>{quiz.option3}</li>
        </ol>
      </div>
    )
  }
}

export default Quiz;
