import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";

import './App.css';


import ProtectedRoute from './components/common/ProtectedRoute';

// Layout
import AdminLayout from './components/layout/AdminLayout';
import PublicLayout from './components/layout/PublicLayout';

// public
import Home from './pages/public/Home';
import ShowArticle from './pages/public/ShowArticle';
import ListArticles from "./pages/public/ListArticles";

// admin
import Dashboard from './pages/admin/Dashboard'
// AdminPost
import AdminArticles from "./pages/admin/AdminArticles";
import EditArticle from './pages/admin/EditArticle';
import CreateArticle from './pages/admin/CreateArticle';

// AdminUser
import List from './pages/admin/List';
import EditUser from './pages/admin/EditUser';
import ShowUser from './pages/admin/ShowUser';
import CreateUser from './pages/admin/CreateUser';

// auth
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

//
function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="login" element={< Login />} />
          <Route path="signup" element={< Register />} />

          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="create" element={< CreateUser />} />
            <Route path="login" element={< Login />} />
            <Route path="list" element={< List />} />
            <Route path="writing" element={< ListArticles />} />
            <Route path="post/:id" element={< ShowArticle />} />
          </Route>

          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={< Dashboard />} />
            <Route path="user/create" element={< CreateUser />} />
            <Route path="user/:id" element={< ShowUser />} />
            <Route path="user/edit/:id" element={< EditUser />} />
            <Route path="users" element={< List />} />

            <Route path="posts" element={< AdminArticles />} />
            <Route path="post/create" element={< CreateArticle />} />
            <Route path="post/edit/:id" element={< EditArticle />} />

          </Route>
        </Routes>
      </div>

    </Router>


  );
}

export default App;
