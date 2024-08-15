import { Link } from "react-router-dom";
import "../components/ProductsMenu";
import ProductsMenu from "../components/ProductsMenu";

import "./Subheader.css";
import { useEffect } from "react";

function Subheader({ records, fetchRecords }) {
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/refresh`);
  }, []);

  return (
    <div className="subheader">
      <div className="wrapperr">
        <ProductsMenu records={records} fetchRecords={fetchRecords} />
        <div className="header-nav">
          <ul className="nav-menu">
            {records?.slice(0, 5).map((record, index) => (
              <li key={index}>
                <Link to={`/${record.slug}`}>{record.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Subheader;
