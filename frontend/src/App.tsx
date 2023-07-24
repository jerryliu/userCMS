// App.js
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider, User } from './UserContext';

import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import UserInfoPage from './UserInfoPage';

export const App = () => {
  const [user, setUser] = useState<User>(null);

  return (
    <UserProvider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/userinfo/:id" element={<UserInfoPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

// export default App;
