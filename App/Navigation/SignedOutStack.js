import { createStackNavigator } from "react-navigation";

import CreateAccount from "../Screens/CreateAccount";
import SignIn from "../Screens/SignIn";

const SignedOutStack = createStackNavigator({
  CreateAccount: { screen: CreateAccount },
  SignIn: { screen: SignIn }
}, {
    initalRouteName: CreateAccount,
    headerMode: 'none',
});

export default SignedOutStack