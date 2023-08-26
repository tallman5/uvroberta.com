import React, { ComponentPropsWithoutRef } from 'react'

export interface IExpander extends ComponentPropsWithoutRef<'div'> {
    isExpanded: boolean,
}

const Expander = ({ children, isExpanded, ...rest }: IExpander) => {
    return (
        isExpanded && <div {...rest}>{children}</div>
    )
}

export default Expander
