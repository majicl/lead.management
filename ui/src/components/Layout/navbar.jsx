export default () => (
  <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
    <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
      <span className="navbar-brand brand-logo">
        <img src="assets/images/logo.png" alt="logo" />
      </span>
      <span className="navbar-brand brand-logo-mini">
        <img src="assets/images/logo.png" alt="logo" />
      </span>
    </div>
    <div className="navbar-menu-wrapper d-flex align-items-stretch">
      <button
        className="navbar-toggler navbar-toggler align-self-center"
        type="button"
        data-toggle="minimize"
      >
        <span className="mdi mdi-menu" />
      </button>
    </div>
  </nav>
);
