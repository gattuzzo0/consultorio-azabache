import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { azabacheTheme } from "./lib/muiTheme";
import { PublicLayout } from "./components/PublicLayout";
import { ScrollToTop } from "./components/ScrollToTop";
import { SplashScreen } from "./components/SplashScreen";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Home } from "./pages/Home";
import { SaludOcupacional } from "./pages/SaludOcupacional";
import { Ubicacion } from "./pages/Ubicacion";
import { AgendarCita } from "./pages/AgendarCita";
import { ComosCuidarTuSalud } from "./pages/ComosCuidarTuSalud";
import { ListaEstudios } from "./pages/ListaEstudios";
import { NotFound } from "./pages/NotFound";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <HelmetProvider>
      <ThemeProvider theme={azabacheTheme}>
        <CssBaseline />
        {showSplash ? (
          <SplashScreen onFinished={() => setShowSplash(false)} />
        ) : null}
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="salud-ocupacional" element={<SaludOcupacional />} />
              <Route path="ubicacion" element={<Ubicacion />} />
              <Route
                path="como-cuidar-tu-salud"
                element={<ComosCuidarTuSalud />}
              />
              <Route
                path="lista-estudios"
                element={<ListaEstudios />}
              />
              <Route
                path="agendar"
                element={
                  <ErrorBoundary title="Error al agendar la cita">
                    <AgendarCita />
                  </ErrorBoundary>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}
