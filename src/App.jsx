import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Toaster as Sonner } from "@/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { PlayerContextProvider } from "./context/PlayerContext";
import { ProgressContextProvider } from "./context/ProgressContext";

import AppLayout from "./layouts/AppLayout";
import ProtectedRoutes from "./layouts/ProtectedRoutes";

import "./App.css";

import TopLists from "./pages/TopLists";
import TopSongs from "./pages/TopSongs";
import Search from "./pages/Search";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UploadSong from "./pages/UploadSong";
import EditSong from "./pages/EditSong";
import Song from "./pages/Song";
import Favorites from "./pages/Favorites";
import Playlists from "./pages/Playlists";
import Playlist from "./pages/Playlist";
import EditPlaylist from "./pages/EditPlaylist";
import SharePlaylist from "./pages/SharePlaylist";
import SongsBulkActions from "./pages/SongsBulkActions";
import { NetworkStatusContextProvider } from "./context/NetworkStatusContext";
import { ApplicationSettingsProvider } from "./context/ApplicationSettings";
import { PlayerActionsContextProvider } from "./context/PlayerActionsCotext";
import { PlayerControllerContextProvider } from "./context/PlayerControllerContext";
import { PlayerModeContextProvider } from "./context/PlayerModeContext";
/* const TopLists = lazy(() => import("./pages/TopLists"));
const TopSongs = lazy(() => import("./pages/TopSongs"));
const Search = lazy(() => import("./pages/Search"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const UploadSong = lazy(() => import("./pages/UploadSong"));
const EditSong = lazy(() => import("./pages/EditSong"));
const Song = lazy(() => import("./pages/Song"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Playlists = lazy(() => import("./pages/Playlists"));
const Playlist = lazy(() => import("./pages/Playlist"));
const EditPlaylist = lazy(() => import("./pages/EditPlaylist"));
const SharePlaylist = lazy(() => import("./pages/SharePlaylist"));
const SongsBulkActions = lazy(() => import("./pages/SongsBulkActions")); */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Sonner />
      <BrowserRouter>
        <NetworkStatusContextProvider>
          <ApplicationSettingsProvider>
            <PlayerContextProvider>
              <PlayerModeContextProvider>
                <PlayerControllerContextProvider>
                  <PlayerActionsContextProvider>
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
                          <Route path="/top-playlists" element={<TopLists />} />
                          <Route path="/top-songs" element={<TopSongs />} />
                          <Route
                            path="/songs/upload"
                            element={<UploadSong />}
                          />
                          <Route
                            path="/songs/edit/:id"
                            element={<EditSong />}
                          />
                          <Route path="/favorites" element={<Favorites />} />
                          <Route path="/playlists" element={<Playlists />} />
                          <Route
                            path="/playlists/:id/:name"
                            element={<Playlist />}
                          />
                          <Route
                            path="/playlists/edit/:id"
                            element={<EditPlaylist />}
                          />
                          <Route path="/search" element={<Search />} />
                          <Route
                            path="songs-bulk-actions"
                            element={<SongsBulkActions />}
                          />
                        </Route>

                        <Route element={<AppLayout />}>
                          <Route path="/songs/:id" element={<Song />} />
                          <Route
                            path="/playlists/share/:id/:name"
                            element={<SharePlaylist />}
                          />
                        </Route>

                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                      </Routes>
                    </ProgressContextProvider>
                  </PlayerActionsContextProvider>
                </PlayerControllerContextProvider>
              </PlayerModeContextProvider>
            </PlayerContextProvider>
          </ApplicationSettingsProvider>
        </NetworkStatusContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
