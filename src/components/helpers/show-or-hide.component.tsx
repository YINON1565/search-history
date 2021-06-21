import { ReactNode } from "react"

export const ShowOrHide = (props : Props) => {
    return (
        <>
        {props.isShow? props.children : props.else || ''}
        </>
    )
}

type Props = {
    children : ReactNode,
    isShow : boolean,
    else? : any
}