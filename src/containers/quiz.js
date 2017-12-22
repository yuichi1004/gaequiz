import { connect } from 'react-redux'

import { answer } from '../actions/index'
import Quiz from '../components/Quiz'

const mapStateToProps = state => {
  console.log(state)
  let v = {
    quiz: state.quiz[state.index]
  }
  return v
}

const mapDispatchToProps = dispatch => {
  return {
    onAnswer: (id) => {
      dispatch(answer(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
