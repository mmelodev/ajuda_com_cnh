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
import DefensiveDrivingLayout from "./pages/defensiveDriving/DefensiveDrivingLayout";
import DefensiveModuleHome from "./pages/defensiveDriving/ModuleHome";
import DefensiveCatalog from "./pages/defensiveDriving/Catalog";
import DefensiveQuiz from "./pages/defensiveDriving/Quiz";

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
          <Route path="direcao-defensiva" element={<DefensiveDrivingLayout />}>
            <Route index element={<DefensiveModuleHome />} />
            <Route path="catalogo" element={<DefensiveCatalog />} />
            <Route path="quiz" element={<DefensiveQuiz />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
