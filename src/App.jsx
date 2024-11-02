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
import MyClass from "./pages/MyClass";
import Fees from "./pages/Fees";
import FeesPage from "./pages/FeePages";
import FeeWithClass from "./pages/FeeWithClass";
import AdminSalaryPage from "./pages/admin/AdminSalaryPage";
import Register from "./pages/Register";
import StudentClass from "./pages/StudentClass";
import StudentClassDetail from "./pages/StudentClassDetail";
import Admin from "./pages/Admin";
import Student from "./pages/Student";
import Teacher from "./pages/Teacher";
import Class from "./pages/Class";
import ClassSchedule from "./features/admin/classes/ClassSchedule";

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
                        <Route path="admin" element={<Admin />} />
                        <Route path="student" element={<Student />} />
                        <Route path="teacher" element={<Teacher />} />
                        <Route path="class" element={<Class />} />
                        <Route
                            path="class/:classId/schedule"
                            element={<ClassSchedule />}
                        />
                        <Route path="booking" element={<Bookings />} />
                        <Route path="cabin" element={<Cabins />} />
                        <Route path="fees" element={<FeesPage />} />
                        <Route path="fees/:feeId" element={<FeeWithClass />} />
                        <Route path="salaries" element={<AdminSalaryPage />} />

                        {/* Student */}
                        <Route path="students/my-class" element={<MyClass />} />
                        <Route path="students/classes" element={<StudentClass />} />
                        <Route path="students/classes/:classid" element={<StudentClassDetail />} />
                        <Route path="students/fees" element={<Fees />} />
                    </Route>
                    <Route path="register" element={<Register />} />
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
