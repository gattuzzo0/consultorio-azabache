import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { azabacheTheme } from "./lib/muiTheme";
import { PublicLayout } from "./components/PublicLayout";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Home } from "./pages/Home";
import { Doctoras } from "./pages/Doctoras";
import { SaludOcupacional } from "./pages/SaludOcupacional";
import { Ubicacion } from "./pages/Ubicacion";
import { AgendarCita } from "./pages/AgendarCita";
import { NotFound } from "./pages/NotFound";

export default function App() {
  return (
    <ThemeProvider theme={azabacheTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="doctoras" element={<Doctoras />} />
            <Route path="salud-ocupacional" element={<SaludOcupacional />} />
            <Route path="ubicacion" element={<Ubicacion />} />
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
  );
}
