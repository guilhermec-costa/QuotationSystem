import { memo } from "react";
import { Link } from "react-router-dom";

const NavItem = ({
    title,
    link,
    icon,
    CloseTag,
    cb
}) => {
    return (
        <div className="flex justify-start gap-x-2 text-foreground hover:bg-secondary p-3 rounded-md cursor-pointer w-full">
            {icon}
            <Link to={link} onClick={cb && cb} className="w-full">
                {CloseTag ? (
                    <CloseTag asChild>
                        <button>{title}</button>
                    </CloseTag>
                ) : title
                }
            </Link>
        </div>
    );
}

export default memo(NavItem);
