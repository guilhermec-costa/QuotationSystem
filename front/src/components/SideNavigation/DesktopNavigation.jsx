import { useState } from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import ThemeSwitcher from "../ThemeSwitcher";
import NavItem from "./NavItem";
import { BarChart, User, ShoppingBag } from "lucide-react";
import { SquareChevronLeft } from "lucide-react";
import { SquareChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Github } from "lucide-react";
import { ContactRound } from "lucide-react";

const DesktopNavigation = ({ children }) => {
    const { logout } = useAuth();
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/auth");
    }

    return (
        <>
            <div className="absolute w-[400px] top-0 bottom-0 -left-full bg-card text-card-foreground data-[open=true]:left-0 z-10 transition-all linear duration-200 delay-0" data-open={isSidebarVisible}>
                <div className="h-[50px] w-full"></div>
                <div className="flex flex-col items-start">
                    <NavItem title="Dashboard" link="/" icon={<BarChart />} cb={() => setIsSidebarVisible(false)} />
                    <NavItem title="Products" link={"/products"} icon={<ShoppingBag />} cb={() => setIsSidebarVisible(false)} />
                    <NavItem title="Profile" link={"/me"} icon={<User />} cb={() => setIsSidebarVisible(false)} />
                    <NavItem title="Contacts" link={"/contacts"} icon={<ContactRound />} cb={() => setIsSidebarVisible(false)} />
                </div>
            </div>
            <div className="flex justify-between items-center h-[50px] bg-secondary">
                <div className="ml-3 z-10 cursor-pointer hover:bg-card p-1 rounded-md" onClick={() => setIsSidebarVisible(prev => !prev)}>
                    {isSidebarVisible ?
                        (<SquareChevronLeft className="w-[26px] h-[26px] outline-none" />)
                        :
                        (<SquareChevronRight className="w-[26px] h-[26px] outline-none" />)
                    }
                </div>
                <div className="flex gap-4 mr-3">
                    <a href="https://github.com/GuiC0506/quotation-system" target="_blank">
                        <Github className="w-[26px] h-[26px]" />
                    </a>
                    <ThemeSwitcher className="w-[26px] h-[26px]" />
                    <LogOut onClick={handleLogout} className="w-[26px] h-[26px] cursor-pointer" />
                </div>
            </div>
            {children}
        </>
    );
}

export default DesktopNavigation;
