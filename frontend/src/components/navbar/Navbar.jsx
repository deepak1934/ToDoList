import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.IsLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ Hook for navigation

  const logout = () => {
    sessionStorage.removeItem("id"); // ✅ Remove user ID from session storage
    dispatch(authActions.logout());  // ✅ Update Redux state
    navigate("/");                   // ✅ Redirect to home after logout
    window.location.reload();        // ✅ Force refresh to reset UI
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand" to="#">
            <b>
              <FaBookDead />
              &nbsp;ToDo
            </b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link active" to="/about">
                  About Us
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link active" to="/todo">
                  ToDo
                </Link>
              </li>
              {!isLoggedIn && (
                <>
                  <li className="nav-item mx-2">
                    <Link className="nav-link active btn-nav" to="/signup">
                      SignUp
                    </Link>
                  </li>
                  <li className="nav-item mx-2">
                    <Link className="nav-link active btn-nav" to="/signin">
                      SignIn
                    </Link>
                  </li>
                </>
              )}
              {isLoggedIn && (
                <li className="nav-item mx-2">
                  <button className="nav-link active btn-nav" onClick={logout}>
                    Log Out
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
