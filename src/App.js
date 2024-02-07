import styles from './App.module.css';
import { AppRoutes } from './routes';

function App() {
  return (
    <div className={styles.conteiner}>
      <AppRoutes />
    </div>
  );
}

export default App;
