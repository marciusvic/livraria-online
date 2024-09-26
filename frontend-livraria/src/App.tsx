import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./hooks/AuthContext";
import AppRouter from "./routes/Router";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </Router>
  );
};

export default App;
