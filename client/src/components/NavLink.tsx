import { MouseEvent } from "react";
import { Link, useResolvedPath, useMatch } from "react-router-dom";
import type { LinkProps } from "react-router-dom";
import { MenuItem, SxProps } from "@material";

const $navLink = (isActive: boolean): SxProps => ({
  justifyContent: "center",
  fontSize: "16px",
  fontWeight: "bold",
  color: isActive ? "text.primary" : "text.secondary",
});

interface NavLinkProps extends LinkProps {
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  children: string;
}

export default function NavLink({ children, to, onClick }: NavLinkProps) {
  let resolved = useResolvedPath(to);
  let isActive = Boolean(useMatch({ path: resolved.pathname, end: true }));

  return (
    <MenuItem
      key={children}
      onClick={onClick}
      component={Link}
      to={to}
      sx={$navLink(isActive)}
    >
      {children}
    </MenuItem>
  );
}
