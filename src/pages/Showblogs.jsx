import './Showblogs.css';
import Navbar from '../components/Navbar/Navbar';
import Showblog from '../components/Map/Showblog';

const Showblogs = () => {
  return (
    <div className="Showblog-container">
      <Showblog />
      <Navbar />
    </div>
  );
};

export default Showblogs;
