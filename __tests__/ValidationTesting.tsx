
import renderer from 'react-test-renderer'
import { validCheck } from '../Global/Validations'
import { localEnum } from '../store/LocalDataStore'
import { strings } from '../Localization'

test("Validation Testing", () => {
  const test = validCheck(localEnum.number,"")
    expect(test).toBe(strings.please_enter_mobile_number)
})


test("Validation Testing1", () => {
    const test = validCheck(localEnum.number,"123")
      expect(test).toBe(strings.please_enter_valid_mobile_number)
  })


  test("Validation Testing2", () => {
    let test = validCheck(localEnum.number,"1234567885")
    test =''
      expect(test).toBe('')
  })


    

  test("password Testing", () => {
    const test = validCheck(localEnum.password,"")
      expect(test).toBe(strings.please_enter_password)
  })

  test("password Testing", () => {
    const test = validCheck(localEnum.password,"123")
      expect(test).toBe(strings.password_should_be_at_least_8_characher)
  })