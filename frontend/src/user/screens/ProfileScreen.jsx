import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../features/auth/userAuthSlice";
import Loader from "../../shared/components/Loader";

import "./ProfileScreen.css";
import useLoading from "../../shared/hooks/useLoading";

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { isLoading, setLoading } = useLoading();

  const { userInfo } = useSelector((state) => state.userAuth);

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
          setLoading(true);
          const response = await fetch("http://localhost:3000/api/profile", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              name,
              email,
              surname,
              oldPassword,
              newPassword,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message);
          }

          dispatch(setCredentials({ ...data.user }));

          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
          toast.success("Profile updated successfully");
        } catch (err) {
          toast.error(err?.message);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  return (
    <>
      {userInfo && (
        <>
          <div className="profile-container">
            <div className="profile-section">
              <div className="user-main">
                <h1 className="user-full-name">
                  {userInfo.name} {userInfo.surname}
                </h1>
                <span>#{userInfo._id}</span>
              </div>
              <div className="user-info">
                <span className="user-name">
                  <span>Name:</span> {userInfo.name}
                </span>
                <span className="user-surname">
                  <span>Surname:</span> {userInfo.surname}
                </span>
                <span className="user-email">
                  <span>E-mail:</span> {userInfo.email}
                </span>
                <span className="user-register-date">
                  <span>Registered:</span> {userInfo.createdAt}
                </span>
              </div>
              <div className="mini-logo">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="400"
                  height="60"
                  viewBox="0 0 447 66"
                  version="1.1"
                >
                  <path
                    d="M 387.989 3.250 C 385.842 6.772, 385.380 12.973, 387.035 16.066 C 389.689 21.025, 398 16.046, 398 9.496 C 398 0.635, 391.903 -3.169, 387.989 3.250 M 10.935 5.880 C 3.696 8.713, 0 11.898, 0 15.305 C 0 17.851, 0.294 18.156, 2.250 17.639 C 14.299 14.459, 17.992 13.659, 18.459 14.126 C 18.759 14.426, 18.077 17.333, 16.942 20.586 C 14.217 28.399, 10.351 45.861, 9.537 54.036 C 8.650 62.949, 9.881 66, 14.364 66 C 20.414 66, 21.679 63.867, 22.909 51.590 C 23.511 45.589, 24.996 34.677, 26.209 27.340 L 28.414 14 36.957 13.985 C 46.510 13.968, 47.427 13.637, 48.937 9.665 C 51.141 3.868, 51.510 3.996, 32.750 4.047 C 18.638 4.085, 14.670 4.418, 10.935 5.880 M 116.241 5.250 C 112.137 10.361, 105.728 27.718, 103.805 38.933 C 102.665 45.578, 102.209 46.466, 97.828 50.564 C 92.953 55.124, 89.790 56.029, 85.934 53.965 C 82.295 52.017, 83.973 39.753, 88.379 36.099 C 89.775 34.942, 90.485 34.922, 92.467 35.982 C 95.560 37.638, 97.767 36.744, 99.075 33.304 C 102.638 23.932, 89.915 22.428, 80.498 31.109 C 76.190 35.080, 72 42.330, 72 45.815 C 72 49.529, 63.525 55, 57.772 55 C 55.942 55, 53.445 54.299, 52.223 53.443 C 48.273 50.677, 49.470 48.725, 56.978 45.685 C 67.954 41.242, 71.752 34.768, 66.957 28.672 C 64.213 25.184, 59.097 24.303, 53.707 26.390 C 47.646 28.737, 43.373 32.943, 40.358 39.530 C 35.658 49.795, 37.277 60.023, 44.164 63.585 C 49.071 66.122, 60.225 65.205, 66.963 61.709 C 72.236 58.973, 72.332 58.962, 74.402 60.844 C 77.829 63.958, 80.603 65, 85.466 65 C 90.971 65, 96.497 62.854, 100.250 59.260 L 103 56.626 103 59.379 C 103 63.061, 104.681 66.001, 106.785 65.996 C 107.728 65.994, 109.963 65.101, 111.750 64.011 C 114.922 62.077, 115 61.860, 115 54.983 C 115 51.107, 115.607 46.488, 116.348 44.718 C 118.513 39.553, 122.972 34.854, 125.383 35.198 C 127.712 35.530, 127.652 34.565, 126.407 51.621 C 125.790 60.072, 125.897 60.897, 127.871 62.871 C 129.042 64.042, 131.012 64.990, 132.250 64.978 C 134.945 64.952, 142.759 61.528, 145.232 59.290 C 146.872 57.806, 147 57.851, 147 59.911 C 147 65.778, 150.941 67.544, 156.500 64.167 C 159.479 62.357, 159.500 62.281, 159.500 53.265 C 159.500 44.770, 159.696 43.906, 162.540 39.843 C 164.695 36.764, 166.399 35.405, 168.397 35.173 L 171.214 34.847 170.591 39.673 C 170.248 42.328, 169.708 47.875, 169.391 52 C 168.877 58.680, 169.051 59.801, 170.980 62.250 C 172.293 63.918, 174.113 65, 175.606 65 C 178.449 65, 187.022 60.883, 188.907 58.613 C 190.034 57.254, 190.484 57.422, 192.669 60.018 C 195.700 63.621, 203.840 66.297, 208.955 65.373 C 213.099 64.624, 217.678 62.493, 220.500 59.998 C 221.733 58.908, 224.704 58.059, 228.250 57.783 C 233.776 57.353, 234 57.429, 234 59.733 C 234 65.975, 237.743 67.558, 243.739 63.852 C 246.875 61.914, 247.155 61.378, 246.607 58.352 C 246.273 56.509, 245.736 53.538, 245.412 51.750 C 244.612 47.321, 250.499 35.651, 253.772 35.181 L 255.991 34.862 255.351 48.225 C 254.502 65.926, 255.638 68.164, 263.562 64.404 C 267.709 62.436, 268.397 60.462, 266.945 54.697 C 265.961 50.786, 266.077 49.646, 267.849 45.854 C 270.643 39.874, 272.525 37.760, 274.674 38.187 C 276.686 38.587, 276.762 39.700, 275.591 51.500 C 274.867 58.801, 275.808 62.248, 279.087 64.294 C 281.359 65.711, 287.187 64.363, 291.532 61.414 L 295.265 58.880 298.150 61.644 C 303.310 66.587, 317.222 66.053, 325.252 60.603 L 328.779 58.210 330.778 60.913 C 335.025 66.658, 345.336 66.954, 351.798 61.516 L 354.687 59.086 356.873 62.043 C 360.187 66.525, 366.574 65.614, 373.644 59.652 C 377.203 56.651, 378 56.415, 378 58.365 C 378 59.116, 378.972 60.966, 380.161 62.477 C 382.072 64.907, 382.825 65.167, 386.679 64.733 C 389.076 64.463, 392.899 63.009, 395.175 61.503 L 399.314 58.764 400.907 60.843 C 403.334 64.010, 409.468 66.184, 413.803 65.414 C 417.846 64.695, 424 61.379, 424 59.918 C 424 58.224, 425.516 58.978, 426.513 61.168 C 427.056 62.361, 428.214 63.775, 429.087 64.310 C 431.607 65.857, 437.583 64.199, 442.226 60.664 C 446.308 57.556, 446.514 57.146, 446.806 51.516 L 447.111 45.622 442.043 50.363 C 439.256 52.970, 436.531 54.828, 435.988 54.492 C 435.445 54.157, 435 50.544, 435 46.465 C 435 40.813, 435.475 38.269, 436.996 35.774 C 439.580 31.536, 439.523 30.796, 436.364 27.636 C 433.735 25.008, 429.652 24.136, 428.524 25.962 C 428.145 26.575, 426.976 26.561, 425.302 25.925 C 423.507 25.242, 420.946 25.285, 417.217 26.059 C 409.513 27.658, 401.876 35.057, 399.531 43.195 C 398.368 47.230, 396.876 49.779, 394.410 51.945 C 387.952 57.615, 386.653 55.372, 389.520 43.500 C 392.345 31.800, 390.678 23.477, 385.653 24.193 C 382.764 24.605, 378.340 33.429, 377.450 40.557 C 376.833 45.495, 376.283 46.459, 371.775 50.512 C 369.030 52.981, 366.435 55, 366.008 55 C 364.564 55, 364.223 49.766, 365.169 42.117 C 366.587 30.655, 367.765 26.312, 370.634 21.976 C 374.299 16.438, 374.839 10.317, 371.982 6.696 C 367.540 1.066, 362.610 5.569, 358.713 18.816 C 356.564 26.120, 356.550 26.138, 353.484 25.563 C 343.515 23.693, 331.151 33.661, 328.564 45.655 C 326.698 54.301, 307 58.744, 307 50.519 C 307 48.479, 307.933 47.767, 313.062 45.897 C 321.201 42.929, 325 39.313, 325 34.533 C 325 29.389, 323.552 27.246, 319.194 25.940 C 309.970 23.176, 299.138 30.877, 295.427 42.837 C 293.638 48.603, 287.930 56.263, 286.493 54.826 C 286.197 54.531, 286.634 51.412, 287.463 47.895 C 290.495 35.034, 288.892 29.821, 281.480 28.430 C 278.808 27.929, 276.764 28.357, 273.044 30.198 C 268.520 32.437, 268.100 32.489, 267.675 30.864 C 267.163 28.908, 261.366 25.010, 258.961 25.004 C 258.115 25.002, 255.691 25.883, 253.575 26.962 L 249.728 28.923 247.791 26.462 C 246.726 25.108, 244.993 24, 243.940 24 C 240.455 24, 236.123 32.821, 234.501 43.221 C 233.942 46.800, 231.043 50, 228.358 50 C 227.469 50, 227.414 49.084, 228.146 46.435 C 230.198 39.001, 226.536 33, 219.946 33 C 210.573 33, 206.516 43.507, 212.413 52.508 C 214.179 55.203, 213.609 56, 209.915 56 C 205.795 56, 204.082 55.059, 202.448 51.899 C 200.171 47.495, 201.542 41.565, 205.896 36.991 C 209.036 33.692, 210.273 33.117, 215.500 32.530 C 224.552 31.512, 224.959 31.250, 221.769 28.491 C 215.563 23.123, 202.594 24.729, 195.794 31.707 C 191.748 35.859, 189 41.464, 189 45.566 C 189 47.338, 187.777 49.299, 185.250 51.575 C 183.188 53.433, 181.142 54.964, 180.705 54.977 C 179.849 55.002, 180.733 48.972, 182.140 45.185 C 183.567 41.344, 183.156 31.668, 181.464 29.252 C 179.193 26.010, 173.384 24.550, 168.253 25.932 C 165.960 26.549, 163.805 27.507, 163.462 28.061 C 163.114 28.625, 161.946 27.930, 160.805 26.479 C 157.778 22.631, 155.011 23.553, 151.817 29.474 C 150.342 32.210, 148.659 37.150, 148.077 40.451 C 147.178 45.559, 146.353 47.120, 142.545 50.929 C 140.084 53.390, 137.735 55.068, 137.325 54.658 C 136.915 54.248, 137.353 50.895, 138.298 47.206 C 140.423 38.917, 140.485 32.137, 138.463 29.251 C 136.612 26.608, 129.949 24.633, 125.892 25.524 C 124.275 25.879, 121.613 27.296, 119.976 28.674 C 116.093 31.941, 116.220 30.488, 120.500 22.701 C 124.316 15.759, 124.845 11.536, 122.474 6.950 C 120.883 3.873, 117.982 3.082, 116.241 5.250 M 351.500 33.573 C 344.699 37.110, 341 42.498, 341 48.869 C 341 54.178, 341.818 56, 344.203 56 C 346.755 56, 351.741 53.064, 352.603 51.053 C 353.532 48.887, 355.687 31.999, 355.034 32.006 C 354.740 32.010, 353.150 32.714, 351.500 33.573 M 420.804 34.041 C 414.738 37.244, 411.540 42.319, 411.518 48.774 C 411.498 54.982, 412.987 56.722, 417.376 55.620 C 421 54.711, 423.778 49.807, 424.488 43.066 C 424.810 40.005, 425.271 36.263, 425.512 34.750 C 426.027 31.517, 425.681 31.465, 420.804 34.041 M 52.989 36.250 C 49.718 41.615, 50.612 42.501, 55.418 38.655 C 57.381 37.085, 58.128 35.776, 57.700 34.660 C 56.731 32.135, 55.179 32.659, 52.989 36.250 M 309.627 35.250 C 308.847 36.487, 307.872 38.620, 307.461 39.989 L 306.714 42.477 310.107 39.869 C 313.763 37.058, 315.231 33, 312.593 33 C 311.742 33, 310.408 34.013, 309.627 35.250 M 220.667 40.667 C 219.642 41.692, 219.877 45.806, 221 46.500 C 221.595 46.868, 222 45.677, 222 43.559 C 222 39.904, 221.820 39.514, 220.667 40.667"
                    stroke="none"
                    fill="#ff5c04"
                    fillRule="evenodd"
                  />
                  <path d="" stroke="none" fill="#fc5c04" fillRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="update-section">
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
              {isLoading && <Loader />}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileScreen;
