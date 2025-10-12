import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@src/components/ui/button";
import { Home, LogOut, Newspaper, User, BarChart2, Info } from "lucide-react";
import { GetStatusBadge } from "@go/status/StatusFunctions";
import { useAuth } from "@src/context/AuthContext";

const navItems = [
  { name: "News", href: "/news", icon: Newspaper },
  { name: "About", href: "/about", icon: Info },
];

const authedNavItems = [
  { name: "Profile", href: "/profile", icon: User },
  { name: "Results", href: "/results", icon: BarChart2 },
];

export function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const [serversStatus, setServersStatus] = useState<string | null>(null);

  useEffect(() => {
    GetStatusBadge().then(setServersStatus).catch(console.error);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Home className="h-6 w-6" />
              <span>KNUST AIM Desktop</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {[...navItems, ...(isAuthenticated ? authedNavItems : [])].map(
                (item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                      location.pathname.startsWith(item.href)
                        ? "bg-muted text-primary"
                        : ""
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ),
              )}

              <hr />
              <div className="mt-auto pt-4 items-start">
                {isAuthenticated ? (
                  <Button
                    size="sm"
                    variant="destructive"
                    className={`flex items-center gap-3 rounded-lg px-3 py-2  hover:text-primary`}
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className={`flex items-center gap-3 rounded-lg px-3 py-2  hover:text-primary`}
                    onClick={() => navigate("/login")}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <div className="w-full flex-1">
              {serversStatus && <img src={serversStatus} />}
            </div>
          </header>

          <Outlet />
        </main>
      </div>
    </div>
  );
}
