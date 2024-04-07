import React from "react";
import { PublicationCards } from "./PublicationCards";

const Publications = async () => {
  return (
    <div className="p-24">
      <h2 className="text-2xl mb-16">Publications</h2>
      <PublicationCards />
    </div>
  );
};

export default Publications;
