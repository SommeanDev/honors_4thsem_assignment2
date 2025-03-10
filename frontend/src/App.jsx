import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SideBarNav from './shared/components/SideBarNav';
import Home from './home/pages/Home';
import UserList from './admin/users/pages/UserList';
import Login from './admin/users/pages/Login';
import { AuthContext } from './shared/context/auth-context';
import { useState, useCallback } from 'react';
import CreateUser from './admin/users/pages/CreateUser';
import CreatePost from './posts/pages/CreatePost';
import PostList from './posts/pages/PostList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <div className='flex'>
      <AuthContext.Provider value={{isLoggedIn, login, logout}}>
      <Router>
        <SideBarNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<CreateUser />} /> 
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/posts" element={<PostList />} />
        </Routes>        
      </Router>
      </AuthContext.Provider>
    </div>
    
  )
}

export default App
