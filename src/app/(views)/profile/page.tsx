import OpenModalTest from "@/app/components/OpenModalTest";
import { Box, Container, Typography } from "@mui/material";

const ProfilePage = () => {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "60px",
        }}
      >
        <Typography color="primary" variant="h1">
          Profile
        </Typography>
        <Typography color="secondary" variant="h3">
          Some data what we will add in future
        </Typography>
        <OpenModalTest
          title={"Profile"}
          description={"and this from Profile"}
        />
      </Box>
    </Container>
  );
};

export default ProfilePage;
