import { Fragment, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@store";
import { Role } from "./types";

interface Props {
  children: ReactNode;
  allowedRoles: Role[];
  redirectTo: string;
}

export default function ProtectedRoute({
  children,
  allowedRoles,
  redirectTo,
}: Props) {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const hasAccess = allowedRoles.includes(user.role);

  useEffect(() => {
    if (!hasAccess) {
      navigate(redirectTo);
    }
  }, [hasAccess, navigate, redirectTo]);

  return hasAccess ? <Fragment>{children}</Fragment> : null;
}
