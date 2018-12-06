import { createStackNavigator } from "react-navigation";

import CreateAccount from "../Screens/CreateAccount";
import SignIn from "../Screens/SignIn";

const SignedOutStack = createStackNavigator({
  SignIn: { screen: SignIn },
  CreateAccount: { screen: CreateAccount },
}, {
    initialRouteName: 'SignIn',
    headerMode: 'none',
});

export default SignedOutStack