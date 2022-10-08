import React from 'react';
import FormList from 'components/FormList/FormList';
import newId from 'utils/newId/newId';
import MyButton from 'components/UI/button/MyButton';
import MyInput from 'components/UI/input/MyInput';
import './Form.scss';

type FormProps = Record<string, never>;

type FormItemState = {
  id: number;
  name: string;
  surname: string;
  image: string;
};

type FormErrors = {
  name: string;
  surname: string;
  [x: string]: string;
};

type FormState = {
  formItems: FormItemState[];
  formErrors: FormErrors;
  nameValid: boolean;
  surnameValid: boolean;
  formValid: boolean;
  firstTypingAfterInit: boolean;
};

class Form extends React.Component<FormProps, FormState> {
  inputName: React.RefObject<HTMLInputElement>;
  inputSurname: React.RefObject<HTMLInputElement>;
  submitButton: React.RefObject<HTMLButtonElement>;
  inputImage: React.RefObject<HTMLInputElement>;

  constructor(props: FormProps) {
    super(props);
    this.inputName = React.createRef<HTMLInputElement>();
    this.inputSurname = React.createRef<HTMLInputElement>();
    this.submitButton = React.createRef<HTMLButtonElement>();
    this.inputImage = React.createRef<HTMLInputElement>();
    this.state = {
      formItems: [],
      formErrors: {
        name: '',
        surname: '',
      },
      nameValid: false,
      surnameValid: false,
      formValid: false,
      firstTypingAfterInit: true,
    };
  }

  handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = this.inputName.current;
    const surname = this.inputSurname.current;
    const button = this.submitButton.current;
    const image = this.inputImage.current;
    console.log(URL.createObjectURL(image.files[0]));
    if (name && surname && button) {
      console.log('Отправленное имя: ' + name.value + ' ' + surname.value);

      const fieldValidationErrors = this.state.formErrors;
      let nameValid = this.state.nameValid;
      let surnameValid = this.state.surnameValid;
      nameValid = name.value.length >= 2;
      fieldValidationErrors.name = nameValid ? '' : 'Name must contain at least 2 character';
      surnameValid = surname.value.length >= 2;
      fieldValidationErrors.surname = surnameValid
        ? ''
        : 'Surname must contain at least 2 character';
      let formValid = this.state.formValid;
      formValid = nameValid && surnameValid;
      if (formValid) {
        const newItem = {
          id: newId(),
          name: name.value,
          surname: surname.value,
        };

        this.setState((prevState) => {
          prevState.formItems.push(newItem);
          return {
            ...prevState,
            formErrors: fieldValidationErrors,
            nameValid: nameValid,
            surnameValid: surnameValid,
            formValid: formValid,
            firstTypingAfterInit: true,
          };
        });
        name.value = '';
        surname.value = '';
        button.disabled = true;
      } else {
        this.setState({
          formErrors: fieldValidationErrors,
          nameValid: nameValid,
          surnameValid: surnameValid,
          formValid: formValid,
          firstTypingAfterInit: false,
        });
        button.disabled = true;
      }
      console.log(this.state);
    }
  };

  handleChange = () => {
    const name = this.inputName.current;
    const surname = this.inputSurname.current;
    const button = this.submitButton.current;
    if (button && this.state.firstTypingAfterInit) {
      button.disabled = false;
    }

    console.log(name?.value.length);
    if (name && name.value.length >= 2 && button) {
      const nameValid = true;
      const formValid = this.state.surnameValid && nameValid;
      if (formValid) {
        button.disabled = false;
      }

      this.setState((prevState) => ({
        ...prevState,
        formErrors: {
          ...prevState.formErrors,
          name: '',
        },
        nameValid: nameValid,
        formValid: formValid,
      }));
    }

    if (surname && surname.value.length >= 2 && button) {
      const surnameValid = true;
      const formValid = this.state.nameValid && surnameValid;
      if (formValid) {
        button.disabled = false;
      }

      this.setState((prevState) => ({
        ...prevState,
        formErrors: {
          ...prevState.formErrors,
          surname: '',
        },
        surnameValid: surnameValid,
        formValid: formValid,
      }));
    }
  };

  // onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.currentTarget.files && event.currentTarget.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = (e: ProgressEvent<FileReader>) => {
  //       this.setState({ image: e.current.result });
  //     };
  //     reader.readAsDataURL(event.currentTarget.files[0]);
  //   }
  // };

  toggleErrorClass(error: string) {
    return error.length === 0 ? '' : 'error';
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <form onSubmit={this.handleSubmitForm}>
          <label>
            Name:
            <MyInput type="text" name="name" ref={this.inputName} onChange={this.handleChange} />
          </label>
          <div className={`hidden ${this.toggleErrorClass(this.state.formErrors.name)}`}>
            {this.state.formErrors.name}
          </div>
          <label>
            Surname:
            <MyInput
              type="text"
              name="surname"
              ref={this.inputSurname}
              onChange={this.handleChange}
            />
          </label>
          <div className={`hidden ${this.toggleErrorClass(this.state.formErrors.surname)}`}>
            {this.state.formErrors.surname}
          </div>
          <label>
            Image:
            <MyInput
              type="file"
              name="image"
              ref={this.inputImage}
              // onChange={this.onImageChange}
            />
          </label>
          <MyButton
            ref={this.submitButton}
            disabled={this.state.firstTypingAfterInit || !this.state.formValid}
          >
            Submit
          </MyButton>
        </form>
        <FormList formItems={this.state.formItems} />
      </div>
    );
  }
}

export default Form;

// validateField = (item: FormItemState) => {
//   this.setState(
//     { formErrors: fieldValidationErrors, nameValid: nameValid, surnameValid: surnameValid },
//     this.validateForm(item)
//   );
// };
// validateForm = (item: FormItemState) => {
//   this.setState(
//     { formValid: this.state.nameValid && this.state.surnameValid },
//     () => () => this.renderForm(item)
//   );
// };
// renderForm(newItem: FormItemState) {
//   if (this.state.formValid) {
//     this.setState(
//       (prevState) => {
//         prevState.formItems.push(newItem);
//         return prevState;
//       },
//       () => {
//         this.validateField(newItem);
//       }
//     );
//     // name.value = '';
//     // surname.value = '';
//     console.log(this.state);
//   }
// }

// if (!name || !surname) {
//   this.setState({
//     formErrors: {
//       name: (name as HTMLInputElement).value ? '' : 'Name must contain at least 1 character',
//       surname: (surname as HTMLInputElement).value
//         ? ''
//         : 'Surname must contain at least 1 character',
//     },
//     nameValid: false,
//     surnameValid: false,
//     formValid: false,
//   });
// }
