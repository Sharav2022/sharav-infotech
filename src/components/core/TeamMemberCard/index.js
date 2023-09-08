import classes from "./team-member-card.module.css";

import LinkedinIcon from "@/assets/icons/linkedin.svg";
import FacebookIcon from "@/assets/icons/facebook.svg";
import TwitterIcon from "@/assets/icons/twitter.svg";
import InstagramIcon from "@/assets/icons/instagram.svg";
import Image from "next/image";
import { useState } from "react";

const TeamMemberCard = ({ mediaUrl, name, position, socialLinks = [] }) => {
  const socialLinkHandler = (url) => {
    window.open(url, "blank");
  };

  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={classes.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={classes.img}>
        <img src={mediaUrl} alt={name} title={name} />
        {hovered && (
          <>
            <div className={classes.gradient}></div>
            <div className={classes.social_links}>
              {socialLinks.map((sl) => (
                <div
                  className={classes.icon + ` icon-${sl.type}`}
                  onClick={() => socialLinkHandler(sl.url)}
                >
                  {fetchSocialIcon(sl.type)}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className={classes.txt_c}>
        <h3 className={classes.name}>{name}</h3>
        <p className={classes.position}>{position}</p>
      </div>
    </div>
  );
};

const fetchSocialIcon = (type) => {
  if (type === "linkedin") {
    return <LinkedinIcon />;
  } else if (type === "twitter") {
    return <TwitterIcon />;
  } else if (type === "instagram") {
    return <InstagramIcon />;
  } else if (type === "facebook") {
    return <FacebookIcon />;
  }
};

export default TeamMemberCard;
