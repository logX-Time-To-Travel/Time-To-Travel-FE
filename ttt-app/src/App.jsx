import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";



function App() {
  return (
    //페이지 라우팅 설정

    <div>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
      
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
