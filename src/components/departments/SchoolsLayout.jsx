import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const SchoolsLayout = () => (
  <div className="min-h-screen">
    <div>
      <Outlet />
    </div>
  </div>
);

export default SchoolsLayout;