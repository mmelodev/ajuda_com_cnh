import { HashRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import Home from "./pages/Home";
import VerticalSignageLayout from "./pages/verticalSignage/VerticalSignageLayout";
import VerticalModuleHome from "./pages/verticalSignage/ModuleHome";
import VerticalCatalog from "./pages/verticalSignage/Catalog";
import VerticalQuiz from "./pages/verticalSignage/Quiz";
import HorizontalSignageLayout from "./pages/horizontalSignage/HorizontalSignageLayout";
import HorizontalModuleHome from "./pages/horizontalSignage/ModuleHome";
import HorizontalCatalog from "./pages/horizontalSignage/Catalog";
import HorizontalQuiz from "./pages/horizontalSignage/Quiz";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="sinalizacao-vertical" element={<VerticalSignageLayout />}>
            <Route index element={<VerticalModuleHome />} />
            <Route path="catalogo" element={<VerticalCatalog />} />
            <Route path="quiz" element={<VerticalQuiz />} />
          </Route>
          <Route path="sinalizacao-horizontal" element={<HorizontalSignageLayout />}>
            <Route index element={<HorizontalModuleHome />} />
            <Route path="catalogo" element={<HorizontalCatalog />} />
            <Route path="quiz" element={<HorizontalQuiz />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
