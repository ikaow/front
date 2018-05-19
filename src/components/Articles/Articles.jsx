import propTypes from "prop-types";
import React, { Fragment } from "react";
import styled from "styled-components";

const Ul = styled.ul`
  padding-right: 10px;
`;

const Articles = ({ news }) => {
  return (
    <Fragment>
      <Ul>
        {news.map(article => {
          return (
            <li key={article.id}>
              <h4>{article.title}</h4>
              <p>{article.text}</p>
            </li>
          );
        })}
      </Ul>
      <p>Всего новостей: {news.length}</p>
    </Fragment>
  );
};

Articles.propTypes = {
  news: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      title: propTypes.string.isRequired,
      text: propTypes.string.isRequired
    })
  ).isRequired
};

export default Articles;
