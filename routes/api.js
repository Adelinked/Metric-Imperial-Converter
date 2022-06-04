"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  app.get("/api/convert", (req, res) => {
    const input = req.query.input;
    const initUnit = convertHandler.getUnit(input);
    const initNum = convertHandler.getNum(input);

    if (!initNum && !initUnit) return res.send("invalid number and unit");
    else if (!initNum) return res.send("invalid number");
    else if (!initUnit) return res.send("invalid unit");
    else {
      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const toString = convertHandler.getString(
        initNum,
        initUnit,
        Number(returnNum.toFixed(6)),
        returnUnit
      );
      res.json(toString);
    }
  });
};
