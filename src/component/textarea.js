import styles from "../css/component.module.scss"

const Textarea = ({placeholder,type,name,value,onChange}) => {
    return (
        <textarea 
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}>
        </textarea>
    )
};

export default Textarea ;

