import "./Subheader.css";

function Subheader() {
  return (
    <div className="subheader">
      <div className="wrapperr">
        <div className="productss">
          <button>
            <svg
              width="42"
              height="24"
              viewBox="0 0 42 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2H40"
                stroke="black"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M2 12H28"
                stroke="black"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M2 22H17"
                stroke="black"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
            <span>
              <h3>Products</h3>
            </span>
          </button>
        </div>
        <div className="header-nav">
          <ul className="nav-menu">
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Laptops</a>
            </li>
            <li>
              <a>Appliances</a>
            </li>
            <li>
              <a>Telephones</a>
            </li>
            <li>
              <a>Cameras</a>
            </li>
            <li>
              <a>Washing Machines</a>
            </li>
            <li>
              <a>Air conditioners</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Subheader;
