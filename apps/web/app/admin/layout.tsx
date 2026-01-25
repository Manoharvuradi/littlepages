import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}