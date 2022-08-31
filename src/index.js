import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TicTacToe from './components/TicTacGame.jsx';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <TicTacToe />
    <Footer />
  </React.StrictMode>
);

