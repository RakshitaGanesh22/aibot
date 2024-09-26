import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline,Box } from '@mui/material';
import { useContext } from 'react'; 
import theme from "./themeprovider/theme.jsx";
import BotUi from "./components/BotUi.jsx"
import Home from "./pages/HomePage";
import History from "./pages/HistoryPage";
import './App.css';
import ResponsiveAppBar from './components/SideBar.jsx'; 
import { ThemeContext } from './themeprovider/themeContext.jsx'; 
import InitialQus from './components/InitialQus';

function App() {
  const { mode, setMode, toggleTheme} = useContext(ThemeContext); // Use context to get current mode and setter

  
  return (
    <ThemeProvider theme={theme(mode)}> 
      <CssBaseline />
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </Router>
    </ThemeProvider>
  );
  
}

export default App;
      
