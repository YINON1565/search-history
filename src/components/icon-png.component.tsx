import { createUseStyles } from "react-jss";
import { IconPngUrl, IconPngUrlModel } from "../hooks/icon-png.hook";

export const IconPng = ({ name }: { name: IconPngUrlModel }) => {
  const classes = useStyles();
  return <img className={classes['icon-png']} src={IconPngUrl(name)} alt={name} />;
};

const useStyles = createUseStyles({
  "icon-png": {
    padding: "0 24px",
  },
});
