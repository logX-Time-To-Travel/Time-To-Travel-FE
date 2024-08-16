import MapHome from "../components/Map/MapHome";
import "./Home.css";
import Navbar from "../components/Navbar/Navbar";

const Home = () => {
  return (
    <div className="Home-container">
      <MapHome />

      <Navbar />
    </div>
  );
};

export default Home;
