import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import SignInPage from "./pages/auth/AuthPage";
import { ThemeProvider } from "./components/AuthProvider";
import PostDetailPage from "./pages/postDetailPage/PostDetailPage";
import Header from "./components/Header"; // Ensure Header is imported

function App() {
  return (
    <ThemeProvider>
      <Router>
        {/* Header is placed outside of Routes */}
        <Header />
        <Routes>
          <Route path="/login" element={<SignInPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          {/* Add other routes here */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
