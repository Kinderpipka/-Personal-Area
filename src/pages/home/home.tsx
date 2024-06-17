import "./home.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchUsers, fetchOtherUsers } from "../../redux/features/homeSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { AppDispatch } from "../../redux/store";

function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchOtherUsers());
  }, [dispatch]);

  interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
  }

  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();

    navigate("/", { replace: true });
  };

  const handleDescription = (user: User) => {
    navigate(`/profile/${user.id}`, { state: { user }, replace: true });
  };

  return (
    <div>
      <div className="home_head ">
        <button className="home_button" onClick={handleLogout}>
          Выход
        </button>
        <div className="home_text">
          <h1 className="home_h1">Наша команда</h1>
          <br />
          Это опытные специалисты хорошо разбирающиеся во всех задачах которые
          ложаться
          <br /> на их плечи, и умеющие находить выход из любых, даже самых
          сложных ситуаций.
        </div>
      </div>

      <div className="home_profile_container">
        {users.map((user) => (
          <div
            key={user.id}
            className="home_profile"
            onClick={() => handleDescription(user)}
          >
            <img
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
              className="avatar"
            />
            <br />
            <p className="p_home"> {user.first_name}</p>
            <p className="p_home"> {user.last_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Home;
