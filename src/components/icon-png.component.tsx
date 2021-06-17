import { IconPngUrl, IconPngUrlModel } from "../services/icon-png.service"

export const IconPng = ({name}: {name: IconPngUrlModel}) => {
    return (
        <img className="png-icon" src={IconPngUrl(name)} alt={name} />
    )
}

