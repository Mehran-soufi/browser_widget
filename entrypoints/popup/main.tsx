import { createRoot } from 'react-dom/client';
import StarterScreen from '../../components/StarterScreen';
import '../../styles/base.css';

createRoot(document.getElementById('root')!).render(
  <StarterScreen
    title="دسترسی سریع"
    description="ابزارهای پرکاربرد وقت‌نگار"
  />,
);
