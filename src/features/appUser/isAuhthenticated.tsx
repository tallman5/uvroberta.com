import React, { ComponentPropsWithoutRef } from "react";
import { useAppSelector } from '../../context'
import { selectUserName } from "./appUserSlice";

interface IIsAuthenticated extends ComponentPropsWithoutRef<'div'> { }

const IsAuthenticated = ({ children }: IIsAuthenticated) => {
    const userName = useAppSelector(selectUserName)
    if (userName)
        return <>{children}</>
    return null
}

export default IsAuthenticated