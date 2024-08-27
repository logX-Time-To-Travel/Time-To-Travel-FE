import MapHome from '../components/Map/MapHome';
import './Home.css';
import Navbar from '../components/Navbar/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get('http://localhost:8080/member/session', {
          withCredentials: true,
        });
      } catch (e) {
        alert('먼저 로그인을 진행해주세요!');
        navigate('/signin');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="Home-container">
      <MapHome />

      <Navbar />
    </div>
  );
};

export default Home;
