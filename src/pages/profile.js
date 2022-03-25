import React from "react";
import Layout from "../components/shared/Layout";
import { useProfilePageStyles } from "../styles";

function ProfilePage() {
  useProfilePageStyles();

  return (
    <Layout>
      Profile Page
    </Layout>
  )
}

export default ProfilePage;
