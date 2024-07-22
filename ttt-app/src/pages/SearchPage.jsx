import "./SearchPage.css";
import Navbar from "../components/Navbar/Navbar";
import SearchTable from "../components/Search/SearchTable";

const SearchPage = () => {
  return (
    <div className="Search-container">
      <SearchTable />
      <Navbar />
    </div>
  );
};

export default SearchPage;
