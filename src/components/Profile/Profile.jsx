import propTypes from "prop-types";
import React, { Fragment } from "react";
import styled from "styled-components";
import icons from "./Icons";

const Ul = styled.ul`
  display: flex;
  list-style-type: none;
  padding: 0 20px;
  justify-content: space-between;

  svg {
    filter: grayscale(100%);
    margin-right: 5px;
  }
  a {
    display: flex;
    align-items: center;
  }
  a:hover svg {
    filter: none;
  }

  li:nth-child(3) {
    order: -1;
  }
`;

const Profile = ({ data: { city = "", languages = [], social = [] } }) => {
  return (
    <Fragment>
      <h4>Город: {city}</h4>
      <h4>Знание языков:</h4>
      <ul>{languages.map(lang => <li key={lang}>{lang}</li>)}</ul>
      <h4>Ссылки:</h4>
      <Ul>
        {social.map(({ label, link }) => (
          <li key={label}>
            <a target="_blank" href={link}>
              {icons[label]}
              <span>{label}</span>
            </a>
          </li>
        ))}
      </Ul>
    </Fragment>
  );
};

Profile.propTypes = {
  data: propTypes.shape({
    city: propTypes.string.isRequired,
    languages: propTypes.array.isRequired,
    social: propTypes.array.isRequired
  }).isRequired
};

export default Profile;
