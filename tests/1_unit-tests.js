const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  /* */
  suite("Function convertHandler.getNum(input)", () => {
    test("should correctly read a whole number input.", () => {
      const input = "34gal";
      assert.equal(convertHandler.getNum(input), 34);
    });
    test("should correctly read a decimal number input.", () => {
      const input = "35.04l";
      assert.equal(convertHandler.getNum(input), 35.04);
    });
    test(" should correctly read a fractional input", () => {
      const input = "18/9mi";
      assert.equal(convertHandler.getNum(input), 2);
    });
    test("should correctly read a fractional input with a decimal.", () => {
      const input = "22.2/2lb";
      assert.equal(convertHandler.getNum(input), 11.1);
    });
    test("should correctly return an error on a double-fraction (i.e. 3/2/3).", () => {
      const input = "3/2/3l";
      assert.isNull(convertHandler.getNum(input), "error on a double-fraction");
    });

    test("should correctly default to a numerical input of 1 when no numerical input is provided.", () => {
      const input = "km";
      assert.equal(convertHandler.getNum(input), 1);
    });
  });
  /* */
  suite("Function convertHandler.getUnit(input)", () => {
    test("should correctly read each valid input unit", () => {
      const input = [
        "gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "L",
        "MI",
        "KM",
        "LBS",
        "KG",
      ];
      input.forEach((u) => {
        assert.equal(convertHandler.getUnit(u), u.toLowerCase());
      });
    });
    test("should correctly return an error for an invalid input unit.", () => {
      const input = "34html";
      assert.isNull(convertHandler.getUnit(input), "invalid unit");
    });
  });
  /*  */
  suite("Function convertHandler.getReturnUnit(initUnit)", () => {
    test("should return the correct return unit for each valid input unit.", () => {
      const input = ["gal", "l", "lbs", "kg", "mi", "km"];
      const expected = ["L", "gal", "Kg", "lbs", "Km", "mi"];
      input.forEach((u, index) =>
        assert.equal(convertHandler.getReturnUnit(u), expected[index])
      );
    });
  });
  /*  */
  suite("Function convertHandler.spellOutUnit(unit)", () => {
    test("should correctly return the spelled-out string unit for each valid input unit.", () => {
      const input = ["gal", "l", "lbs", "kg", "mi", "km"];
      const expected = [
        "gallons",
        "liters",
        "pounds",
        "kilograms",
        "miles",
        "kilometers",
      ];
      input.forEach((u, index) =>
        assert.equal(convertHandler.spellOutUnit(u), expected[index])
      );
    });
  });

  /*  */
  suite("Function convertHandler.convert(initNum,initUnit)", () => {
    test("convertHandler should correctly convert gal to L", () => {
      const input = [12, "gal"];
      const expected = 45.42492;

      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
    });
    test("convertHandler should correctly convert L to gal", () => {
      const input = [42, "L"];
      const expected = 11.09523;

      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
    });
    test("convertHandler should correctly convert mi to Km", () => {
      const input = [28, "mi"];
      const expected = 45.06152;

      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
    });
    test("convertHandler should correctly convert Km to mi", () => {
      const input = [96, "Km"];
      const expected = 59.65178;

      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
    });
    test("convertHandler should correctly convert lbs to Kg", () => {
      const input = [10.25, "lbs"];
      const expected = 4.64932;

      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
    });
    test("convertHandler should correctly convert Kg to lbs", () => {
      const input = [6, "Kg"];
      const expected = 13.22775;

      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
    });
  });
});
