import App from './pages/app/App';
import { Routes, Route  } from 'react-router-dom';
import Registration from './pages/registration/registration';
import Home from './pages/home/home';
import Description from './pages/description/description';
function Router() {
  return (
    <>
      <Routes>
        <Route path="" element={<App />} />
        <Route path="/reg" element={<Registration />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile/:userId" element={<Description />} />
      </Routes>
      
    </>
  );
}
export default Router;
