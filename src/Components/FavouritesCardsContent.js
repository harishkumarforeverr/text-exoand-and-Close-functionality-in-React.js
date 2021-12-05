import { Card, Icon, Avatar, Col } from "antd";
import React, { useState } from "react";

const FavouritesCardsContent = ({ item }) => {
  console.log(item.summery);
  const [para, setPara] = useState(false);
  return (
    <Col>
      <Card className="DocterDetails">
        <div className="paragraph">
          <div>
            {parseInt(item.summery.trim().length) > 30 ? (
              <div>
                {item?.summery ? (
                  para ? (
                    <div>
                      {" "}
                      {item?.summery}
                      {"  "}
                      <span
                        style={{
                          color: "#4fb8b6",
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
                      {item?.summery.slice(0, 5)}
                      {"  "}
                      <span
                        style={{
                          color: "#4fb8b6",
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
                  item?.summery
                )}
              </div>
            ) : (
              item.summery
            )}
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default FavouritesCardsContent;
