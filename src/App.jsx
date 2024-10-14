import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import AppLayout from "./ui/AppLayout";
import ProtectedRoutes from "./ui/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import TeacherProfile from "./pages/TeacherProfile";
import TeacherSchedule from "./pages/TeacherSchedule";
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
            <GlobalStyles />
            <BrowserRouter>
                <Routes>
                    <Route
                        element={
                            <ProtectedRoutes>
                                <AppLayout />
                            </ProtectedRoutes>
                        }
                    >
                        <Route
                            index
                            element={<Navigate replace to="dashboard" />}
                        />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="user" element={<User />} />
                        <Route path="booking" element={<Bookings />} />
                        <Route path="cabin" element={<Cabins />} />
                        <Route path="schedule" element={<TeacherSchedule/>} />
                        <Route path="profile" element={<TeacherProfile/>} />
                    </Route>
                    <Route path="login" element={<Login />} />
                </Routes>
            </BrowserRouter>
            <Toaster
                position="top-right"
                reverseOrder={false}
                gutter={12}
                containerStyle={{ margin: "8px" }}
                toastOptions={{
                    success: {
                        duration: 3000,
                    },
                    error: {
                        duration: 5000,
                    },
                    style: {
                        fontSize: "16px",
                        maxWidth: "500px",
                        padding: "16px 24px",
                        backgroundColor: "var(--color-grey-0)",
                        color: "var(--color-grey-700)",
                    },
                }}
            />
        </QueryClientProvider>
    );
}

export default App;
