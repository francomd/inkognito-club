import LoginButton from '../login/LoginButton';
import AdminDetails from './AdminDetails';
import AdminGuard from './AdminGuard';

const Admin = () => {
  return (
    <main>
      <h1>Admin</h1>
      <AdminGuard>
        <AdminDetails />
        <LoginButton />
      </AdminGuard>
    </main>
  );
}

export default Admin;