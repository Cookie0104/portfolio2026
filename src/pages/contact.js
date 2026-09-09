import { useState, useEffect } from "react";
import Input from "../component/input";
import Button from "../component/button";
import Textarea from "../component/textarea";
import emailjs from "@emailjs/browser";
import styles from "../css/contact.module.scss";
import { useLanguage } from "../component/function/languageContext";
import Lottie from "lottie-react";
import Hello from "../img/lottie/helloLottie.json";
import Loading from "../img/lottie/MRaimfosbf.json";
import Sucess from "../img/lottie/sucess.json";
import { createPortal } from "react-dom";

//service_3m0joup
//template_168jzry
//YDFJ1Y6gNcTEGKO2u

const SERVICE_ID = "service_3m0joup";
const TEMPLATE_ID = "template_168jzry";
const PUBLIC_KEY = "YDFJ1Y6gNcTEGKO2u";

const Contact = ({ id }) => {
  const { language } = useLanguage();
  const [isSent, setIsSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [hasFillIn, setHasFillIn] = useState(false);

  useEffect(() => {
    form.name !== "" && form.email !== "" && form.message !== ""
      ? setHasFillIn(true)
      : setHasFillIn(false);
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "MinAn",
          from_email: form.email,
          to_email: "emily.w9614@gmail.com",
          message: form.message,
        },
        PUBLIC_KEY
      )
      .then(() => {
        setLoading(false);
        setIsSent(true); // 設為已送出
        setForm({
          name: "",
          email: "",
          message: "",
        });
        setTimeout(() => setIsSent(false), 3000);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div id={id} className={styles.contactOuter}>
      <div className={styles.contantInner}>
        <div className={styles.title}>
          {language === "English" ? "Contact" : "留個言吧"}
        </div>
        <div className={styles.flexBox}>
          <form className={styles.formOuter} onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              value={form.name}
              placeholder={
                language === "English" ? "What's Your Name" : "您的名字"
              }
              onChange={handleChange}
            />
            <Input
              type="email"
              name="email"
              value={form.email}
              placeholder={
                language === "English"
                  ? "Email (eg.abc@gmail.com)"
                  : "Email (abc@gmail.com)"
              }
              onChange={handleChange}
            />
            <Textarea
              name="message"
              value={form.message}
              placeholder={
                language === "English" ? "Leave a message >.O" : "想說什麼嗎？"
              }
              onChange={handleChange}
            ></Textarea>
            <Button
              size="medium"
              id="submitBtn"
              type="submit"
              name={language === "English" ? "Submit" : "送出"}
              disabled={!hasFillIn}
            ></Button>
          </form>
          <div className={styles.pictureOuter}>
            <Lottie animationData={Hello} loop={true} />
          </div>
        </div>
      </div>

      {loading && (
        createPortal(
        <div className={styles.loadingOuter}>
          <Lottie animationData={Loading} loop={true} />
          <p className={styles.loadingWord}>
            {language === "English" ? "Sending..." : "傳送中..."}
          </p>
        </div>,
        document.body
      ))}
      {isSent && (
        <div className={styles.successOuter}>
          <Lottie animationData={Sucess} loop={false} />
          <p className={styles.loadingWord}>
            {language === "English" ? "Message Sent!" : "已成功送出！"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Contact;
