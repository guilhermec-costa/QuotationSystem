import { useEffect, useState } from "react";
import { LogOut, ShoppingCart, BarChart, User, ShoppingBag, SquareChevronLeft, SquareChevronRight, Github, Store, DollarSign, ContactRound } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ThemeSwitcher from "../ThemeSwitcher";
import NavItem from "./NavItem";
import useClickOutside from "@/hooks/useClickOutside";

const DesktopNavigation = ({ children }) => {
    const { logout, isAdmin } = useAuth();
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const sidebarRef = useClickOutside(() => setIsSidebarVisible(false));

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/auth");
    };

    useEffect(() => {
        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                setIsSidebarVisible(false)
            }
        })

        return () => {
            window.removeEventListener("keydown", window);
        }
    }, []);

    return (
        <>
            <div className={`fixed top-0 bottom-0 left-0 bg-card text-card-foreground z-20 shadow-lg transition-transform duration-300 ease-in-out transform ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'}`}
                ref={sidebarRef}>
                <div className="flex flex-col h-full">
                    <div className="h-[50px] flex justify-end items-center pr-3">
                        <div
                            className="cursor-pointer hover:bg-muted p-1 rounded-md transition-colors duration-200 ease-in-out"
                            onClick={() => setIsSidebarVisible(false)}
                        >
                            <SquareChevronLeft className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto px-4">
                        <NavItem title="Dashboard" link="/" icon={<BarChart />} cb={() => setIsSidebarVisible(false)} />
                        <NavItem title="Products" link="/products" icon={<ShoppingBag />} cb={() => setIsSidebarVisible(false)} />
                        {isAdmin() && (
                            <NavItem title="User Managing" link="/me" icon={<User />} cb={() => setIsSidebarVisible(false)} />
                        )}
                        <NavItem title="Contacts" link="/contacts" icon={<ContactRound />} cb={() => setIsSidebarVisible(false)} />
                        <NavItem title="Suppliers" link="/suppliers" icon={<Store />} cb={() => setIsSidebarVisible(false)} />
                        <NavItem title="Quotations" link="/quotations" icon={<DollarSign />} cb={() => setIsSidebarVisible(false)} />
                        <NavItem title="Purchase Requisitions" link="/purchase-requisition" icon={<ShoppingCart />} cb={() => setIsSidebarVisible(false)} />
                    </div>
                    <div className="p-4">
                        <a
                            href="https://github.com/GuiC0506/quotation-system"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 p-2 bg-muted hover:bg-muted/80 rounded-md transition-colors duration-200 ease-in-out"
                        >
                            <Github className="w-5 h-5" />
                            <span className="text-sm font-medium">GitHub</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center h-[50px] bg-secondary px-4">
                <div
                    className="cursor-pointer hover:bg-card p-1 rounded-md transition-colors duration-200 ease-in-out"
                    onClick={() => setIsSidebarVisible(prev => !prev)}
                >
                    {isSidebarVisible ? (
                        <SquareChevronLeft className="w-6 h-6" />
                    ) : (
                        <SquareChevronRight className="w-6 h-6" />
                    )}
                </div>
                <div className="flex gap-4 items-center">
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
