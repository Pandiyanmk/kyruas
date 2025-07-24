import renderer from 'react-test-renderer'
import { SplashScreen } from '../Screens/authentication/SplashScreen'


test("Splash Test", () => {
    const snapshot = renderer.create(<SplashScreen navigation={null} />)
    expect(snapshot).toMatchSnapshot()
})