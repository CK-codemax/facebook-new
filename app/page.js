import Welcome from "./components/Welcome";
import AuthProvider from "./context/AuthProvider";

export default function page() {
  return(
    <AuthProvider>
      <Welcome />
    </AuthProvider>
  )
}
