import { HashRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import Home from "./pages/Home";
import VerticalSignageLayout from "./pages/verticalSignage/VerticalSignageLayout";
import ModuleHome from "./pages/verticalSignage/ModuleHome";
import Catalog from "./pages/verticalSignage/Catalog";
import Quiz from "./pages/verticalSignage/Quiz";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="sinalizacao-vertical" element={<VerticalSignageLayout />}>
            <Route index element={<ModuleHome />} />
            <Route path="catalogo" element={<Catalog />} />
            <Route path="quiz" element={<Quiz />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
