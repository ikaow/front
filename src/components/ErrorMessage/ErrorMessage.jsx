import propTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Error = styled.p`
  color: #ed1414;
`;

const ErrorMessage = ({ error }) => {
  if (error !== null) {
    switch (error.message) {
      case "Failed to fetch":
        error.message = "Сервер не доступен";
        break;
      case "wrong_email_or_password":
        error.message = "Имя пользователя или пароль введены не верно.";
        break;
      default:
        break;
    }
    return <Error>{error.message}</Error>;
  }

  return null;
};

ErrorMessage.propTypes = {
  error: propTypes.object
};

export default ErrorMessage;
