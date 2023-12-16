const express = require("express");

const validadeTitleField = (request, response, next) => {
  const { body } = request;

  if (body.title === undefined) {
    return response
      .status(400)
      .json({ message: "The field 'title' is requied" });
  }

  if (body.title === "") {
    return response.status(400).json({ message: " 'title' cannot be empty" });
  }

  next();
};

const validadeStatusField = (request, response, next) => {
  const { body } = request;

  if (body.status === undefined) {
    return response
      .status(400)
      .json({ message: "The field 'status' is requied" });
  }

  if (body.status === "") {
    return response.status(400).json({ message: "'status' cannot be empty" });
  }

  next();
};

module.exports = {
  validadeTitleField,
  validadeStatusField,
};
