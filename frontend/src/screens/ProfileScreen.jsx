import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

import "./ProfileScreen.css";

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="update-container">
      <h1 className="update-heading">Update Profile</h1>

      <form className="update-form" onSubmit={updateProfileHandler}>
        <div className="form-group">
          <label for="name">Name</label>
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
          <label for="email">Email Address</label>
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
          <label for="password">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <div className="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            id="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
          />
        </div>

        <button type="submit" className="update-button">
          Update
        </button>
      </form>

      {isLoading && <div id="loader" className="loader"></div>}
    </div>
  );
};

export default ProfileScreen;
