import { Text, TextInput } from "react-native";
import Provider from "./src/navigators/Provider";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

export default function App() {
  return <Provider />;
}
