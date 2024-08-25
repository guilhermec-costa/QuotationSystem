import { useEffect, useState } from "react";
import {
    LogOut,
    ShoppingCart,
    BarChart,
    User,
    ShoppingBag,
    SquareChevronLeft,
    SquareChevronRight,
    Github,
    Store,
    DollarSign,
    ContactRound
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ThemeSwitcher from "../ThemeSwitcher";
import NavItem from "./NavItem";
import useClickOutside from "@/hooks/useClickOutside";
import { Separator } from "../ui";
import { Badge } from "../ui/badge";

const DesktopNavigation = ({ children }) => {
    const { logout, getIsAdmin, userData } = useAuth();
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const sidebarRef = useClickOutside(() => setIsSidebarVisible(false));

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/auth");
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setIsSidebarVisible(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <>
            <div
                className={`fixed top-0 bottom-0 left-0 z-50 w-[300px] bg-card text-card-foreground shadow-2xl transition-transform duration-300 ease-in-out transform ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'}`}
                ref={sidebarRef}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between h-[50px] px-3 bg-primary text-primary-foreground">
                        <h2 className="text-lg font-semibold">Menu</h2>
                        <div
                            className="cursor-pointer hover:bg-muted p-2 rounded-md transition-colors duration-200 ease-in-out"
                            onClick={() => setIsSidebarVisible(false)}
                        >
                            <SquareChevronLeft className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="px-4 py-4 space-y-4">
                        <h3 className="text-xl font-bold text-primary-foreground">
                            You are welcome, {userData.email}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Here you can manage all your activities and access important information.
                        </p>

                        <p>Logged as
                            <Badge variant="outline" className="bg-yellow-500 ml-2 text-sm">
                                {getIsAdmin() ? "Administrator" : "Colaborator"}
                            </Badge>
                        </p>
                    </div>
                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
                        <NavItem title="Dashboard" link="/" icon={<BarChart />} cb={() => setIsSidebarVisible(false)} />
                        <Separator />
                        <NavItem title="Products" link="/products" icon={<ShoppingBag />} cb={() => setIsSidebarVisible(false)} />
                        {getIsAdmin() && (
                            <>
                                <Separator />
                                <NavItem title="User Managing" link="/me" icon={<User />} cb={() => setIsSidebarVisible(false)} />
                            </>
                        )}
                        <Separator />
                        <NavItem title="Contacts" link="/contacts" icon={<ContactRound />} cb={() => setIsSidebarVisible(false)} />
                        <Separator />
                        <NavItem title="Suppliers" link="/suppliers" icon={<Store />} cb={() => setIsSidebarVisible(false)} />
                        <Separator />
                        <NavItem title="Quotations" link="/quotations" icon={<DollarSign />} cb={() => setIsSidebarVisible(false)} />
                        <Separator />
                        <NavItem title="Purchase Requisitions" link="/purchase-requisition" icon={<ShoppingCart />} cb={() => setIsSidebarVisible(false)} />
                        <Separator />
                    </div>
                    <div className="p-4 border-t border-muted">
                        <a
                            href="https://github.com/GuiC0506/quotation-system"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 p-3 bg-muted hover:bg-muted/80 rounded-md transition-colors duration-200 ease-in-out"
                        >
                            <Github className="w-5 h-5" />
                            <span className="text-sm font-medium">GitHub</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between h-[60px] px-4 bg-secondary text-secondary-foreground">
                <div
                    className="cursor-pointer hover:bg-card p-2 rounded-md transition-colors duration-200 ease-in-out"
                    onClick={() => setIsSidebarVisible((prev) => !prev)}
                >
                    {isSidebarVisible ? (
                        <SquareChevronLeft className="w-6 h-6" />
                    ) : (
                        <SquareChevronRight className="w-6 h-6" />
                    )}
                </div>
                <div className="flex items-center gap-4">
                    <ThemeSwitcher className="w-6 h-6 cursor-pointer" />
                    <LogOut onClick={handleLogout} className="w-6 h-6 cursor-pointer" />
                </div>
            </div>

            <div className={`transition-opacity duration-300 ease-in-out ${isSidebarVisible ? 'opacity-50' : 'opacity-100'}`}>
                {children}
            </div>
        </>
    );
};

export default DesktopNavigation;
