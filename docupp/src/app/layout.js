
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navigation/Navbar";
import Footer from "@/components/Navigation/Footer";
import { ToastContainer } from "react-toastify";
import ClientProvider from "./ClientProvider";

export const metadata = {
  title: "Docupp",
  description: "Improve your documents",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
       
      >
        <ToastContainer/>
        <Navbar/>
        <ClientProvider>
          {children}
        </ClientProvider>
        <Footer/>
      </body>
    </html>
  );
}
