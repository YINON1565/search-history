import { createUseStyles } from "react-jss";
import { IconPngUrl, IconPngUrlModel } from "../services/icon-png.service";

export const IconPng = ({ name }: { name: IconPngUrlModel }) => {
  const classes = useStyles();
  return <img className={classes['icon-png']} src={IconPngUrl(name)} alt={name} />;
};

const useStyles = createUseStyles({
  "icon-png": {
    padding: "0 24px",
  },
});
