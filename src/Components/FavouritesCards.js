import { Button, Row, message } from "antd";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./FavouritesCards.scss";
// import { withTranslation } from "react-i18next";
import FavouritesCardsContent from "./FavouritesCardsContent";

const Favourites = ({ CareGiver, Telehealth, t }) => {
  const [favlist, setFavlist] = useState([
    { summery: "harish is good boy" },
    { summery: "harish is good boy harish is good boy" },
    { summery: "harish is good boy harish is good boy harish is good boy" },
    {
      summery:
        "harish is good boy harish is good boy  harish is good boy harish is good boy",
    },
    { summery: "harish is good boy" },
    {
      summery:
        "harish is good boy harish is good boy harish is good boy harish is good boy",
    },
    { summery: "harish is good boy" },
    {
      summery:
        "harish is good boy harish is good boy harish is good boy harish is good boy",
    },
    { summery: "harish is good boy harish is good boy" },
    { summery: "harish is good boy harish is good boy harish is good boy" },
    {
      summery:
        "harish is good boy harish is good boy  harish is good boy harish is good boy",
    },
    { summery: "harish is good boy" },
    {
      summery:
        "harish is good boy harish is good boy harish is good boy harish is good boy",
    },
    { summery: "harish is good boy" },
    {
      summery:
        "harish is good boy harish is good boy harish is good boy harish is good boy",
    },
    { summery: "harish is good boy harish is good boy" },
    { summery: "harish is good boy harish is good boy harish is good boy" },
    {
      summery:
        "harish is good boy harish is good boy  harish is good boy harish is good boy",
    },
    { summery: "harish is good boy" },
    {
      summery:
        "harish is good boy harish is good boy harish is good boy harish is good boy",
    },
    { summery: "harish is good boy" },
    {
      summery:
        "harish is good boy harish is good boy harish is good boy harish is good boy",
    },
  ]);
  const history = useHistory();

  return (
    <div className="DoctorCards">
      {favlist?.length > 0 && (
        <Row>
          {favlist?.map((item, i) => (
            <FavouritesCardsContent item={item} i={i} />
          ))}
        </Row>
      )}
    </div>
  );
};

export default Favourites;
