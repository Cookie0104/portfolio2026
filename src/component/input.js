import styles from "../css/component.module.scss";

const Input = ({placeholder,type,name,value,onChange}) => {
    return (
        <input 
            className={styles.input}
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}>
        </input>
    )
};


export default Input ;

