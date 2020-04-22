import React, { Component } from 'react';
import classes from './Quiz.module.scss';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import axios from '../../axios/axios-quiz';
import Loader from '../../components/UI/Loader/Loader';

class Quiz extends Component {
  state = {
    results: {}, // {[id]: success error}
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [],
    loading: true,
  };

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
    try {
      const response = await axios.get(
        `quizes/${this.props.match.params.id}.json`
      );
      this.setState({ quiz: response.data, loading: false });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          {this.state.isFinished ? (
            <FinishedQuiz
              results={this.state.results}
              quiz={this.state.quiz}
              onRetry={this.retryHandler}
            />
          ) : this.state.loading ? (
            <Loader />
          ) : (
            <ActiveQuiz
              question={this.state.quiz[this.state.activeQuestion].question}
              answers={this.state.quiz[this.state.activeQuestion].answers}
              onAnswerClick={this.onAnswerClickHandler}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1}
              state={this.state.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Quiz;
