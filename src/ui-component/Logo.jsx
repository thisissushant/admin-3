// material-ui
import { useTheme } from "@mui/material/styles";
import logo from 'assets/images/easework_ai_logo.png';

const Logo = () => {
  const theme = useTheme();

  return <img src={logo} alt="Easework ai" width="150" />;
};

export default Logo;
