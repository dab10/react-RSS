import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/hooks/redux';
import './ItemIdPage.scss';

const ItemIdPage = () => {
  const { dataPopup } = useAppSelector((state) => state.homeReducer);
  // const { state } = useContext(AppContext);
  const router = useNavigate();

  return (
    <div className="item-id-page-wrapper">
      <button onClick={() => router(-1)}>Back</button>
      <div className="item-id-page__item">
        <img src={dataPopup.image} alt={dataPopup.name} className="item-id-page__image" />
        <div className="item-id-page__text">
          <div>Base ID: {dataPopup.id}</div>
          <div>Name: {dataPopup.name}</div>
          <div>Status: {dataPopup.status}</div>
          <div>Species: {dataPopup.species}</div>
          <div>Type: {dataPopup.type}</div>
          <div>Gender: {dataPopup.gender}</div>
          <div>Location: {dataPopup.name}</div>
        </div>
      </div>
    </div>
  );
};

export default ItemIdPage;
