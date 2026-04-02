"use client";

import "../data-tables-css.css";
import "../satoshi.css";
import "rodal/lib/rodal.css";
import { useState, useEffect } from "react";
import { AppProvider } from "@/context/AppContext";
import AdminSidebar from "@/components/AdminSidebar";
import Loader from "@/components/common/Loader";
import AdminHeader from "@/components/AdminHeader";
import { AdminProvider } from "@/context/AdminContext";
import { AuthProvider } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { UserProvider } from "@/context/UserContext";
import Script from "next/script";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("user")!);

    if (admin === null || !admin.isAdmin) {
      router.push("/auth/login");
    }
  }, [router]);

  return (
    <>
      <Toaster />
      <AppProvider>
        <AuthProvider>
          <UserProvider>
            <AdminProvider>
              <div className="dark:bg-boxdark-2 dark:text-bodydark">
                {loading ? (
                  <Loader />
                ) : (
                  <div className="flex h-screen overflow-hidden">
                    <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                      <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                      <main>
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">{children}</div>
                      </main>
                    </div>
                  </div>
                )}
              </div>
            </AdminProvider>
          </UserProvider>
        </AuthProvider>
      </AppProvider>
      <Script src="//code.tidio.co/qexf9v18mxrecrfy0fpcbxh42i89ldkl.js" async />
    </>
  );
}
