import { AppContext } from 'context/AppState';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './ItemIdPage.scss';

const ItemIdPage = () => {
  const { state } = useContext(AppContext);
  const router = useNavigate();

  return (
    <div className="item-id-page-wrapper">
      <button onClick={() => router(-1)}>Back</button>
      <div className="item-id-page__item">
        <img
          src={state.homePage.dataPopup.image}
          alt={state.homePage.dataPopup.name}
          className="item-id-page__image"
        />
        <div className="item-id-page__text">
          <div>Base ID: {state.homePage.dataPopup.id}</div>
          <div>Name: {state.homePage.dataPopup.name}</div>
          <div>Status: {state.homePage.dataPopup.status}</div>
          <div>Species: {state.homePage.dataPopup.species}</div>
          <div>Type: {state.homePage.dataPopup.type}</div>
          <div>Gender: {state.homePage.dataPopup.gender}</div>
          <div>Location: {state.homePage.dataPopup.name}</div>
        </div>
      </div>
    </div>
  );
};

export default ItemIdPage;
