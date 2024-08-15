import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./randomJokes.Module.css";
import { IoMdArrowBack } from "react-icons/io";
import UserPic from "../../assets/dummyUser.png";
import CommentIcon from '../../assets/CommentIcon.png'
import RepostIcon from '../../assets/RepostIcon.png';
import HearLikeIcon from '../../assets/HeartLikeIcon.png';
import BookmarkIcon from '../../assets/BookmarkIcon.png';
import UploadIcon from '../../assets/UploadIcon.png'
import VerifiedIcon from '../../assets/VerifiedTickIcon.png';
import ChaiCodeLogo from '../../assets/ChaiCodeLogo.png'
const RandomJokes = () => {
  const [jokes, setJokes] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [bookmarks, setBookmarks] = useState(0);
  const [reposts, setReposts] = useState(0);
  const [views, setViews] = useState(0);

  useEffect(() => {
    const fetchJoke = async () => {
      try {
        const res = await axios.get(
          "https://api.freeapi.app/api/v1/public/randomjokes/joke/random"
        );
        setJokes(res.data.data.content);
      } catch (error) {
        console.log(error);
      }
    };

    const generateRandomValues = () => {
      const randomTime = new Date(
        Date.now() - Math.floor(Math.random() * 100000000)
      ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const randomDate = new Date(
        Date.now() - Math.floor(Math.random() * (365 * 24 * 60 * 60 * 1000))
      ).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });


      setTime(randomTime);
      setDate(randomDate);
      setLikes(Math.floor(Math.random() * 10000));
      setComments(Math.floor(Math.random() * 10000));
      setBookmarks(Math.floor(Math.random() * 10000));
      setReposts(Math.floor(Math.random() * 10000));
      setViews((Math.random() * 100).toFixed(1) + "M");
    };

    fetchJoke();
    generateRandomValues();

  }, []);

  


  return (
    <>
      <main className={styles.container}>
        <div className={styles.card}>
          <div className={styles.topSection}>
            <IoMdArrowBack />
            <p>Post</p>
          </div>

          <div className={styles.userDetails}>
            <div className={styles.details}>
              <img
                src={UserPic}
                className={styles.profilePic}
                alt="user profile"
              />
              <div className={styles.nameSection}>
                <p className={styles.name}>Elon Musk <img src={VerifiedIcon} alt="verified tick" /></p>
                <p className={styles.username}>@username</p>
              </div>
            </div>
            <div className={styles.more}>...</div>
          </div>

          <div className={styles.jokeContent}>{jokes}</div>

          <div className={styles.postDetails}>
            <span>{time} · {date} · <span className={styles.views}>{views}</span> Views </span>
            
          </div>
          <hr className={styles.hrLine} />
          <div className={styles.activitySection}>
            <span className={styles.activity} ><img src={CommentIcon} alt="comment" />{comments}</span>
            <span className={styles.activity} ><img src={RepostIcon} alt="repost" />{reposts}</span>
            <span className={styles.activity} ><img src={HearLikeIcon} alt="like" />{likes}</span>
            <span className={styles.activity} ><img src={BookmarkIcon} alt="bookmark" />{bookmarks}</span>
            <span className={styles.activity} ><img src={UploadIcon} alt="upload" /></span>
          </div>
          <hr className={styles.hrLine} />

          <p className={styles.copyrights}>© chai aur code</p>

        </div>
        <a
            href="https://chaicode.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={ChaiCodeLogo} className={styles.logo} alt="ChaiCode" />
          </a>
      </main>
    </>
  );
};

export default RandomJokes;
