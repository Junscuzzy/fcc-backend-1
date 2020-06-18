/* eslint-disable no-undef */

const chai = require('chai')
const assert = chai.assert
const ConvertHandler = require('../controllers/convertHandler.js')

const convertHandler = new ConvertHandler()

suite('Unit Tests', () => {
  suite('  convertHandler.getNum(input)', () => {
    test('Whole number input', done => {
      const input = '32L'
      assert.equal(convertHandler.getNum(input), 32)
      done()
    })

    test('Decimal Input', done => {
      const input = '5.4L'
      assert.equal(convertHandler.getNum(input), 5.4)
      done()
    })

    test('Fractional Input', done => {
      const input = '1/2km'
      assert.equal(convertHandler.getNum(input), 0.5)
      done()
    })

    test('Fractional Input w/ Decimal', done => {
      const input = '5.4/3lbs'
      assert.equal(convertHandler.getNum(input), 1.8)
      done()
    })

    test('Invalid Input (double fraction)', done => {
      const input = '5/5/5km'
      assert.equal(convertHandler.getNum(input), 'invalid number')
      done()
    })

    test('No Numerical Input', done => {
      const input = 'km'
      assert.equal(convertHandler.getNum(input), 1)
      done()
    })
  })

  suite('  convertHandler.getUnit(input)', () => {
    test('Valid Unit Inputs', done => {
      convertHandler.validUnits.forEach(ele => {
        assert.equal(convertHandler.getUnit(ele), ele)
      })
      done()
    })

    test('Unknown Unit Input', done => {
      assert.equal(convertHandler.getUnit('azerty'), 'invalid unit')
      done()
    })
  })

  suite('  convertHandler.getReturnUnit(initUnit)', () => {
    test('For Each Valid Unit Inputs', done => {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg']
      const expect = ['l', 'gal', 'km', 'mi', 'kg', 'lbs']
      input.forEach((ele, i) => {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i])
      })
      done()
    })
  })

  suite('  convertHandler.spellOutUnit(unit)', () => {
    test('For Each Valid Unit Inputs', done => {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg']
      const expect = [
        'gallons',
        'litres',
        'miles',
        'kilometers',
        'pounds',
        'kilograms',
      ]
      input.forEach((elt, i) => {
        assert.equal(convertHandler.spellOutUnit(elt), expect[i])
      })
      done()
    })
  })

  suite('  convertHandler.convert(num, unit)', () => {
    test('Gal to L', done => {
      const input = [5, 'gal']
      const expected = 18.9271
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1,
      ) // 0.1 tolerance
      done()
    })

    test('L to Gal', done => {
      const input = [5, 'l']
      const expected = 1.32086
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1,
      ) // 0.1 tolerance
      done()
    })

    test('Mi to Km', done => {
      const input = [5, 'mi']
      const expected = 8.04672
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1,
      ) // 0.1 tolerance
      done()
    })

    test('Km to Mi', done => {
      const input = [5, 'km']
      const expected = 3.106856
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1,
      ) // 0.1 tolerance
      done()
    })

    test('Lbs to Kg', done => {
      const input = [5, 'lbs']
      const expected = 2.267962
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1,
      ) // 0.1 tolerance
      done()
    })

    test('Kg to Lbs', done => {
      const input = [5, 'kg']
      const expected = 11.02311
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1,
      ) // 0.1 tolerance
      done()
    })
  })
})
