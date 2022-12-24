import { useLocation } from "react-router-dom";

import SearchContact from "./contact/SearchContact";

import { Background , Purple } from "../helpers/colors";
import {AddressBook} from "phosphor-react";

const NavBar = () => {
  const location = useLocation();

  return (
    <nav
      className="navbar navbar-dark navbar-expand-sm shadow-lg"
      style={{ backgroundColor: Background }}
    >
      <div className="container">
        <div className="row w-100">
          <div className="col">
            <div className="navbar-brand">
            <AddressBook size={24} weight="duotone" /> وب
              اپلیکیشن مدیریت{"  "}
              <span style={{ color: Purple }}>مخاطبین</span>
            </div>
          </div>
          {location.pathname === "/contacts" ? (
            <div className="col">
              <SearchContact />
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
