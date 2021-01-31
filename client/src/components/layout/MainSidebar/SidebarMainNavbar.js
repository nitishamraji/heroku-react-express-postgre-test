import React from "react";
import { Redirect } from 'react-router';

import PropTypes from "prop-types";
import { Navbar, NavbarBrand } from "shards-react";

import { Dispatcher, Constants } from "../../../flux";

class SidebarMainNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state={redirect:false}
    this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleToggleSidebar() {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_SIDEBAR
    });
  }

  handleOnClick = () => {
    this.setState({redirect: true});
  }

  render() {
    const { hideLogoText } = this.props;
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
    return (
      <div className="main-navbar">
        <Navbar
          className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0"
          type="light"
        >
          <NavbarBrand
            className="w-100 mr-0"
            href="#"
            style={{ lineHeight: "25px" }}
          >
            <div className="d-table m-auto" onClick={this.handleOnClick}>
              <img
                id="main-logo"
                className="d-inline-block align-top mr-1"
                style={{ maxWidth: "25px" }}
                src={require("../../../images/shards-dashboards-logo.svg").default}
                alt="My App"
              />
              {!hideLogoText && (
                <span className="d-none d-md-inline ml-1">
                  My Finance App
                </span>
              )}
            </div>
          </NavbarBrand>
          {/* eslint-disable-next-line */}
          <a
            className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
            onClick={this.handleToggleSidebar}
          >
            <i className="material-icons">&#xE5C4;</i>
          </a>
        </Navbar>
      </div>
    );
  }
}

SidebarMainNavbar.propTypes = {
  /**
   * Whether to hide the logo text, or not.
   */
  hideLogoText: PropTypes.bool
};

SidebarMainNavbar.defaultProps = {
  hideLogoText: false
};

export default SidebarMainNavbar;
