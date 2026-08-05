import { Outlet } from 'react-router-dom';
import Footer from './Footer.jsx';
import Header from './Header.jsx';

function MainLayout({ cartCount = 0 }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header cartCount={cartCount} />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
