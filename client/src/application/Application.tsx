import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "@store";
import ErrorFallback from "./ErrorFallback";
import Router from "./Router";
import { MaterialProvider, CircularProgress } from "@material";
import "react-toastify/dist/ReactToastify.css";
import "./global.scss";

export default function Application() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<CircularProgress />}>
        <MaterialProvider>
          <StoreProvider store={store}>
            <BrowserRouter>
              <Router />
              <ToastContainer />
            </BrowserRouter>
          </StoreProvider>
        </MaterialProvider>
      </Suspense>
    </ErrorBoundary>
  );
}
