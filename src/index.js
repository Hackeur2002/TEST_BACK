import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route, useParams } from "react-router-dom";
import Evenement from './Layout/Evenement/Evenement';
import TypeEvenement from './Layout/TypeEvenement/TypeEvenement';
import ThemeEvenement from './Layout/ThemeEvenement/ThemeEvenement';
import Communique from './Layout/Communique/Communique';
import Projet from './Layout/Projet/Projet';
import Secteur from './Layout/Secteur/Secteur';
import Langue from './Layout/Langue/Langue';
import Recrutement from './Layout/Recrutement/Recrutement'
import Specialite from './Layout/Specialite/Specialite';
import Organisation from './Layout/Organisation/Organisation';
import Login from './Layout/Login/Login';
import TableCandidature from './Layout/Candidature/Components/TableCandidature';
import AuthGuard from './AuthGuard/AuthGuard';
import Faq from './Layout/Faq/Faq';
import QuestionReponse from './Layout/Question_Reponse/QuestionReponse';
import Guide from './Layout/Guide/Guide';
import Contact from './Layout/Contact/Contact';
import SousSecteurs from './Layout/sousSecteurs/SousSecteurs'
import StatutJuridique from './Layout/StatutJuridique/StatutJuridique';
import PmeForm from './Layout/PmeForm/PmeForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Login />} />

      <Route path="/admin" element={<AuthGuard><App /></AuthGuard>}>
        <Route exact path="event" element={<Evenement />} />
        <Route exact path="typeEvent" element={<TypeEvenement />} />
        <Route exact path="themeEvent" element={<ThemeEvenement />} />
        <Route exact path="communique" element={<Communique />} />
        <Route exact path="projet" element={<Projet />} />
        <Route exact path="secteur" element={<Secteur />} />
        <Route exact path="langue" element={<Langue />} />
        <Route exact path="recrutement" element={<Recrutement />} />
        <Route exact path="candidature" element={<TableCandidature />} />
        <Route exact path="specialite" element={<Specialite />} />
        <Route exact path="organisation" element={<Organisation />} />
        <Route exact path="faq" element={<Faq />} />
        <Route exact path="question_reponse" element={<QuestionReponse />} />
        <Route exact path="guide" element={<Guide />} />
        <Route exact path="contact" element={<Contact />} />
        <Route exact path="sousSecteur" element={<SousSecteurs />} />
        <Route exact path="statutJuridique" element={<StatutJuridique />} />
        <Route exact path="pmeform" element={<PmeForm />} />
        {/* <Route index element={<Homepage />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
