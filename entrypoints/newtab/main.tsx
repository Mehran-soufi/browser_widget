import { createRoot } from "react-dom/client";
import StarterScreen from "../../components/StarterScreen";
import "../../styles/base.css";

createRoot(document.getElementById("root")!).render(
  <StarterScreen
    title="داشبورد وقت‌نگار"
    description="فضای شخصی تو برای مدیریت زمان و بهره‌وری"
  />,
);
