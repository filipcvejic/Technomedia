import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials, setLoading } from "../features/auth/userAuthSlice";

import "./ProfileScreen.css";

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.userAuth);
  const { isLoading } = useSelector((state) => state.userAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setSurname(userInfo.surname ? userInfo.surname : "");
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    if (email !== "" && name !== "") {
      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match");
      } else {
        try {
          dispatch(setLoading(true));
          const response = await fetch("http://localhost:3000/api/profile", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              name,
              email,
              oldPassword,
              newPassword,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message);
          }

          dispatch(setCredentials({ ...data }));
          dispatch(setLoading(false));
          toast.success("Profile updated successfully");
        } catch (err) {
          toast.error(err?.message);
        }
      }
    }
  };

  return (
    <>
      {userInfo && (
        <>
          <div className="update-container">
            <section className="update-section">
              <h1 className="update-heading">Update Profile</h1>
              <form className="update-form" onSubmit={updateProfileHandler}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="surname">Surname</label>
                  <input
                    type="text"
                    placeholder="Enter surname"
                    id="surname"
                    onChange={(e) => setSurname(e.target.value)}
                    value={surname}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Old Password</label>
                  <input
                    type="password"
                    placeholder="Enter old password"
                    id="new password"
                    onChange={(e) => setOldPassword(e.target.value)}
                    value={oldPassword}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    id="password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="submit-button">
                  Update
                </button>
              </form>

              {isLoading && (
                <div className="loader-wrapper">
                  <span className="spinner"></span>
                </div>
              )}
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileScreen;
