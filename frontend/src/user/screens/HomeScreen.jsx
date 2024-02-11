import { useSelector } from "react-redux";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.userAuth);

  return <div>Home Screen</div>;
};

export default HomeScreen;
