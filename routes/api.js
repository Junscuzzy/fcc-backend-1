'use strict'

const ConvertHandler = require('../controllers/convertHandler.js')

module.exports = app => {
  const convertHandler = new ConvertHandler()

  app.route('/api/convert').get((req, res) => {
    const input = req.query.input
    const initNum = convertHandler.getNum(input)
    const initUnit = convertHandler.getUnit(input)
    const returnNum = convertHandler.convert(initNum, initUnit)
    const returnUnit = convertHandler.getReturnUnit(initUnit)

    const toString = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit,
    )

    // console.log(toString)

    res.json(toString)
  })
}
