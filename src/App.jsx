import { AdminProvider } from './context/AdminContext';
import Layout from './components/Layout';
import './index.css';

function App() {
  return (
    <AdminProvider>
      <Layout />
    </AdminProvider>
  );
}

export default App;