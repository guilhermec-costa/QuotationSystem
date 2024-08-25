import { memo } from "react"
import MobileNavigation from "@/components/SideNavigation/MobileNavigation";
import DesktopNavigation from "@/components/SideNavigation/DesktopNavigation";
import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { BarChart } from "lucide-react";
import { ShoppingBag } from "lucide-react";
import { User } from "lucide-react";
import { ContactRound } from "lucide-react";
import { Store } from "lucide-react";
import { DollarSign } from "lucide-react";

const Layout = ({ children }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const navigationItems = useMemo(() => ([
        {
            title: "Dashboards",
            link: "/",
            icon: <BarChart />,
            adminOnly: false
        },
        {
            title: "Products",
            link: "/products",
            icon: <ShoppingBag />,
            adminOnly: false
        },
        {
            title: "Contacts",
            link: "/contacts",
            icon: <ContactRound />,
            adminOnly: false
        },
        {
            title: "User managing",
            link: "/me",
            icon: <User />,
            adminOnly: true
        },
        {
            title: "Suppliers",
            link: "/suppliers",
            icon: <Store />,
            adminOnly: false
        },
        {
            title: "Quotations",
            link: "/quotations",
            icon: <DollarSign />,
            adminOnly: false
        },
    ]), [])

    useEffect(() => {
        window.addEventListener("resize", () => {
            setIsMobile(window.innerWidth < 450)
        })

        return () => {
            window.removeEventListener("resize", window)
        }
    }, [])

    return (
        <div className="h-screen">
            {
                isMobile ?
                    (
                        <div className="z-20 relative overflow-auto">
                            <MobileNavigation children={children} navigationItems={navigationItems} />
                        </div>
                    ) :
                    (
                        <div className="h-screen overflow-auto">
                            <DesktopNavigation children={children} />
                        </div>
                    )
            }
            <footer className="fixed bottom-0 left-0 w-full h-[50px] bg-secondary text-secondary-foreground flex justify-between items-center px-4 shadow-md border-t border-muted z-40">
                <span className="text-sm md:text-base font-medium">© INFNET - Quotation System</span>
                <div className="flex gap-4">
                    <a href="https://github.com/GuiC0506/quotation-system" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-200 ease-in-out">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.372 0 0 5.372 0 12c0 5.303 3.438 9.8 8.207 11.387.6.11.793-.261.793-.579 0-.285-.011-1.043-.017-2.048-3.338.724-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.756-1.333-1.756-1.091-.746.083-.73.083-.73 1.205.084 1.838 1.238 1.838 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.761-1.606-2.666-.305-5.466-1.334-5.466-5.935 0-1.312.469-2.386 1.237-3.23-.124-.303-.536-1.527.117-3.184 0 0 1.008-.323 3.3 1.23a11.52 11.52 0 0 1 3.004-.403c1.019.004 2.047.138 3.003.403 2.292-1.553 3.299-1.23 3.299-1.23.655 1.657.243 2.881.12 3.184.77.844 1.236 1.918 1.236 3.23 0 4.611-2.803 5.626-5.475 5.92.43.37.814 1.102.814 2.222 0 1.606-.015 2.9-.015 3.293 0 .322.192.694.801.576C20.565 21.796 24 17.302 24 12c0-6.628-5.373-12-12-12z" />
                        </svg>
                    </a>
                </div>
            </footer>
        </div>
    );
}

export default memo(Layout);
