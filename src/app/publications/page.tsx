import React from "react";
import { PublicationCards } from "./PublicationCards";
import { PageHeader } from "../components/PageHeader";

const Publications = async () => {
  return (
    <div>
      <PageHeader title="Publications" />
      <PublicationCards />
    </div>
  );
};

export default Publications;
