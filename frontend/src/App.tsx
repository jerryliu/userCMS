// App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import UserInfoPage from './UserInfoPage';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/userinfo/:id" element={<UserInfoPage />} />
      </Routes>
    </Router>
  );
};
// export default App;
