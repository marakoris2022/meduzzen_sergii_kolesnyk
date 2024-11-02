import { UserProps } from "@/interface/interface";
import {
  Accordion,
  AccordionSummary,
  Stack,
  Typography,
  AccordionDetails,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import RandomAvatar from "../RandomAvatar/RandomAvatar";
import Image from "next/image";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import styles from "./userAccordion.module.css";
import { useTranslations } from "next-intl";
import { useAppDispatch } from "@/state/hooks";
import { fetchUserDataById } from "@/state/users/usersSlice";

type UserAccordionProps = {
  user: UserProps;
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

const UserAccordion = ({ user }: UserAccordionProps) => {
  const t = useTranslations("UserAccordion");
  const dispath = useAppDispatch();

  async function handleLoadData() {
    dispath(fetchUserDataById(user.user_id));
  }

  return (
    <Accordion onChange={handleLoadData}>
      <AccordionSummary
        expandIcon={<ArrowDownwardIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Stack className={styles.accordionHeadingWrapper} direction={"row"}>
          <Typography>
            {t("Email")}: {user.user_email}
          </Typography>
          <Typography>
            {t("Id")}: {user.user_id}
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction={"row"} gap={3}>
          <Box>
            {user.user_avatar ? (
              <Image
                src={user.user_avatar}
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
              {t("Name")}: {user.user_firstname}
            </Typography>
            <Typography>
              {t("LastName")}: {user.user_lastname}
            </Typography>
          </Stack>
          <AdditionalUserPropsCard
            user_status={user.user_status}
            user_city={user.user_city}
            user_phone={user.user_phone}
            user_links={user.user_links}
            is_superuser={user.is_superuser}
          />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default UserAccordion;
