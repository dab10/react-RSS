import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from 'pages/Home/Home';
import About from 'pages/About/About';
import Page404 from 'pages/Page404/Page404';
import Footer from 'components/Footer/Footer';
import Form from 'pages/Form/Form';
import Header from 'components/Header/Header';
import { routes } from 'utils/const/const';
import { AppContext } from 'context/AppState';
import ItemIdPage from 'pages/ItemIdPage/ItemIdPage';

function App() {
  const { state } = useContext(AppContext);
  return (
    <>
      <Header />
      <Routes>
        <Route path={routes.homePage} element={<Home />} />
        <Route path={routes.formPage} element={<Form />} />
        <Route path={routes.aboutPage} element={<About />} />
        <Route
          path={state.homePage.dataPopup.id ? `${routes.homePage}:id` : routes.homePage}
          element={<ItemIdPage />}
        />
        <Route path={routes.notFoundPage} element={<Page404 />} />
        <Route path={routes.anyPage} element={<Navigate to={routes.notFoundPage} replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
