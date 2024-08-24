import { Menu, User, BarChart } from "lucide-react";
import { memo, useEffect, useMemo } from "react";
import NavItem from "./NavItem";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import ThemeSwitcher from "../ThemeSwitcher";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { ShoppingBag } from "lucide-react";
import { Github } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Separator } from "../ui";

const MobileNavigation = ({ children, navigationItems }) => {
    const { logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/auth");
    }

    return (
        <>
            <Drawer direction="bottom">
                <div className="flex justify-between items-center h-[50px] bg-secondary">
                    <DrawerTrigger>
                        <Menu className="w-[26px] h-[26px] ml-3 outline-none" />
                    </DrawerTrigger>
                    <div className="flex gap-4 mr-3">
                        <a href="https://github.com/GuiC0506/quotation-system" target="_blank">
                            <Github className="w-[26px] h-[26px]" />
                        </a>
                        <ThemeSwitcher className="w-[26px] h-[26px]" />
                        <LogOut onClick={handleLogout} className="w-[26px] h-[26px] cursor-pointer" />
                    </div>
                </div>
                <DrawerContent className="fixed top-10 bg-background shadow-lg transition-transform transform -translate-x-full">
                    <DrawerHeader>
                        <DrawerTitle className="text-primary">Navigation</DrawerTitle>
                        <div className=" gap-2 text-lg flex-col items-center">
                            {navigationItems.map(item => {
                                if ((item.adminOnly && isAdmin) || !item.adminOnly) {
                                    return (
                                        <>
                                            <NavItem title={item.title} link={item.link} icon={item.icon} CloseTag={DrawerClose} />
                                            <Separator />
                                        </>
                                    )
                                }
                            }
                            )}
                        </div>
                    </DrawerHeader>
                </DrawerContent>
            </Drawer >
            {children}
        </>
    )
}

export default memo(MobileNavigation);
