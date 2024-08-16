import { PostProvider } from "./plugins/PostContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { LoadScript } from "@react-google-maps/api";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Auth from "./pages/Auth";
import SearchPage from "./pages/SearchPage";
import AddPost from "./pages/AddPost";
import Profile from "./pages/Profile";
import SignUp from "./components/User/SignUp";
import SignIn from "./components/User/SignIn";
import MapHome from "./components/Map/MapHome";
import Terms from "./components/User/Terms";
import Mypage from "./pages/Mypage";
import Tinymce from "./plugins/Tinymce";

const libraries = ["places"];

function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  const handleSignUp = (newUser) => {
    setUser(newUser); // 새로운 사용자 설정
  };

  const handleSignIn = (user) => {
    setUser(user); // 사용자 로그인 설정
  };

  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLEMAP_API_KEY}
      libraries={libraries}
    >
      <PostProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/blog" element={<Blog posts={posts} />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/editor" element={<Tinymce addPost={addPost} />} />
            <Route path="/addpost" element={<AddPost />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route
              path="/map"
              element={user ? <MapHome /> : <Navigate to="/signin" />}
            />
            <Route path="/profile" element={user ? <MapHome /> : <Profile />} />
            <Route
              path="/signup"
              element={<SignUp onSignUp={handleSignUp} />}
            />
            <Route
              path="/signin"
              element={
                <SignIn
                  onSignIn={(user) => {
                    handleSignIn(user);
                    window.location.href = "/home";
                  }}
                />
              }
            />
            <Route path="/terms/:type" element={<Terms />} />
          </Routes>
        </BrowserRouter>
      </PostProvider>
    </LoadScript>
  );
}

export default App;
