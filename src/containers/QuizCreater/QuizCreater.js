import React, { Component } from 'react';
import classes from './QuizCreater.module.scss';
import Button from '../../components/UI/Button/Button';
import {
  createControl,
  validate,
  validateForm,
} from '../../form/formFramework';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';

function createOptionControl(number) {
  return createControl(
    {
      label: `Вариант ${number}`,
      errorMessage: 'Значение не может быть пустым',
      id: number,
    },
    { required: true }
  );
}

function createFormControl() {
  return {
    question: createControl(
      {
        label: 'Введите вопрос',
        errorMessage: 'Вопрос не должен быть пустым',
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };
}

export default class QuizCreater extends Component {
  state = {
    quiz: [],
    isFormValid: false,
    formControls: createFormControl(),
    rightAnswerId: 1,
  };

  changeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);
    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    });
  };

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <React.Fragment key={index}>
          <Input
            label={control.label}
            value={control.value}
            errorMessage={control.errorMessage}
            shouldValidate={!!control.validation}
            touched={control.touched}
            valid={control.valid}
            onChange={(e) => {
              this.changeHandler(e.target.value, controlName);
            }}
          />
          {index === 0 ? <hr /> : null}
        </React.Fragment>
      );
    });
  }

  addQuestionHandler = (e) => {
    e.preventDefault();

    const quiz = this.state.quiz.concat();
    const index = quiz.length + 1;

    const {
      question,
      option1,
      option2,
      option3,
      option4,
    } = this.state.formControls;

    const questionItem = {
      question: question.value,
      rightAnswerId: this.state.rightAnswerId,
      id: index,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ],
    };

    quiz.push(questionItem);

    this.setState({
      quiz,
      isFormValid: false,
      formControls: createFormControl(),
      rightAnswerId: 1,
    });
  };

  createQuizHandler = (e) => {
    e.preventDefault();
  };

  submitHandler = (e) => {
    e.preventDefault();
  };

  selectChangeHandler = (e) => {
    this.setState({ rightAnswerId: +e.target.value });
  };

  render() {
    const select = (
      <Select
        label="Выберите правильный ответ"
        value={this.state.rightAnswerId}
        onChange={this.selectChangeHandler}
        options={[
          { text: 1, value: 1 },
          { text: 2, value: 2 },
          { text: 3, value: 3 },
          { text: 4, value: 4 },
        ]}
      />
    );

    return (
      <div className={classes.QuizCreater}>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.submitHandler}>
            {this.renderControls()}

            {select}

            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Создать вопрос
            </Button>
            <Button
              type="success"
              onClick={this.createQuizHandler}
              disabled={this.state.quiz.length === 0}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
