import { useNavigate, useLocation } from "react-router-dom";
import "./description.css";
import { useEffect } from "react";
function Description() {
  const location = useLocation();
  const user = location.state.user;

  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();

    window.history.replaceState({}, "", "/");

    window.location.replace("/");

    window.onpopstate = null;
    window.removeEventListener("popstate", handlePopstate);
  };

  function handlePopstate() {
    window.location.replace("/");
  }

  useEffect(() => {
    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);
  function handleHome() {
    navigate("/home");
  }

  return (
    <div>
      <div className="des_head ">
        <button className="des_back" onClick={handleHome}>
          Назад
        </button>

        <img
          src={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
          className="des_avatar"
        />
        <div className="des_text">
          <h1 className="des_name">{`${user.first_name} ${user.last_name}`}</h1>
          <br />
          <p className="des_p">Партнер</p>
        </div>

        <button className="des_exit" onClick={handleLogout}>
          Выход
        </button>
      </div>
      <div>
        <h2>Email: {user.email}</h2>
      </div>
    </div>
  );
}
export default Description;
