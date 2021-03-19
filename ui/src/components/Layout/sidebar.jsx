export default ({ menuItems = [] }) => {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        {menuItems.map(({ uri, title }, index) => (
          <li className="nav-item active" key={index}>
            <a className="nav-link" href={uri}>
              <span className="icon-bg">
                <i className="mdi mdi-cube menu-icon" />
              </span>
              <span className="menu-title">{title}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
