import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UserArea from "./pages/UserAreaPage";
import ProtectedRoute from "./pages/ProtectedRoute";

import PersonalAreaPage from "./pages/PersonalAreaPage";
import ChartsPage from "./pages/ChartsPage";
import DataPage from "./pages/DataPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/user-area"
            element={
              <ProtectedRoute>
                <UserArea />
              </ProtectedRoute>
            }
          >
            <Route path="/user-area" element={<UserArea />} />
          </Route>

          <Route
            path="/personal-area"
            element={
              <ProtectedRoute>
                <PersonalAreaPage />
              </ProtectedRoute>
            }
          >
            <Route path="/personal-area" element={<PersonalAreaPage />} />
          </Route>

          <Route
            path="/charts"
            element={
              <ProtectedRoute>
                <ChartsPage />
              </ProtectedRoute>
            }
          >
            <Route path="/charts" element={<ChartsPage />} />
          </Route>

          <Route
            path="/data"
            element={
              <ProtectedRoute>
                <DataPage />
              </ProtectedRoute>
            }
          >
            <Route path="/data" element={<DataPage />} />
          </Route>

          <Route path="/" element={<LandingPage />}></Route>
        </Routes>

        <Toaster
          position={"top-right"}
          reverseOrder={false}
          toastOptions={{
            duration: 5000,
            style: {
              padding: "1rem",
              // backgroundColor: "#ffdfff",
              fontSize: "1rem",
              // color: "#17132a",
              // borderColor: "#ff00ff",
              // border: "2px solid #ff00ff",
            },
          }}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
