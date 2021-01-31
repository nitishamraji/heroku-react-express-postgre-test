import React from "react";
import {
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput
} from "shards-react";

import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
  navbarSearchInput: {
    border: '0',
    '& input': {
      border: '0 !important',
      paddingLeft: '0'
    }
  }
});

const NavbarSearch = () => {
  const classes = useStyles();
  return (
    <form className="main-navbar__search w-100 d-none d-md-flex d-lg-flex px-3">
      <div className="row w-100">
          <div className="my-auto pl-4 pr-1"><i className="material-icons">search</i></div>
          <div className="col col-md-10 my-auto px-0">
            <Typeahead
                id="basic-typeahead-multiple"
                labelKey="name"
                className={classes.navbarSearchInput}
                options={['test1','test2']}
                placeholder="search stock by name or symbol..."
            />
          </div>
      </div>
    </form>
  );
}

export default NavbarSearch;
