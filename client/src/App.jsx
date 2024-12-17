import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import SignInPage from "./pages/auth/AuthPage";
import { ThemeProvider } from "./components/AuthProvider";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<SignInPage />} />

          {/* Protected route, only accessible if user is signed in */}
          <Route path="/" element={<HomePage />} />

          {/* Add other routes here */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
