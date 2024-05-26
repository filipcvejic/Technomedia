import "../components/ProductsMenu";
import ProductsMenu from "../components/ProductsMenu";

import "./Subheader.css";

function Subheader({ records, fetchRecords }) {
  return (
    <div className="subheader">
      <div className="wrapperr">
        <ProductsMenu records={records} fetchRecords={fetchRecords} />
        <div className="header-nav">
          <ul className="nav-menu">
            {records?.slice(0, 5).map((record, index) => (
              <li key={index}>
                <a href={`/${record.slug}`}>{record.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Subheader;
