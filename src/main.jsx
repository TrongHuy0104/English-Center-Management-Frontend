import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ErrorBoundary } from "react-error-boundary";
import { CookiesProvider } from "react-cookie";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        {/* <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => window.location.replace("/")}
        > */}
        <CookiesProvider defaultSetOptions={{ path: "/" }}>
            <App />
        </CookiesProvider>
        {/* </ErrorBoundary> */}
    </StrictMode>
);
