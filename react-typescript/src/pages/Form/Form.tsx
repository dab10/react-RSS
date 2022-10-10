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
  agree: boolean;
  gender: string;
};

type FormErrors = {
  name: string;
  surname: string;
  image: string;
  date: string;
  select: string;
  agree: string;
  gender: string;
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
  agreeValid: boolean;
  genderValid: boolean;
  firstTypingAfterInit: boolean;
};

class Form extends React.Component<FormProps, FormState> {
  inputName: React.RefObject<HTMLInputElement>;
  inputSurname: React.RefObject<HTMLInputElement>;
  submitButton: React.RefObject<HTMLButtonElement>;
  inputImage: React.RefObject<HTMLInputElement>;
  inputDate: React.RefObject<HTMLInputElement>;
  selectCountry: React.RefObject<HTMLSelectElement>;
  inputAgree: React.RefObject<HTMLInputElement>;
  inputGenderMale: React.RefObject<HTMLInputElement>;
  inputGenderFemale: React.RefObject<HTMLInputElement>;
  confirmationMessage: React.RefObject<HTMLDivElement>;

  constructor(props: FormProps) {
    super(props);
    this.inputName = React.createRef<HTMLInputElement>();
    this.inputSurname = React.createRef<HTMLInputElement>();
    this.submitButton = React.createRef<HTMLButtonElement>();
    this.inputImage = React.createRef<HTMLInputElement>();
    this.inputDate = React.createRef<HTMLInputElement>();
    this.selectCountry = React.createRef<HTMLSelectElement>();
    this.inputAgree = React.createRef<HTMLInputElement>();
    this.inputGenderMale = React.createRef<HTMLInputElement>();
    this.inputGenderFemale = React.createRef<HTMLInputElement>();
    this.confirmationMessage = React.createRef<HTMLDivElement>();
    this.state = {
      formItems: [],
      formErrors: {
        name: '',
        surname: '',
        image: '',
        date: '',
        select: '',
        agree: '',
        gender: '',
      },
      nameValid: false,
      surnameValid: false,
      imageValid: false,
      dateValid: false,
      selectValid: false,
      agreeValid: false,
      genderValid: false,
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
    const agree = this.inputAgree.current;
    const genderMale = this.inputGenderMale.current;
    const genderFemale = this.inputGenderFemale.current;
    const confirmationMessage = this.confirmationMessage.current;

    if (
      name &&
      surname &&
      button &&
      image &&
      date &&
      select &&
      agree &&
      (genderMale || genderFemale) &&
      confirmationMessage
    ) {
      const fieldValidationErrors = this.state.formErrors;
      const nameValid = this.state.nameValid;
      const surnameValid = this.state.surnameValid;
      const imageValid = this.state.imageValid;
      const dateValid = this.state.dateValid;
      const selectValid = this.state.selectValid;
      const agreeValid = this.state.agreeValid;
      const genderValid = this.state.genderValid;

      fieldValidationErrors.name = nameValid ? '' : 'Name must contain at least 2 character';
      fieldValidationErrors.surname = surnameValid
        ? ''
        : 'Surname must contain at least 2 character';
      fieldValidationErrors.image = imageValid ? '' : 'Field must contain image file';
      fieldValidationErrors.date = dateValid ? '' : 'Field must contain date';
      fieldValidationErrors.select = selectValid ? '' : 'Country must be selected';
      fieldValidationErrors.agree = agreeValid ? '' : 'Checkbox must be checked';
      fieldValidationErrors.gender = genderValid ? '' : 'Gender must be checked';
      let formValid = this.state.formValid;
      formValid =
        nameValid &&
        surnameValid &&
        imageValid &&
        dateValid &&
        selectValid &&
        agreeValid &&
        genderValid;
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
          agree: agree.checked,
          gender: (genderMale as HTMLInputElement).checked
            ? (genderMale as HTMLInputElement).value
            : (genderFemale as HTMLInputElement).value,
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
            agreeValid: !agreeValid,
            genderValid: !genderValid,
            formValid: !formValid,
            firstTypingAfterInit: true,
          };
        });
        name.value = '';
        surname.value = '';
        image.value = '';
        date.value = '';
        select.value = '';
        agree.checked = false;
        (genderMale as HTMLInputElement).checked = false;
        (genderFemale as HTMLInputElement).checked = false;
        button.disabled = true;
        confirmationMessage.className = 'hidden not-hidden';
        setInterval(() => (confirmationMessage.className = 'hidden'), 2000);
      } else {
        this.setState({
          formErrors: fieldValidationErrors,
          nameValid: nameValid,
          surnameValid: surnameValid,
          imageValid: imageValid,
          dateValid: dateValid,
          selectValid: selectValid,
          agreeValid: agreeValid,
          genderValid: genderValid,
          formValid: formValid,
          firstTypingAfterInit: false,
        });
        button.disabled = true;
      }
    }
  };

  handleChange = () => {
    const name = this.inputName.current;
    const surname = this.inputSurname.current;
    const button = this.submitButton.current;
    const image = this.inputImage.current;
    const date = this.inputDate.current;
    const select = this.selectCountry.current;
    const agree = this.inputAgree.current;
    const genderMale = this.inputGenderMale.current;
    const genderFemale = this.inputGenderFemale.current;

    if (button && this.state.firstTypingAfterInit) {
      button.disabled = false;
    }

    if (name && name.value.length >= 2 && button) {
      const nameValid = true;
      const formValid =
        nameValid &&
        this.state.surnameValid &&
        this.state.imageValid &&
        this.state.dateValid &&
        this.state.selectValid &&
        this.state.agreeValid &&
        this.state.genderValid;
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
    } else if (name && name.value.length < 2 && button) {
      this.setState((prevState) => ({
        ...prevState,
        nameValid: false,
      }));
    }

    if (surname && surname.value.length >= 2 && button) {
      const surnameValid = true;
      const formValid =
        this.state.nameValid &&
        surnameValid &&
        this.state.imageValid &&
        this.state.dateValid &&
        this.state.selectValid &&
        this.state.agreeValid &&
        this.state.genderValid;
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
    } else if (surname && surname.value.length < 2 && button) {
      this.setState((prevState) => ({
        ...prevState,
        surnameValid: false,
      }));
    }

    if (image && image.value.length > 0 && button) {
      const imageValid = true;
      const formValid =
        this.state.nameValid &&
        this.state.surnameValid &&
        imageValid &&
        this.state.dateValid &&
        this.state.selectValid &&
        this.state.agreeValid &&
        this.state.genderValid;
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
        this.state.selectValid &&
        this.state.agreeValid &&
        this.state.genderValid;
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
    } else if (date && date.value.length === 0 && button) {
      this.setState((prevState) => ({
        ...prevState,
        dateValid: false,
      }));
    }

    if (select && select.value.length > 0 && button) {
      const selectValid = true;
      const formValid =
        this.state.nameValid &&
        this.state.surnameValid &&
        this.state.imageValid &&
        this.state.dateValid &&
        selectValid &&
        this.state.agreeValid &&
        this.state.genderValid;
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

    if (agree && agree.checked && button) {
      const agreeValid = true;
      const formValid =
        this.state.nameValid &&
        this.state.surnameValid &&
        this.state.imageValid &&
        this.state.dateValid &&
        this.state.selectValid &&
        agreeValid &&
        this.state.genderValid;
      if (formValid) {
        button.disabled = false;
      }

      this.setState((prevState) => ({
        ...prevState,
        formErrors: {
          ...prevState.formErrors,
          agree: '',
        },
        agreeValid: agreeValid,
        formValid: formValid,
      }));
    } else if (agree && !agree.checked && button) {
      this.setState((prevState) => ({
        ...prevState,
        agreeValid: false,
      }));
    }

    if (((genderMale && genderMale.checked) || (genderFemale && genderFemale.checked)) && button) {
      const genderValid = true;
      const formValid =
        this.state.nameValid &&
        this.state.surnameValid &&
        this.state.imageValid &&
        this.state.dateValid &&
        this.state.selectValid &&
        this.state.agreeValid &&
        genderValid;
      if (formValid) {
        button.disabled = false;
      }

      this.setState((prevState) => ({
        ...prevState,
        formErrors: {
          ...prevState.formErrors,
          gender: '',
        },
        genderValid: genderValid,
        formValid: formValid,
      }));
    }
  };

  toggleErrorClass(error: string) {
    return error.length === 0 ? '' : 'error';
  }

  render() {
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
              className="input-select"
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
          <div>
            <label>
              Gender:
              <div className="input-radio">
                <div>male</div>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  ref={this.inputGenderMale}
                  onChange={this.handleChange}
                />
                <div>female</div>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  ref={this.inputGenderFemale}
                  onChange={this.handleChange}
                />
              </div>
            </label>
          </div>
          <div className={`hidden ${this.toggleErrorClass(this.state.formErrors.gender)}`}>
            {this.state.formErrors.gender}
          </div>
          <label className="input-checkbox">
            <input
              type="checkbox"
              name="agree"
              ref={this.inputAgree}
              onChange={this.handleChange}
            />
            Agree with terms
          </label>
          <div className={`hidden ${this.toggleErrorClass(this.state.formErrors.agree)}`}>
            {this.state.formErrors.agree}
          </div>
          <MyButton
            ref={this.submitButton}
            disabled={this.state.firstTypingAfterInit || !this.state.formValid}
          >
            Submit
          </MyButton>
          <div ref={this.confirmationMessage} className="hidden">
            <span>✓</span>Saved
          </div>
        </form>
        <FormList formItems={this.state.formItems} />
      </div>
    );
  }
}

export default Form;
