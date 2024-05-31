import { Menu, User, BarChart } from "lucide-react";
import { memo } from "react";
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

const MobileNavigation = ({ children, navigationItems }) => {
    const { logout } = useAuth();

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
                        <LogOut onClick={logout} className="w-[26px] h-[26px] cursor-pointer" />
                    </div>
                </div>
                <DrawerContent className="fixed top-10 bg-primary-foreground shadow-lg transition-transform transform -translate-x-full">
                    <DrawerHeader>
                        <DrawerTitle className="text-primary">Navigation</DrawerTitle>
                        <div className="w-1/2 mx-auto my-4 flex flex-col items-center gap-3">
                            {navigationItems.map(item =>
                                <NavItem title={item.title} link={item.link} icon={item.icon} CloseTag={DrawerClose} />)
                            }
                        </div>
                    </DrawerHeader>
                </DrawerContent>
            </Drawer >
            {children}
        </>
    )
}

export default memo(MobileNavigation);
