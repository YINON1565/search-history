import historyIcon from "../assets/icons/history.png";
import trashIcon from "../assets/icons/trash.png";
import cencelIcon from "../assets/icons/cencel.png";
import magDarkIcon from "../assets/icons/mag-dark.png";
import magIcon from "../assets/icons/mag.png";

export enum IconPngUrlModel {
  Cencel = "cencel",
  History = "history",
  MagDark = "mag-dark",
  Trash = "trash",
  Mag = "mag",
}

export const IconPngUrl = (name: IconPngUrlModel): string => {
  let url: string;
  switch (name) {
    case IconPngUrlModel.Cencel:
      url = cencelIcon;
      break;
    case IconPngUrlModel.History:
      url = historyIcon;
      break;
    case IconPngUrlModel.Mag:
      url = magIcon;
      break;
    case IconPngUrlModel.MagDark:
      url = magDarkIcon;
      break;
    case IconPngUrlModel.Trash:
      url = trashIcon;
      break;
  }
  return url;
};
