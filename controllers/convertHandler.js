const res = require("express/lib/response");

function ConvertHandler() {
  this.getNum = function (input) {
    const numBeginRegex = /^\d+(\.){0,1}\d*(\/){0,1}\d*(\.){0,1}\d*/g;
    const fracionRegex = /\//g;
    const unitRegex = /\D+$/gi;

    /* insure to have only one insance of / or . in the number */
    if (input.split("").filter((i) => i === "/").length > 1) return null;
    if (input.split("").filter((i) => i === ".").length > 1) return null;

    /* when only the unit is provided */
    if (String(input.match(unitRegex)).length == input.length) {
      return 1;
    }
    let result = String(input.match(numBeginRegex));

    /* fraction processing */
    if (fracionRegex.test(result)) {
      let fraction = result.split("/");
      result = fraction[1] != 0 ? fraction[0] / fraction[1] : null;
    }
    if (result === undefined) {
      result = null;
    }

    return Number(result);
  };

  this.getUnit = function (input) {
    const LetEndRegex = /[a-z]+$/gi;
    let result = input.match(LetEndRegex);

    /* const str = String(result).toLowerCase();
    switch (str) {
      case "l":
      case "kg":
      case "km":
        result = str.charAt(0).toUpperCase() + str.slice(1);
        break;
    }*/
    result = String(result).toLowerCase();
    if (result === "l") {
      result = "L";
    }
    return this.getReturnUnit(result) ? result : null;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    switch (String(initUnit).toLowerCase()) {
      case "gal":
        result = "L";
        break;
      case "l":
        result = "gal";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
      case "mi":
        result = "km";
        break;
      case "km":
        result = "mi";
        break;
      default:
        result = null;
        break;
    }

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    switch (String(unit).toLowerCase()) {
      case "gal":
        result = "gallons";
        break;
      case "l":
        result = "liters";
        break;
      case "lbs":
        result = "pounds";
        break;
      case "kg":
        result = "kilograms";
        break;
      case "mi":
        result = "miles";
        break;
      case "km":
        result = "kilometers";
        break;
    }
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (String(initUnit).toLowerCase()) {
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
    }
    return Number(result);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result =
      initNum +
      " " +
      this.spellOutUnit(initUnit) +
      " converts to " +
      returnNum +
      " " +
      this.spellOutUnit(returnUnit);

    return {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string:
        initNum +
        " " +
        this.spellOutUnit(initUnit) +
        " converts to " +
        returnNum +
        " " +
        this.spellOutUnit(returnUnit),
    };
  };
}

module.exports = ConvertHandler;
