import { Card, Icon, Avatar, Col } from "antd";
import React, { useState } from "react";

const FavouritesCardsContent = ({
  item,
  favlist,
  handlefavoriteDocotor,
  handlefavoriteCaregiver,
  Telehealth,
  checkcolour,
  fetchdoctorinfo,
  CareGiver,
}) => {
  const [para, setPara] = useState(false);
  return (
    <Col xs={12} sm={8} lg={5}>
      <Card className="DocterDetails">
        <Icon
          type="heart"
          theme={
            favlist.some((fav) => fav.profileId === item.profileId) && "filled"
          }
          onClick={() =>
            Telehealth
              ? handlefavoriteDocotor(item)
              : handlefavoriteCaregiver(item)
          }
          style={{
            color: favlist.some((fav) => fav.profileId === item.profileId)
              ? checkcolour
              : "",
          }}
        />
        <div
          className="DocterDetails-Content"
          onClick={() => fetchdoctorinfo(item)}
        >
          {item.doctorProfileImg ? (
            <Avatar
              className="WithProfileImg"
              size={126}
              src={item.doctorProfileImg}
            />
          ) : (
            <>
              {item.gender === "MALE" ? (
                <Avatar
                  className="WithProfileImg"
                  size={126}
                  src={require("../../../../../Assets/doc_male_placeholder.png")}
                />
              ) : (
                <Avatar
                  className="WithProfileImg"
                  size={126}
                  src={require("../../../../../Assets/doc_female_placeholder.png")}
                />
              )}
            </>
          )}
          <h2>{CareGiver ? item.cgName : item.doctorName}</h2>
          <h4>{item.specialtiesName}</h4>
          <div className="paragraphContainer">
            <div
              style={{
                color: favlist.some((fav) => fav.profileId === item.profileId)
                  ? checkcolour
                  : "",
              }}
              className={para ? "paragraph" : "paragraph hide"}
            >
              {item?.summery.length > 20 ? (
                para ? (
                  <div>
                    {" "}
                    <span
                      style={{
                        color: "#4a4a4a",
                      }}
                    >
                      {item?.summery}
                    </span>
                    {"  "}
                    <span
                      style={{
                        // color: "#4fb8b6",
                        color: favlist.some(
                          (fav) => fav.profileId === item.profileId
                        )
                          ? checkcolour
                          : "",
                        fontWeight: "800",
                      }}
                      onClick={() => {
                        setPara(false);
                      }}
                    >
                      close
                    </span>
                  </div>
                ) : (
                  <div>
                    <span
                      style={{
                        color: "#4a4a4a",
                      }}
                    >
                      {item?.summery.slice(0, 45)}
                    </span>
                    {"  "}
                    <span
                      style={{
                        // color: "#4fb8b6",
                        color: favlist.some(
                          (fav) => fav.profileId === item.profileId
                        )
                          ? checkcolour
                          : "",
                        fontWeight: "800",
                      }}
                      onClick={() => {
                        setPara(true);
                      }}
                    >
                      expand
                    </span>
                  </div>
                )
              ) : (
                <span
                  style={{
                    color: "#4a4a4a",
                  }}
                >
                  {item?.summery}
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default FavouritesCardsContent;
