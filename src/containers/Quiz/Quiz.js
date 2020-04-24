import React, { Component } from 'react';
import classes from './Quiz.module.scss';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizById } from '../../store/actions/quiz';

class Quiz extends Component {
  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      if (Object.values(this.state.answerState)[0] === 'success') {
        return;
      }
    }

    const active = this.state.activeQuestion;
    const question = this.state.quiz[active];
    const results = this.state.results;

    if (answerId === question.rightAnswerId) {
      if (!results[question.id]) {
        results[question.id] = 'success';
      }

      this.setState({
        answerState: {
          [answerId]: 'success',
        },
        results,
      });

      const timeout = setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({ isFinished: true });
        } else {
          this.setState({ activeQuestion: active + 1 });
        }
        this.setState({ answerState: null });
        clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = 'error';
      this.setState({
        answerState: {
          [answerId]: 'error',
        },
        results: results,
      });
    }
  };

  retryHandler = () => {
    this.setState({
      results: {}, // {[id]: success error}
      isFinished: false,
      activeQuestion: 0,
      answerState: null,
    });
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  async componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id);
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          {this.props.isFinished ? (
            <FinishedQuiz
              results={this.props.results}
              quiz={this.props.quiz}
              onRetry={this.retryHandler}
            />
          ) : this.props.loading || !this.props.quiz ? (
            <Loader />
          ) : (
            <ActiveQuiz
              question={this.props.quiz[this.props.activeQuestion].question}
              answers={this.props.quiz[this.props.activeQuestion].answers}
              onAnswerClick={this.onAnswerClickHandler}
              quizLength={this.props.quiz.length}
              answerNumber={this.props.activeQuestion + 1}
              state={this.props.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizById(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
