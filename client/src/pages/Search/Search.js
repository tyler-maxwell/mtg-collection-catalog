// React
import React from 'react';
//components
import Nav from '../../components/Nav';

const Search = props => {
  return (
    <React.Fragment>
      <Nav
        isPublic={false}
        // username={props.user.username}
        // logOut={() => props.authLogout(props.user.username)}
      />
    </React.Fragment>
  );
};

export default Search;
