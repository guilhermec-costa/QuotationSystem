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

const Layout = ({ children }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const navigationItems = useMemo(() => ([
        {
            title: "Dashboards",
            link: "/",
            icon: <BarChart />
        },
        {
            title: "Products",
            link: "/products",
            icon: <ShoppingBag />
        },
        {
            title: "Contacts",
            link: "/contacts",
            icon: <ContactRound />
        },
        {
            title: "Profile",
            link: "/me",
            icon: <User />
        },
        {
            title: "Suppliers",
            link: "/suppliers",
            icon: <Store />
        },
    ]), [])

    useEffect(() => {
        window.addEventListener("resize", () => {
            setIsMobile(window.innerWidth < 768)
        })

        return () => {
            window.removeEventListener("resize", window)
        }
    }, [])

    return (
        <div className="relative h-screen">
            {
                isMobile ?
                    (
                        <div className="z-20 relative overflow-y-scroll">
                            <MobileNavigation children={children} navigationItems={navigationItems} />
                        </div>
                    ) :
                    (
                        <div className="overflow-hidden h-screen">
                            <DesktopNavigation children={children} />
                        </div>
                    )
            }
        </div>
    );
}

export default memo(Layout);
