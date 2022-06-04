const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");
const { json } = require("express/lib/response");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout(5000);
  suite("Integration tests with chai-http", function () {
    // #1
    test("Convert a valid input such as 10L: GET request to /api/convert.", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=10L")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, "L");
          assert.approximately(res.body.returnNum, 2.64172, 0.1);
          assert.equal(res.body.returnUnit, "gal");
          /*  assert.equal(
            res.text,
            JSON.stringify({
              initNum: 10,
              initUnit: "l",
              returnNum: 2.64172,
              returnUnit: "gal",
              string: "10 liters converts to 2.64172 gallons",
            })
          );*/
          done();
        });
    });
    // #2
    test("Convert an invalid input such as 32g: GET request to /api/convert.", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=32g")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid unit");
          done();
        });
    });
    // #3
    test("Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=3/7.2/4kg")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid number");
          done();
        });
    });
    // #4
    test("Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=3/7.2/4kilomegagram")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid number and unit");
          done();
        });
    });
    // #5
    test("Convert with no number such as kg: GET request to /api/convert", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=kg")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 1);
          assert.equal(res.body.initUnit, "kg");
          assert.approximately(res.body.returnNum, 2.20462, 0.1);
          assert.equal(res.body.returnUnit, "lbs");
          assert.equal(
            res.body.string,
            "1 kilograms converts to 2.20462 pounds"
          );
          /*assert.equal(
            res.text,
            JSON.stringify({
              initNum: 1,
              initUnit: "kg",
              returnNum: 2.20462,
              returnUnit: "lbs",
              string: "1 kilograms converts to 2.20462 pounds",
            })
          );*/
          done();
        });
    });
  });
});
