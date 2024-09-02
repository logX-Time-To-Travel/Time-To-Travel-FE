import { PostProvider } from './plugins/PostContext';
import { AuthProvider } from './components/User/AuthContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';
import { useState } from 'react';
import Home from './pages/Home';
import Blog from './pages/Blog';
import SearchPage from './pages/SearchPage';
import AddPost from './pages/AddPost';
import SignUp from './components/User/SignUp';
import SignIn from './components/User/SignIn';
import MapHome from './components/Map/MapHome';
import Terms from './components/User/Terms';
import Tinymce from './plugins/Tinymce';
import Mypage from './pages/Mypage';
import PostDetail from './pages/PostDetail';
import './App.css';
import Comment from './pages/Comment';
import EditUser from './components/User/EditUser';
import Interest from './pages/Interest';
import InterestLike from './components/Interest/InterestLike';
import InterestScrap from './components/Interest/InterestScrap';
import Initialization from './components/User/Initialization';

const libraries = ['places'];

function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLEMAP_API_KEY}
      libraries={libraries}
    >
      <AuthProvider>
        <PostProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/home" element={<Home />} />
              <Route path="/blog" element={<Blog posts={posts} />} />
              <Route path="/editor" element={<Tinymce addPost={addPost} />} />
              <Route path="/addpost" element={<AddPost />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/comment/:id" element={<Comment />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/mypage" element={<Mypage />} />
              <Route path="/edituser" element={<EditUser />} />
              <Route path="/terms/:type" element={<Terms />} />{' '}
              <Route path="/interest" element={<Interest />} />
              <Route path="/interest/like" element={<InterestLike />} />
              <Route path="/interest/scrap" element={<InterestScrap />} />
              <Route path="/Initialization" element={<Initialization />} />
            </Routes>
          </BrowserRouter>
        </PostProvider>
      </AuthProvider>
    </LoadScript>
  );
}

export default App;
