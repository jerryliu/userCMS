// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import { UserPage } from './UserPage';

export const App = () => {
  const userId = '123'; // replace this with the real user id
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user" element={<UserPage userId={userId} />} />
      </Routes>
    </Router>
  );
};
