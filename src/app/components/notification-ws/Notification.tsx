import { FormEvent, useEffect, useState } from "react";
import { Badge, Button, IconButton, TextField } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import styles from "./notyfication.module.css";
import UniversalModal from "../universal-modal/UniversalModal";
import SendIcon from "@mui/icons-material/Send";
import { useAppSelector } from "@/state/hooks";
import { useTranslations } from "use-intl";
import { ButtonColor } from "@/interface/interface";
import { socket } from "@/services/wsInstance";

type MessageItem = {
  time: number;
  message: string;
};

const Notification = () => {
  const t = useTranslations("Notification");
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [myMessage, setMyMessage] = useState<string>("");
  const [messageCounter, setMessageCounter] = useState<number>(0);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [notifyColor, setNotifyColor] = useState<ButtonColor>(
    ButtonColor.Primary
  );
  const { data: userData } = useAppSelector((state) => state.user);

  function addMessage(msg: string) {
    setMessages((state) => [
      {
        time: Date.now(),
        message: msg,
      },
      ...state,
    ]);

    setMessageCounter((state) => state + 1);
    setNotifyColor(ButtonColor.Success);
  }

  useEffect(() => {
    socket.connect();

    socket.on("randomMessage", (msg: string) => {
      addMessage(msg);
    });

    socket.on("customMessage", (msg: string) => {
      addMessage(msg);
    });

    socket.on("connect_error", () => {
      setNotifyColor(ButtonColor.Error);
    });

    socket.on("error", () => {
      setNotifyColor(ButtonColor.Error);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  function handleBadgeClick() {
    setIsModal(true);
    setMessageCounter(0);
    setNotifyColor(ButtonColor.Primary);
  }

  function handleClear() {
    setMessages([]);
    setMessageCounter(0);
    setNotifyColor(ButtonColor.Primary);
    setIsModal(false);
  }

  function handleSendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (myMessage.length > 0 && userData) {
      socket.emit("customMessage", ` ${userData.user_email} : ${myMessage}`);
      setMyMessage("");
      setMessageCounter(0);
    }
  }

  function handleClose() {
    setMessageCounter(0);
    setNotifyColor(ButtonColor.Primary);
    setIsModal(false);
  }

  return (
    <>
      <UniversalModal open={isModal} handleClose={handleClose}>
        <div className={styles.modalWrapper}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>{t("newMessages")}</h3>
            {messages.map((message, index) => (
              <p className={styles.modalMessage} key={index}>{`[${new Date(
                message.time
              ).toLocaleTimeString()}]: ${message.message}`}</p>
            ))}
          </div>
          <div>
            <form className={styles.formWrapper} onSubmit={handleSendMessage}>
              <TextField
                value={myMessage}
                onChange={(e) => setMyMessage(e.target.value)}
                fullWidth
              />
              <IconButton type="submit">
                <SendIcon color={ButtonColor.Primary} />
              </IconButton>
            </form>
            <div className={styles.clearBtnWrapper}>
              <Button variant="outlined" onClick={handleClear}>
                {t("clearBtn")}
              </Button>
            </div>
          </div>
        </div>
      </UniversalModal>
      <div onClick={handleBadgeClick}>
        <Badge
          className={styles.badge}
          badgeContent={messageCounter}
          color={ButtonColor.Primary}
        >
          <MailIcon color={notifyColor} />
        </Badge>
      </div>
    </>
  );
};

export default Notification;
