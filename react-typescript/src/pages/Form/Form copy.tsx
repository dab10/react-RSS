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
import { quantityCharacters, stateInit, timeConfirmationMessage } from 'utils/const/const';
import MessageError from 'components/FormFields/MessageError/MessageError';
import InputRadio from 'components/FormFields/InputRadio/InputRadio';
import {
  FieldName,
  FieldNumber,
  FieldNumberStrings,
  FormProps,
  FormState,
  isCheckTypeOfChecked,
} from './FormTypes';

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
    this.state = stateInit;
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

  enableButtonAfterFirstType = () => {
    const button = this.submitButton.current;

    if (button && this.state.firstTypingAfterInit) {
      button.disabled = false;
    }
  };

  changeState = (
    formItemName: HTMLInputElement | HTMLSelectElement | null,
    fieldName: FieldNumberStrings,
    isCheckTypeOfChecked: boolean,
    quantityCharacters = 1
  ) => {
    const formSubmitButton = this.submitButton.current;

    if (isCheckTypeOfChecked) {
      if (formItemName && (formItemName as HTMLInputElement).checked && formSubmitButton) {
        this.changeStateValidForm(formItemName, fieldName, formSubmitButton);
      } else if (formItemName && !(formItemName as HTMLInputElement).checked) {
        this.changeStateInvalidForm(formItemName);
      }
    } else {
      if (formItemName && formItemName.value.length >= quantityCharacters && formSubmitButton) {
        this.changeStateValidForm(formItemName, fieldName, formSubmitButton);
      } else if (formItemName && formItemName.value.length < quantityCharacters) {
        this.changeStateInvalidForm(formItemName);
      }
    }
  };

  changeStateValidForm = (
    formItemName: HTMLInputElement | HTMLSelectElement,
    fieldName: FieldNumberStrings,
    formSubmitButton: HTMLButtonElement
  ) => {
    const formValidArr = [
      this.state.nameValid,
      this.state.surnameValid,
      this.state.imageValid,
      this.state.dateValid,
      this.state.selectValid,
      this.state.agreeValid,
      this.state.genderValid,
    ];
    const fieldNumberChange = FieldNumber[fieldName];
    formValidArr.splice(fieldNumberChange, 1, true);
    const formValid = formValidArr.every(Boolean);
    if (formValid) {
      formSubmitButton.disabled = false;
    }

    this.setState((prevState) => ({
      ...prevState,
      formErrors: {
        ...prevState.formErrors,
        [formItemName.name]: '',
      },
      [`${formItemName.name}Valid`]: true,
      formValid: formValid,
    }));
  };

  changeStateInvalidForm = (formItemName: HTMLInputElement | HTMLSelectElement) => {
    this.setState((prevState) => ({
      ...prevState,
      [`${formItemName.name}Valid`]: false,
    }));
  };

  handleChangeInputName = () => {
    const name = this.inputName.current;

    this.enableButtonAfterFirstType();
    this.changeState(name, FieldName.name, Boolean(isCheckTypeOfChecked.no), quantityCharacters);
  };

  handleChangeInputSurname = () => {
    const surname = this.inputSurname.current;

    this.enableButtonAfterFirstType();
    this.changeState(
      surname,
      FieldName.surname,
      Boolean(isCheckTypeOfChecked.no),
      quantityCharacters
    );
  };

  handleChangeInputImage = () => {
    const image = this.inputImage.current;

    this.enableButtonAfterFirstType();
    this.changeState(image, FieldName.image, Boolean(isCheckTypeOfChecked.no));
  };

  handleChangeInputDate = () => {
    const date = this.inputDate.current;

    this.enableButtonAfterFirstType();
    this.changeState(date, FieldName.date, Boolean(isCheckTypeOfChecked.no));
  };

  handleChangeInputSelect = () => {
    const select = this.selectCountry.current;

    this.enableButtonAfterFirstType();
    this.changeState(select, FieldName.select, Boolean(isCheckTypeOfChecked.no));
  };

  handleChangeInputRadio = () => {
    const genderMale = this.inputGenderMale.current;
    const genderFemale = this.inputGenderFemale.current;

    this.enableButtonAfterFirstType();
    this.changeState(
      (genderMale as HTMLInputElement).checked ? genderMale : genderFemale,
      FieldName.gender,
      Boolean(isCheckTypeOfChecked.yes)
    );
  };

  handleChangeInputCheckbox = () => {
    const agree = this.inputAgree.current;

    this.enableButtonAfterFirstType();
    this.changeState(agree, FieldName.agree, Boolean(isCheckTypeOfChecked.yes));
  };

  render() {
    return (
      <div>
        <div className="form-container">
          <form onSubmit={this.handleSubmitForm} className="form">
            <InputName
              ref={this.inputName}
              // handleChange={this.handleChangeInputName}
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
                  <InputRadio
                    gender="male"
                    ref={this.inputGenderMale}
                    handleChange={this.handleChangeInputRadio}
                  />
                  <InputRadio
                    gender="female"
                    ref={this.inputGenderFemale}
                    handleChange={this.handleChangeInputRadio}
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
