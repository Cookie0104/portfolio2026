import styles from "../css/component.module.scss";

const Button = ({
  type = "button",
  onClick,
  name,
  id,
  disabled,
  icon,
  icon2,
  color = "primary",
  size = "medium",
  iconPosition = "right", // "left" or "right"
}) => {
  const hasIcon = !!icon;
  const positionClass = hasIcon ? styles[`icon-${iconPosition}`] : "";

  return (
    <button
      type={type}
      onClick={onClick}
      id={id}
      disabled={disabled}
      className={`${styles.button} ${color ? styles[color] : ""} ${
        size ? styles[size] : ""
      }  ${positionClass}`}
    >
      {iconPosition === "left" && hasIcon && <img src={icon} alt="" />}
      {iconPosition === "both" && hasIcon && <img src={icon} alt="" />}
      {name}
      {iconPosition === "right" && hasIcon && <img src={icon} alt="" />}
      {iconPosition === "both" && hasIcon && <img src={icon2} alt="" />}
    </button>
  );
};

export default Button;
