import { NavLink, Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Products", path: "/products", icon: "📦" },
    { name: "Categories", path: "/categories", icon: "🏷️" },
    { name: "Orders", path: "/orders", icon: "🛒" },
    { name: "Customers", path: "/customers", icon: "👥" },
    { name: "Messages", path: "/messages", icon: "💬" },
    { name: "Inventory", path: "/inventory", icon: "📋" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 fixed left-0 top-0 h-screen flex flex-col">
        
        {/* Logo */}
        <div className="px-6 py-6 border-b border-slate-200">
          <h1 className="text-2xl font-bold text-orange-500">
            HappyBites
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Admin Panel
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "text-slate-600 hover:bg-orange-50 hover:text-orange-500"
                }`
              }
            >
              <span>{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-500 transition"
          >
            <span>🚪</span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="ml-64 flex-1">
        
        {/* Top Bar */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              Welcome to HappyBites
            </h2>

            <p className="text-sm text-slate-500">
              Manage your store from here
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              👤
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Admin
              </p>

              <p className="text-xs text-slate-500">
                Administrator
              </p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;