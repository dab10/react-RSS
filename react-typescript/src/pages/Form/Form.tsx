import React from 'react';
import FormList from 'components/FormList/FormList';
import newId from 'utils/newId/newId';
import MyButton from 'components/UI/button/MyButton';
import MyInput from 'components/UI/input/MyInput';

type FormProps = Record<string, never>;

type FormItemState = {
  id: number;
  name: string;
  surname: string;
};

type FormState = {
  formItems: FormItemState[];
};

class Form extends React.Component<FormProps, FormState> {
  inputName: React.RefObject<HTMLInputElement>;
  inputSurname: React.RefObject<HTMLInputElement>;
  submitButton: React.RefObject<HTMLButtonElement>;

  constructor(props: FormProps) {
    super(props);
    this.inputName = React.createRef<HTMLInputElement>();
    this.inputSurname = React.createRef<HTMLInputElement>();
    this.submitButton = React.createRef<HTMLButtonElement>();
    this.state = {
      formItems: [],
    };
  }

  handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = this.inputName.current;
    const surname = this.inputSurname.current;
    const button = this.submitButton.current;
    if (!name && !surname) {
      console.log('empty');
    }

    if (name && surname && name.value && surname.value && button) {
      console.log('Отправленное имя: ' + name.value + ' ' + surname.value);
      // button.disabled = true;
      console.log(name.value);
      console.log(surname.value);
      const newItem = {
        id: newId(),
        name: name.value,
        surname: surname.value,
      };

      this.setState((prevState) => {
        prevState.formItems.push(newItem);
        return prevState;
      });

      console.log(this.state);
    }
  };

  render() {
    console.log(this.state);

    return (
      <div>
        <form onSubmit={this.handleSubmitForm}>
          <label>
            Name:
            <MyInput type="text" ref={this.inputName} />
          </label>
          <label>
            Surname:
            <MyInput type="text" ref={this.inputSurname} />
          </label>
          {/* <input type="submit" value="Submit" ref={this.submitButton} /> */}
          <MyButton ref={this.submitButton}>Submit</MyButton>
        </form>
        <FormList formItems={this.state.formItems} />
      </div>
    );
  }
}

export default Form;
