import {
  Card,
  Button,
  Icon,
  Select,
  Divider,
  Avatar,
  Row,
  Col,
  message,
} from "antd";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CommonAxios, TelehealthAxios } from "../../../../../config";
import "./FavouritesCards.scss";
import { useStripe } from "@stripe/react-stripe-js";
import { withTranslation } from "react-i18next";
import { gaPageView, gaEvent, GA_EVENT_BUTTON_CLICK } from "../../../../../ga";
import { Typography } from "antd";
import FavouritesCardsContent from "./FavouritesCardsContent";

const { Paragraph } = Typography;

const { Option } = Select;

const Favourites = ({ CareGiver, Telehealth, t }) => {
  const [viewMore, setviewMore] = useState(8);
  const [favlist, setFavlist] = useState([]);
  const [addfav, Setaddfav] = useState(false);
  const history = useHistory();
  const [typoParagraph, setTypoParagraph] = useState({
    expand: false,
    counter: 0,
  });
  const [currentExpand, setCurrentExpand] = useState();
  const User_id = localStorage.getItem("userId");
  const checkuserid = JSON.stringify(localStorage.getItem("userId"));

  const ViewmoreList = () => {
    setviewMore(viewMore + 4);
  };

  const fetchdoctorinfo = (item) => {
    console.log("iten", item);
    // console.log("profileId", profileId);
    // if (CareGiver) {
    //   history.push(`/CG/${profileId}`);
    // } else if (Telehealth) {
    //   history.push(`/MD/${profileId}`);
    // } else {
    // }
    // gaEvent(GA_EVENT_BUTTON_CLICK, `Go to "/favourites"${profileId} page`);
  };
  useEffect(() => {
    gaPageView("/favourites");
  }, []);

  useEffect(() => {
    if (checkuserid) {
      Getfavourite();
    }
  }, [CareGiver, Telehealth, addfav]);

  const Getfavourite = async () => {
    let url;
    if (CareGiver) {
      url = "fav/v1.0/getcgfav";
    } else if (Telehealth) {
      url = "fav/v1.0/getdocfav";
    } else {
    }
    try {
      const response = await CommonAxios.get(`${url}/${User_id}`);
      setFavlist(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handlefavoriteDocotor = async (item) => {
    const {
      doctorName,
      profileId,
      summery,
      profileHeader,
      specialtiesName,
      address,
      location,
      _id,
      profilePhoto,
      doctorProfileImg,
    } = item ?? {};

    const data = {
      userId: User_id,
      doctorId: _id,
      doctorName: doctorName,
      profileId: profileId,
      summery: summery,
      profileHeader: profileHeader,
      specialtiesName: specialtiesName,
      doctorProfileImg: doctorProfileImg
        ? doctorProfileImg
        : "https://ub-dev-image-uploader.s3-ap-south-1.amazonaws.com/doctor.jpeg",
      address: address,
      location: location,
    };
    console.log("data...");
    if (JSON.parse(checkuserid)) {
      try {
        const res = await CommonAxios.post("fav/v1.0/docfav", data);
        console.log("res", res.data.data.isDeleted);
        if (res.status === 200) {
          if (!res.data.data.isDeleted) {
            message.success("Added to sucessfully");
          } else {
            message.success("removed to sucessfully");
          }

          Setaddfav((prevstate) => !prevstate);
        }
      } catch (error) {
        message.error("something went wrong");
      }
    } else {
      message.error("please login");
    }
  };

  const handlefavoriteCaregiver = async (item) => {
    const {
      cgName,
      profileId,
      summery,
      profileHeader,
      specialtiesName,
      address,
      location,
      _id,
      profilePhoto,
      cgProfileImg,
    } = item ?? {};

    const data = {
      userId: User_id,
      careGiverId: _id,
      cgName: cgName,
      profileId: profileId,
      summery: summery,
      profileHeader: profileHeader,
      specialtiesName: specialtiesName,
      cgProfileImg: cgProfileImg
        ? cgProfileImg
        : "https://ub-provider-image-uploader.s3-us-west-1.amazonaws.com/host/senior6.jpeg",
      address: address,
      location: location,
    };
    if (JSON.parse(checkuserid)) {
      try {
        const res = await CommonAxios.post("fav/v1.0/cgfav", data);
        console.log("res", res.data.data.isDeleted);
        if (res.status === 200) {
          if (!res.data.data.isDeleted) {
            message.success("Added to sucessfully");
          } else {
            message.success("removed to sucessfully");
          }

          Setaddfav((prevstate) => !prevstate);
        }
      } catch (error) {
        message.error("something went wrong");
      }
    } else {
      message.error("please login");
    }
  };
  const checkcolour = Telehealth ? "#0CBFC2" : "#b0779a";

  // const openScroll=()=> {
  // expand === "true" ? scrollbarVisible : scrollbarsNotVisible
  // }

  return (
    <div className="DoctorCards-container">
      <div className="DoctorCards">
        <div className="DoctorCards__innerConnect">
          {favlist?.length > 0 ? (
            <Row>
              {favlist?.map((item, i) => (
                <FavouritesCardsContent
                  item={item}
                  i={i}
                  favlist={favlist}
                  handlefavoriteDocotor={handlefavoriteDocotor}
                  handlefavoriteCaregiver={handlefavoriteCaregiver}
                  Telehealth={Telehealth}
                  checkcolour={checkcolour}
                  fetchdoctorinfo={fetchdoctorinfo}
                  CareGiver={CareGiver}
                />
              ))}
            </Row>
          ) : (
            <div className="dashboard_favourites_info">
              <h3>You have no Favourites</h3>
              <div className="dashboard_favourites_info-content">
                <h4>When you book a day centre or experience </h4>
                <h4>favourites from host will show up here </h4>
              </div>
              <div className="Explore-setup">
                <Button
                  className="Explore-button"
                  onClick={() => history.push("/Coming-soon")}
                >
                  Explore nearby
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(Favourites);
