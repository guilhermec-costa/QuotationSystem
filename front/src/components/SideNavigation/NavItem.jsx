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
        <div className="flex justify-center gap-x-3 text-card-foreground">
            {icon}
            <Link to={link} onClick={cb && cb}>
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
