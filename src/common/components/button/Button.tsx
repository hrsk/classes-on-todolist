import React from 'react';
import classes from './Button.module.css'

type ButtonOwnProps = React.ButtonHTMLAttributes<HTMLButtonElement>
// type ButtonOwnProps = React.ComponentProps<'button'>

type ButtonProps = {
    children: React.ReactNode,
    onClick?: () => void,
    className?: string | undefined,
}

export const Button = ({
                           children,
                           className,
                           ...restProps
                       }: ButtonProps & ButtonOwnProps): React.ReactElement => {
    return <button {...restProps} className={className ? [className, classes.button].join(' ') : classes.button}>
        {children}
    </button>
}
