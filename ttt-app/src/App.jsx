import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Auth from "./pages/Auth";
import SearchPage from "./pages/SearchPage";
import AddPost from "./components/BlogEditer/AddPost";
import Profile from "./pages/Profile";
import SignUp from "./components/User/SignUp";
import SignIn from "./components/User/SignIn";
import MapHome from "./components/Map/MapHome"; // MapHome 컴포넌트 import
import Terms from "./components/User/Terms"; // Terms 컴포넌트 import

function App() {
  const [user, setUser] = useState(null); // 사용자 상태 정의

  const handleSignUp = (newUser) => {
    setUser(newUser); // 새로운 사용자 설정
  };

  const handleSignIn = (user) => {
    setUser(user); // 사용자 로그인 설정
  };

  return (
    <div>
      {/* 페이지 라우팅 설정 */}
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/addpost" element={<AddPost />} />
            <Route path="/search" element={<SearchPage />} />
            <Route
              path="/map"
              element={user ? <MapHome /> : <Navigate to="/signin" />} // 사용자 로그인 시 지도 페이지로 이동
            />
            <Route path="/profile" element={user ? <MapHome /> : <Profile />} />{" "}
            {/* 사용자 로그인 시 지도 페이지로 이동 */}
            <Route
              path="/signup"
              element={<SignUp onSignUp={handleSignUp} />}
            />{" "}
            {/* SignUp 라우트에 onSignUp 핸들러 추가 */}
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
            />{" "}
            {/* SignIn 라우트에 onSignIn 핸들러 수정: 로그인 후 /home으로 이동 */}
            <Route path="/terms/:type" element={<Terms />} />{" "}
            {/* Terms 컴포넌트에 대한 라우트 추가 */}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
