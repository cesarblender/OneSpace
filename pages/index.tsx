import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import HomeLayout from "../layouts/HomeLayout";
import useCountDown from "../src/hooks/useCountdown";
import Countdown from "../components/Countdown";
import LandingContainer from "../components/LandingContainer";
import { useRouter } from "next/router";

export default function Home() {
  const end = new Date("12-2-2022 20:00");

  const router = useRouter();

  const { expired } = useCountDown({ end });

  return (
    <HomeLayout>
      <LandingContainer>
        <Typography variant="h2" component="h1">
          OneSpace
        </Typography>
        <Typography variant="h4" component="h3" sx={{ textAlign: "center" }}>
          Conoce e interactúa con peronas en One Space
        </Typography>
        {!expired && <Countdown end={end} />}
        {expired && (
          <Button
            sx={{ marginTop: 2, fontWeight: "bold" }}
            variant="contained"
            size="large"
            href="/auth/register"
            component={Link}
            onDoubleClick={() => router.replace('/auth/pre-register')}
          >
            COMENZAR AHORA
          </Button>
        )}
      </LandingContainer>
    </HomeLayout>
  );
}
