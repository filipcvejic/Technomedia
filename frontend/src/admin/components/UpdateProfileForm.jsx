import { useEffect, useState } from "react";
import "./UpdateProfileForm.css";
import { toast } from "react-toastify";

function UpdateProfileForm({ user, onUpdateUserInfo }) {
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  useEffect(() => {
    setName(user.name);
    setSurname(user.surname);
    setEmail(user.email);
    setPassword("");
    setConfirmedPassword("");
  }, [user]);

  const editUserInfoHandler = async (event) => {
    event.preventDefault();

    if (
      name !== "" &&
      surname !== "" &&
      email !== "" &&
      password !== "" &&
      confirmedPassword !== ""
    ) {
      if (password !== confirmedPassword) {
        toast.error("Passwords do not match");
      } else {
        try {
          const response = await fetch(
            `http://localhost:3000/api/admin/update-user/${user._id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                name,
                surname,
                email,
                password,
                confirmedPassword,
              }),
            }
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message);
          }

          onUpdateUserInfo(data.user);
          toast.success(data.message);
        } catch (err) {
          toast.error(err?.message);
        }
      }
    }
  };

  return (
    <form
      className="admin-single-user-update-form"
      onSubmit={editUserInfoHandler}
    >
      <div className="admin-user-update-details">
        <h1>Update Profile</h1>
        <div className="admin-user-update-fields">
          <div className="user-update-form-group">
            <label>First Name</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div className="user-update-form-group">
            <label>Last Name</label>
            <input
              type="text"
              value={surname}
              onChange={(event) => setSurname(event.target.value)}
              required
            />
          </div>
          <div className="user-update-form-group">
            <label>Email address</label>
            <input
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="user-update-form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="user-update-form-group">
            <label>Confirm password</label>
            <input
              type="password"
              value={confirmedPassword}
              onChange={(event) => setConfirmedPassword(event.target.value)}
            />
          </div>
        </div>
      </div>
      <button type="submit" className="admin-user-update-button">
        Update
      </button>
    </form>
  );
}

export default UpdateProfileForm;
