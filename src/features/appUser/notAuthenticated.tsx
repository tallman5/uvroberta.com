import React, { ComponentPropsWithoutRef } from "react";
import { useAppSelector } from '../../context'
import { selectUserName } from "./appUserSlice";

interface INotAuthenticated extends ComponentPropsWithoutRef<'div'> { }

const NotAuthenticated = ({ children }: INotAuthenticated) => {
    const userName = useAppSelector(selectUserName)
    if (!userName)
        return <>{children}</>
    return null
}

export default NotAuthenticated