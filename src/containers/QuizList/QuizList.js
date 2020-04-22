import React, { Component } from 'react';
import classes from './QuizList.module.scss';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export default class QuizList extends Component {
  renderQuizes() {
    return [1, 2, 3].map((quiz, index) => {
      return (
        <li key={index}>
          <NavLink to={`/quiz/${quiz}`}>Тест {quiz}</NavLink>
        </li>
      );
    });
  }

  componentDidMount() {
    axios
      .get('https://quiz-5af9e.firebaseio.com/quiz.json')
      .then((response) => {
        console.log(response);
      });
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>

          <ul>{this.renderQuizes()}</ul>
        </div>
      </div>
    );
  }
}
