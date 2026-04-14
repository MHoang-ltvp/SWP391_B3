import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "@/store/auth.context.jsx";
import { appRoutes } from "@/routes/AppRoutes.jsx";

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={appRoutes} />
      <Toaster position="top-right" richColors />
    </AuthProvider>
  );
}
