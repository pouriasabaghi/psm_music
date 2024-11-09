import Login from "./pages/Login";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Toaster as Sonner } from "@/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoutes from "./layouts/ProtectedRoutes";
import UploadSong from "./pages/UploadSong";
import EditSong from "./pages/EditSong";
import { PlayerContextProvider } from "./context/PlayerContext";
import Song from "./pages/Song";
import Favorites from "./pages/Favorites";
import { ProgressContextProvider } from "./context/ProgressContext";
import Playlists from "./pages/Playlists";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Sonner  />
      
      <BrowserRouter>
        <PlayerContextProvider>
          <ProgressContextProvider>

          <Routes>
            <Route
              element={
                <ProtectedRoutes>
                  <AppLayout />
                </ProtectedRoutes>
              }
            >
              <Route path="/" element={<Dashboard />} />
              <Route path="/songs/:id" element={<Song />} />
              <Route path="/songs/upload" element={<UploadSong />} />
              <Route path="/songs/edit/:id" element={<EditSong />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/playlists" element={<Playlists />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
          </ProgressContextProvider>
        </PlayerContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
