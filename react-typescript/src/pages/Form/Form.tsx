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
  date: string;
  select: string;
};

type FormErrors = {
  name: string;
  surname: string;
  image: string;
  date: string;
  select: string;
};

type FormState = {
  formItems: FormItemState[];
  formErrors: FormErrors;
  nameValid: boolean;
  surnameValid: boolean;
  imageValid: boolean;
  formValid: boolean;
  dateValid: boolean;
  selectValid: boolean;
  firstTypingAfterInit: boolean;
};

class Form extends React.Component<FormProps, FormState> {
  inputName: React.RefObject<HTMLInputElement>;
  inputSurname: React.RefObject<HTMLInputElement>;
  submitButton: React.RefObject<HTMLButtonElement>;
  inputImage: React.RefObject<HTMLInputElement>;
  inputDate: React.RefObject<HTMLInputElement>;
  selectCountry: React.RefObject<HTMLSelectElement>;

  constructor(props: FormProps) {
    super(props);
    this.inputName = React.createRef<HTMLInputElement>();
    this.inputSurname = React.createRef<HTMLInputElement>();
    this.submitButton = React.createRef<HTMLButtonElement>();
    this.inputImage = React.createRef<HTMLInputElement>();
    this.inputDate = React.createRef<HTMLInputElement>();
    this.selectCountry = React.createRef<HTMLSelectElement>();
    this.state = {
      formItems: [],
      formErrors: {
        name: '',
        surname: '',
        image: '',
        date: '',
        select: '',
      },
      nameValid: false,
      surnameValid: false,
      imageValid: false,
      dateValid: false,
      selectValid: false,
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
    const date = this.inputDate.current;
    const select = this.selectCountry.current;
    // console.log(select.value);
    if (name && surname && button && image && date && select) {
      console.log('Отправленное имя: ' + name.value + ' ' + surname.value);

      const fieldValidationErrors = this.state.formErrors;
      const nameValid = this.state.nameValid;
      const surnameValid = this.state.surnameValid;
      const imageValid = this.state.imageValid;
      const dateValid = this.state.dateValid;
      const selectValid = this.state.selectValid;
      // nameValid = name.value.length >= 2;
      fieldValidationErrors.name = nameValid ? '' : 'Name must contain at least 2 character';
      // surnameValid = surname.value.length >= 2;
      fieldValidationErrors.surname = surnameValid
        ? ''
        : 'Surname must contain at least 2 character';
      fieldValidationErrors.image = imageValid ? '' : 'Field must contain image file';
      fieldValidationErrors.date = dateValid ? '' : 'Field must contain date';
      fieldValidationErrors.select = selectValid ? '' : 'Country must be selected';
      let formValid = this.state.formValid;
      formValid = nameValid && surnameValid && imageValid && dateValid && selectValid;
      if (formValid) {
        const files = image.files;
        const url: File = (files as FileList)[0];
        const newItem = {
          id: newId(),
          name: name.value,
          surname: surname.value,
          image: URL.createObjectURL(url),
          date: date.value,
          select: select.value,
        };

        this.setState((prevState) => {
          prevState.formItems.push(newItem);
          return {
            ...prevState,
            formErrors: fieldValidationErrors,
            nameValid: !nameValid,
            surnameValid: !surnameValid,
            imageValid: !imageValid,
            dateValid: !dateValid,
            selectValid: !selectValid,
            formValid: !formValid,
            firstTypingAfterInit: true,
          };
        });
        name.value = '';
        surname.value = '';
        image.value = '';
        date.value = '';
        select.value = '';
        button.disabled = true;
      } else {
        this.setState({
          formErrors: fieldValidationErrors,
          nameValid: nameValid,
          surnameValid: surnameValid,
          imageValid: imageValid,
          dateValid: dateValid,
          selectValid: selectValid,
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
    const image = this.inputImage.current;
    const date = this.inputDate.current;
    const select = this.selectCountry.current;

    if (button && this.state.firstTypingAfterInit) {
      button.disabled = false;
    }

    console.log(name?.value.length);
    if (name && name.value.length >= 2 && button) {
      const nameValid = true;
      const formValid =
        nameValid &&
        this.state.surnameValid &&
        this.state.imageValid &&
        this.state.dateValid &&
        this.state.selectValid;
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
      const formValid =
        this.state.nameValid &&
        surnameValid &&
        this.state.imageValid &&
        this.state.dateValid &&
        this.state.selectValid;
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

    if (image && image.value.length > 0 && button) {
      const imageValid = true;
      const formValid =
        this.state.nameValid &&
        this.state.surnameValid &&
        imageValid &&
        this.state.dateValid &&
        this.state.selectValid;
      if (formValid) {
        button.disabled = false;
      }

      this.setState((prevState) => ({
        ...prevState,
        formErrors: {
          ...prevState.formErrors,
          image: '',
        },
        imageValid: imageValid,
        formValid: formValid,
      }));
    }

    if (date && date.value.length > 0 && button) {
      const dateValid = true;
      const formValid =
        this.state.nameValid &&
        this.state.surnameValid &&
        this.state.imageValid &&
        dateValid &&
        this.state.selectValid;
      if (formValid) {
        button.disabled = false;
      }

      this.setState((prevState) => ({
        ...prevState,
        formErrors: {
          ...prevState.formErrors,
          date: '',
        },
        dateValid: dateValid,
        formValid: formValid,
      }));
    }

    if (select && select.value.length > 0 && button) {
      const selectValid = true;
      const formValid =
        this.state.nameValid &&
        this.state.surnameValid &&
        this.state.imageValid &&
        this.state.dateValid &&
        selectValid;
      if (formValid) {
        button.disabled = false;
      }

      this.setState((prevState) => ({
        ...prevState,
        formErrors: {
          ...prevState.formErrors,
          select: '',
        },
        selectValid: selectValid,
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
              accept="image/png, image/gif, image/jpeg"
              ref={this.inputImage}
              // className="input-file"
              onChange={this.handleChange}
            />
          </label>
          <div className={`hidden ${this.toggleErrorClass(this.state.formErrors.image)}`}>
            {this.state.formErrors.image}
          </div>
          <label>
            Date of birth:
            <MyInput type="date" name="date" ref={this.inputDate} onChange={this.handleChange} />
          </label>
          <div className={`hidden ${this.toggleErrorClass(this.state.formErrors.date)}`}>
            {this.state.formErrors.date}
          </div>
          <label>
            Country:
            <select
              className="input-file"
              ref={this.selectCountry}
              defaultValue={''}
              onChange={this.handleChange}
            >
              <option value="" disabled>
                Please select a country
              </option>
              <option value="Russia">Russia</option>
              <option value="Belarus">Belarus</option>
              <option value="Kazakhstan">Kazakhstan</option>
            </select>
          </label>
          <div className={`hidden ${this.toggleErrorClass(this.state.formErrors.select)}`}>
            {this.state.formErrors.select}
          </div>
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
