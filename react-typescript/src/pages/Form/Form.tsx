import React from 'react';
import FormList from 'components/FormList/FormList';
import newId from 'utils/newId/newId';
import MyButton from 'components/UI/button/MyButton';
import './Form.scss';
import InputName from 'components/FormFields/InputName/InputName';
import InputSurname from 'components/FormFields/InputSurname/InputSurname';
import InputImage from 'components/FormFields/InputImage/InputImage';
import InputDate from 'components/FormFields/InputDate/InputDate';
import InputSelect from 'components/FormFields/InputSelect/InputSelect';
import InputCheckbox from 'components/FormFields/InputCheckbox/InputCheckbox';
import { quantityCharacters, timeConfirmationMessage } from 'utils/const/const';
import MessageError from 'components/FormFields/MessageError/MessageError';

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

      fieldValidationErrors.name = nameValid
        ? ''
        : `Name must contain at least ${quantityCharacters} character`;
      fieldValidationErrors.surname = surnameValid
        ? ''
        : `Surname must contain at least ${quantityCharacters} character`;
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
        setInterval(() => (confirmationMessage.className = 'hidden'), timeConfirmationMessage);
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

  handleChangeInputName = () => {
    const name = this.inputName.current;
    const button = this.submitButton.current;

    if (button && this.state.firstTypingAfterInit) {
      button.disabled = false;
    }

    if (name && name.value.length >= quantityCharacters && button) {
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
    } else if (name && name.value.length < quantityCharacters) {
      this.setState((prevState) => ({
        ...prevState,
        nameValid: false,
      }));
    }
  };

  handleChangeInputSurname = () => {
    const surname = this.inputSurname.current;
    const button = this.submitButton.current;

    if (button && this.state.firstTypingAfterInit) {
      button.disabled = false;
    }

    if (surname && surname.value.length >= quantityCharacters && button) {
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
    } else if (surname && surname.value.length < quantityCharacters) {
      this.setState((prevState) => ({
        ...prevState,
        surnameValid: false,
      }));
    }
  };

  handleChangeInputImage = () => {
    const image = this.inputImage.current;
    const button = this.submitButton.current;

    if (button && this.state.firstTypingAfterInit) {
      button.disabled = false;
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
    } else if (image && image.value.length === 0) {
      this.setState((prevState) => ({
        ...prevState,
        imageValid: false,
      }));
    }
  };

  handleChangeInputDate = () => {
    const date = this.inputDate.current;
    const button = this.submitButton.current;

    if (button && this.state.firstTypingAfterInit) {
      button.disabled = false;
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
    } else if (date && date.value.length === 0) {
      this.setState((prevState) => ({
        ...prevState,
        dateValid: false,
      }));
    }
  };

  handleChangeInputSelect = () => {
    const select = this.selectCountry.current;
    const button = this.submitButton.current;

    if (button && this.state.firstTypingAfterInit) {
      button.disabled = false;
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
  };

  handleChangeInputRadio = () => {
    const genderMale = this.inputGenderMale.current;
    const genderFemale = this.inputGenderFemale.current;
    const button = this.submitButton.current;

    if (button && this.state.firstTypingAfterInit) {
      button.disabled = false;
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

  handleChangeInputCheckbox = () => {
    const agree = this.inputAgree.current;
    const button = this.submitButton.current;

    if (button && this.state.firstTypingAfterInit) {
      button.disabled = false;
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
    } else if (agree && !agree.checked) {
      this.setState((prevState) => ({
        ...prevState,
        agreeValid: false,
      }));
    }
  };

  toggleErrorClass(error: string) {
    return error.length === 0 ? '' : 'error';
  }

  render() {
    return (
      <div>
        <div className="form-container">
          <form onSubmit={this.handleSubmitForm} className="form">
            <InputName
              ref={this.inputName}
              handleChange={this.handleChangeInputName}
              formErrors={this.state.formErrors}
            />
            <InputSurname
              ref={this.inputSurname}
              handleChange={this.handleChangeInputSurname}
              formErrors={this.state.formErrors}
            />
            <InputImage
              ref={this.inputImage}
              handleChange={this.handleChangeInputImage}
              formErrors={this.state.formErrors}
            />
            <InputDate
              ref={this.inputDate}
              handleChange={this.handleChangeInputDate}
              formErrors={this.state.formErrors}
            />
            <InputSelect
              ref={this.selectCountry}
              handleChange={this.handleChangeInputSelect}
              defaultValue={''}
              formErrors={this.state.formErrors}
            />
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
                    onChange={this.handleChangeInputRadio}
                  />
                  <div>female</div>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    ref={this.inputGenderFemale}
                    onChange={this.handleChangeInputRadio}
                  />
                </div>
              </label>
            </div>
            <MessageError messageError={this.state.formErrors.gender} />
            <InputCheckbox
              ref={this.inputAgree}
              handleChange={this.handleChangeInputCheckbox}
              formErrors={this.state.formErrors}
            />
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
        </div>
        <div>
          <FormList formItems={this.state.formItems} />
        </div>
      </div>
    );
  }
}

export default Form;
