import RegisterForm from './components/Register.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import {LoginForm} from './components/Login.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*<Route path="/" element={<LoginForm/>}/>*/}
        <Route path="/register" element={<RegisterForm />} />
        {/* Redirección ante rutas no reconocidas (404) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
