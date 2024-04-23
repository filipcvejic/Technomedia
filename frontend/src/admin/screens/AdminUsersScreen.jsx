import { useEffect, useState } from "react";
import "./AdminUsersScreen.css";
import { toast } from "react-toastify";
import UpdateProfileForm from "../components/UpdateProfileForm";

function AdminUsersScreen() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditContainerShow, setIsEditContainerShown] = useState(false);

  useEffect(() => {
    const getUsersData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/admin/users");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setUsers(data);

        if (data.length > 0) {
          setSelectedUser(data[0]);
        }
      } catch (err) {
        toast.error(err?.message);
      }
    };

    getUsersData();
  }, []);

  const userSelectionHandler = (user) => {
    setSelectedUser(user);
    setIsEditContainerShown(false);
  };

  const editModalShowingHandler = (event, user) => {
    event.preventDefault();

    setSelectedUser(user);
    setIsEditContainerShown(true);
  };

  const onUpdateUserInfoHandler = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((singleUser) =>
        singleUser._id === updatedUser._id ? updatedUser : singleUser
      )
    );
    setSelectedUser(updatedUser)
    setIsEditContainerShown(false);
  };

  return (
    <div className="admin-users-container">
      <div className="admin-users-list-wrapper">
        <div className="admin-user-info-item">
          <span className="admin-user-info-label">Username</span>
          <span className="admin-user-info-label">Email</span>
        </div>
        <ul className="admin-users-list">
          {users?.map((user) => (
            <div className="single-user-container" key={user._id}>
              <li
                className="user-item"
                onClick={() => userSelectionHandler(user)}
              >
                <label>
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={selectedUser === user}
                    readOnly
                  />
                  <span className="checkbox-custom"></span>
                </label>
                <span className="user-name">
                  {user.name} {user.surname}
                </span>
                <span className="user-email">{user.email}</span>
              </li>
              <div className="admin-user-actions">
                <div
                  className="edit-user-action"
                  onClick={(event) => editModalShowingHandler(event, user)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="18"
                    viewBox="0 0 512 512"
                    version="1.1"
                  >
                    <path
                      d=""
                      stroke="none"
                      fill="#080404"
                      fillRule="evenodd"
                    />
                    <path
                      d="M 413 1.493 C 409.425 2.301, 403.125 4.617, 399 6.641 C 392.327 9.914, 389.042 12.753, 369.218 32.375 L 346.936 54.429 402.218 109.743 L 457.500 165.057 479.570 142.779 C 502.976 119.152, 506.136 114.972, 509.904 102.645 C 512.472 94.246, 512.690 81.464, 510.416 72.644 C 507.244 60.341, 504.048 55.973, 481.547 33.182 C 459.509 10.860, 454.323 6.796, 443.050 3.010 C 434.678 0.198, 421.645 -0.459, 413 1.493 M 173.823 227.750 C 51.302 350.342, 32.006 370.041, 31.054 373.500 C 25.508 393.644, 0 498.905, 0 501.647 C 0 506.684, 5.346 512, 10.412 512 C 13.800 512, 135.545 482.121, 141.033 479.943 C 142.426 479.390, 207.224 415.277, 285.030 337.470 L 426.495 196.002 371.501 141.001 C 341.254 110.750, 316.278 86, 315.999 86 C 315.719 86, 251.740 149.787, 173.823 227.750"
                      stroke="none"
                      fill="#040404"
                      fillRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="delete-user-action">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.0"
                    width="19"
                    height="18"
                    viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <g
                      transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                      fill="#000000"
                      stroke="none"
                    >
                      <path d="M1905 5036 c-64 -30 -90 -60 -154 -185 l-52 -101 -597 0 -598 0 -44 -22 c-33 -17 -51 -35 -67 -68 -21 -41 -23 -57 -23 -225 0 -168 2 -184 23 -225 16 -33 34 -51 67 -67 l44 -23 2056 0 2056 0 44 23 c33 16 51 34 68 67 20 41 22 57 22 225 0 168 -2 184 -22 225 -17 33 -35 51 -68 68 l-44 22 -598 0 -597 0 -52 101 c-61 119 -87 152 -143 182 -41 22 -43 22 -656 25 l-615 2 -50 -24z" />
                      <path d="M690 3769 c0 -93 200 -3250 209 -3314 30 -189 185 -350 370 -385 73 -14 2509 -14 2582 0 185 35 340 196 370 385 9 64 209 3221 209 3314 l0 41 -1870 0 -1870 0 0 -41z" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
      <div className="admin-user-details-wrapper">
        {selectedUser && (
          <>
            {!isEditContainerShow ? (
              <div className="admin-single-user-details-wrapper">
                <div className="admin-single-user-details">
                  <div className="user-main-info">
                    <h1 className="user-full-name">
                      {selectedUser.name} {selectedUser.surname}
                    </h1>
                    <span className="user-id">#{selectedUser._id}</span>
                  </div>
                  <div className="user-extra-info">
                    <span className="user-first-name">
                      <span>Name:</span> {selectedUser.name}
                    </span>
                    <span className="user-last-name">
                      <span>Surname:</span> {selectedUser.surname}
                    </span>
                    <span className="user-email-address">
                      <span>E-mail:</span> {selectedUser.email}
                    </span>
                    <span className="user-registration-date">
                      <span>Registered:</span> {selectedUser.createdAt}
                    </span>
                  </div>
                </div>
                <button
                  className="admin-edit-user-button"
                  onClick={() => setIsEditContainerShown(true)}
                >
                  Edit
                </button>
              </div>
            ) : (
              <UpdateProfileForm user={selectedUser} onUpdateUserInfo={onUpdateUserInfoHandler}/>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AdminUsersScreen;
