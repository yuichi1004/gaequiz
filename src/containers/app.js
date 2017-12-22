import { connect } from 'react-redux'

import { startQuiz, doAnswer, fetchScores } from '../actions/index'
import App from '../components/App'

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    onStart: name => {
      dispatch(startQuiz(name))
    },
    onHighScore: () => {
      dispatch(fetchScores())
    },
    onAnswer: id => {
      dispatch(doAnswer(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
