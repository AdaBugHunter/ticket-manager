
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <div className="logo-icon"></div>
        <h3>Ticket Manager</h3>
      </div>

      <nav className="sidebar-nav">

        <NavLink to="/" end>
          Dashboard
        </NavLink>

        <NavLink to="/tickets">
          Tickets
        </NavLink>

        <NavLink to="/create">
          Create Ticket
        </NavLink>

      </nav>

      <div className="sidebar-user">
        <div className="user-avatar"></div>
        <span>Areeba Ali</span>
      </div>

    </aside>
  );
}

export default Sidebar;
