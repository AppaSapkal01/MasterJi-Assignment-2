import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./randomUser.Module.css";
import { IoMdArrowBack } from "react-icons/io";
import { IoMdRefresh } from "react-icons/io";
import ChaiCodeLogo from "../../assets/ChaiCodeLogo.png";
import LocationIcon from "../../assets/LocationIcon.png";
import PhoneIcon from "../../assets/PhoneIcon.png";
import { FlagIcon } from "react-flag-kit";

const RandomUser = () => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const fetchUserData = async () => {
    setLoading(true); 
    try {
      const res = await axios.get(
        "https://api.freeapi.app/api/v1/public/randomusers/user/random"
      );
      const userData = res.data.data;
      console.log(res.data.data);
      setUser({
        title: userData.name.title,
        profilePic: userData.picture.medium,
        name: `${userData.name.first} ${userData.name.last}`,
        username: userData.login.username,
        coordinates: {
          latitude: userData.location.coordinates.latitude,
          longitude: userData.location.coordinates.longitude,
        },
        phoneNum: userData.phone,
        city: userData.location.city,
        nationality: userData.nat,
        dateOfBirth: new Date(userData.dob.date).toLocaleDateString(),
        timeZone: userData.location.timezone.offset,
        registered: new Date(userData.registered.date).toLocaleDateString(),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading...</p>; 
  }

  return (
    <>
      <main className={styles.container}>
        <div className={styles.profileCard}>
          <div className={styles.headerSection}>
            <IoMdArrowBack className={styles.headerIcons} />
            <p className={styles.headerLabel}>Profile Overview</p>

            <IoMdRefresh
              onClick={fetchUserData}
              className={styles.headerIcons}
            />
          </div>
          <div className={styles.userProfile}>
            <div className={styles.title}>{user.title}</div>
            <div>
              <img
                src={user.profilePic}
                className={styles.profileImg}
                alt="profile pic"
              />
            </div>

            <h2 className={styles.name}>{user.name}</h2>

            <div className={styles.username}>{user.username}</div>
          </div>
          <hr className={styles.hrLine} />
          <div className={styles.locationSection}>
            <div>
              <a
                href={`https://www.google.com/maps?q=${user.coordinates.latitude},${user.coordinates.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.coordinates}
              >
                <img src={LocationIcon} className={styles.contactIcons} />{" "}
                <p>Location</p>
              </a>
            </div>

            <div className="callMe">
              <a href={`tel:${user.phoneNum}`} className={styles.callMe}>
                <img src={PhoneIcon} className={styles.contactIcons} />
                Call me
              </a>
            </div>
          </div>
          <hr className={styles.hrLine} />

          <div className={styles.userDetails}>
            <div className={styles.items}>
              <p className={styles.label}>City</p>
              <h3>{user.city}</h3>
            </div>
            <div className={styles.items}>
              <p className={styles.label}>Nationality</p>
              <h3
                style={{
                  alignItem: "center",
                }}
              >
                <FlagIcon code={user.nationality} size={18} />
                <span style={{ marginLeft: "10px" }}>{user.nationality}</span>
              </h3>
            </div>
            <div className={styles.items}>
              <p className={styles.label}>Date of birth</p>
              <h3>{user.dateOfBirth}</h3>
            </div>
            <div className={styles.items}>
              <p className={styles.label}>Phone No</p>
              <h3>{user.phoneNum}</h3>
            </div>
            <div className={styles.items}>
              <p className={styles.label}>Time Zone</p>
              <h3>{user.timeZone}</h3>
            </div>
            <div className={styles.items}>
              <p className={styles.label}>Registered Since</p>
              <h3>{user.registered}</h3>
            </div>
          </div>
          <a
            href="https://chaicode.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={ChaiCodeLogo} className={styles.logo} alt="ChaiCode" />
          </a>
          <p className={styles.copyrights}>© chai aur code</p>
        </div>
      </main>
    </>
  );
};

export default RandomUser;
