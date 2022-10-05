import React from 'react';

type FormProps = Record<string, never>;

class Form extends React.Component<FormProps> {
  inputName: React.RefObject<HTMLInputElement>;
  inputSurname: React.RefObject<HTMLInputElement>;

  constructor(props: FormProps) {
    super(props);
    this.inputName = React.createRef<HTMLInputElement>();
    this.inputSurname = React.createRef<HTMLInputElement>();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (this.inputName.current !== null && this.inputSurname.current !== null) {
      alert(
        'Отправленное имя: ' + this.inputName.current.value + ' ' + this.inputSurname.current.value
      );
    }
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Имя:
          <input type="text" ref={this.inputName} />
        </label>
        <label>
          Фамилия:
          <input type="text" ref={this.inputSurname} />
        </label>
        <input type="submit" value="Отправить" />
      </form>
    );
  }
}

export default Form;
