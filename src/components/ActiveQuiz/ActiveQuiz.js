import React from 'react';
import classes from './ActivaQuiz.module.scss';
import AnswersList from './AnswersList/AnswersList';

const ActiveQuiz = (props) => {
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <span>
          <b>1. </b>
          {props.question}
        </span>
        <small>4 из 12</small>
      </p>
      <AnswersList
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}
      />
    </div>
  );
};

export default ActiveQuiz;
