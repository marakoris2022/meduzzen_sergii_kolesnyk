import { UserProps } from "@/interface/interface";
import { getUserById } from "@/services/axios-api-methods/axiosGet";
import {
  Accordion,
  AccordionSummary,
  Stack,
  Typography,
  AccordionDetails,
  Box,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import RandomAvatar from "../RandomAvatar/RandomAvatar";
import Image from "next/image";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import styles from "./userAccordion.module.css";
import { useTranslations } from "next-intl";

type UserAccordionProps = {
  user_id: number;
  user_email: string;
  user_firstname: string;
  user_lastname: string;
  user_avatar: string | null;
};

type AdditionalUserPropsCardProps = {
  user_status: string;
  user_city: string;
  user_phone: string;
  user_links: string[];
  is_superuser: boolean;
};

function AdditionalUserPropsCard({
  user_status,
  user_city,
  user_phone,
  user_links,
  is_superuser,
}: AdditionalUserPropsCardProps) {
  const t = useTranslations("UserAccordion");

  return (
    <Stack direction={"row"} gap={5}>
      <Stack>
        <Typography variant="body1" fontWeight="bold">
          <strong>{t("Status")}</strong>:{user_status || t("empty")}
        </Typography>
        <Typography variant="body1">
          <strong>{t("City")}:</strong> {user_city || t("empty")}
        </Typography>
        <Typography variant="body1">
          <strong>{t("Phone")}:</strong> {user_phone || t("empty")}
        </Typography>
      </Stack>
      <Typography variant="body1" sx={{ marginTop: 1 }}>
        <strong>{t("Links")}:</strong>
      </Typography>
      <List dense>
        {user_links ? (
          user_links.map((link, index) => (
            <ListItem key={index}>
              <ListItemText primary={link} />
            </ListItem>
          ))
        ) : (
          <Typography variant="body1">
            <strong>{t("empty")}</strong>
          </Typography>
        )}
      </List>
      {is_superuser && (
        <Box sx={{ marginTop: 2 }}>
          <Chip label="Superuser" color="secondary" variant="outlined" />
        </Box>
      )}
    </Stack>
  );
}

const UserAccordion = (userData: UserAccordionProps) => {
  const [addUserData, setAddUserData] = useState<null | UserProps>(null);
  const t = useTranslations("UserAccordion");

  async function handleLoadData(id: number) {
    getUserById(id).then((data) => {
      setAddUserData(data);
    });
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ArrowDownwardIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Stack className={styles.accordionHeadingWrapper} direction={"row"}>
          <Typography>
            {t("Email")}: {userData.user_email}
          </Typography>
          <Typography>
            {t("Id")}: {userData.user_id}
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction={"row"} gap={3}>
          <Box>
            {userData.user_avatar ? (
              <Image
                src={userData.user_avatar}
                alt={"Avatar"}
                height={120}
                width={100}
              />
            ) : (
              <RandomAvatar />
            )}
          </Box>
          <Stack>
            <Typography>
              {t("Name")}: {userData.user_firstname}
            </Typography>
            <Typography>
              {t("LastName")}: {userData.user_lastname}
            </Typography>
          </Stack>
          {addUserData ? (
            <AdditionalUserPropsCard
              user_status={addUserData.user_status}
              user_city={addUserData.user_city}
              user_phone={addUserData.user_phone}
              user_links={addUserData.user_links}
              is_superuser={addUserData.is_superuser}
            />
          ) : (
            <Button
              fullWidth
              onClick={() => handleLoadData(userData.user_id)}
              variant="outlined"
            >
              {t("Load_Data")}
            </Button>
          )}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default UserAccordion;
