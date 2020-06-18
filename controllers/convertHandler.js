const getUnit = input => {
  const result = input.split(/[^a-zA-Z]+/gm).map(el => el.toLowerCase())
  return result[1] || result[0]
}

function ConvertHandler() {
  this.validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg']

  this.getNum = input => {
    let result
    const unit = getUnit(input)
    const results = input
      .replace(unit, '')
      .split('/')
      .filter(el => el.trim() !== '')

    switch (results.length) {
      case 0:
        result = 1
        break
      case 1:
        result = parseFloat(results[0])
        break
      case 2:
        result = parseFloat(parseFloat(results[0]) / parseFloat(results[1]))
        break
      default:
        result = 'invalid number'
        break
    }

    return result
  }

  this.getUnit = input => {
    var unit = getUnit(input)

    if (!this.validUnits.includes(unit)) {
      return 'invalid unit'
    }
    return unit
  }

  this.getReturnUnit = initUnit => {
    switch (initUnit) {
      case 'gal':
        return 'l'
      case 'l':
        return 'gal'
      case 'mi':
        return 'km'
      case 'km':
        return 'mi'
      case 'lbs':
        return 'kg'
      case 'kg':
        return 'lbs'

      default:
        return ''
    }
  }

  this.spellOutUnit = unit => {
    switch (unit) {
      case 'gal':
        return 'gallons'
      case 'l':
        return 'litres'
      case 'mi':
        return 'miles'
      case 'km':
        return 'kilometers'
      case 'lbs':
        return 'pounds'
      case 'kg':
        return 'kilograms'

      default:
        return ''
    }
  }

  this.convert = (initNum, initUnit) => {
    const galToL = 3.78541
    const lbsToKg = 0.453592
    const miToKm = 1.60934

    let output = 0

    if (typeof initNum === 'number') {
      switch (initUnit) {
        case 'gal':
          output = initNum * galToL
          break
        case 'l':
          output = initNum / galToL
          break
        case 'mi':
          output = initNum * miToKm
          break
        case 'km':
          output = initNum / miToKm
          break
        case 'lbs':
          output = initNum * lbsToKg
          break
        case 'kg':
          output = initNum / lbsToKg
          break

        default:
          output = 0
      }
    }

    return output === 0 ? 0 : Math.round(output * 10000000) / 10000000
  }

  this.getString = (initNum, initUnit, returnNum, returnUnit) => {
    let string = ''
    const invalidInit = initUnit === 'invalid unit'
    const invalidNum = initNum === 'invalid number'

    if (invalidInit && invalidNum) {
      string = 'invalid number and unit'
    } else if (invalidInit) {
      string = 'invalid unit'
    } else if (invalidNum) {
      string = 'invalid number'
    } else {
      const initUnitSpell = this.spellOutUnit(initUnit)
      const returnUnitSpell = this.spellOutUnit(returnUnit)
      string = `${initNum} ${initUnitSpell} converts to ${returnNum} ${returnUnitSpell}`
    }

    return { initNum, initUnit, returnNum, returnUnit, string }
  }
}

module.exports = ConvertHandler
