import { useSelector } from "react-redux";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return <div>Home Screen</div>;
};

export default HomeScreen;
