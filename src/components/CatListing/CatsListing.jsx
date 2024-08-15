import { useEffect, useState, useCallback } from "react";
import styles from "./catsListing.Module.css";
import axios from "axios";
import ChaiCodeLogo from "../../assets/ChaiCodeLogo.png";

const CatsListing = () => {
  const [cats, setCats] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 4; 
  useEffect(() => {
    const fetchCats = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.freeapi.app/api/v1/public/cats?page=${page}&limit=${limit}`
        );
        setCats((prevCats) => [...prevCats, ...res.data.data.data]); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cats:", error);
        setLoading(false);
      }
    };

    fetchCats();
  }, [page]);

  const handleInfiniteScroll = useCallback(() => {
    const container = document.querySelector(`.${styles.cardList}`);
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    if (scrollLeft + clientWidth >= scrollWidth - 5 && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading]);

  useEffect(() => {
    const container = document.querySelector(`.${styles.cardList}`);
    container.addEventListener("scroll", handleInfiniteScroll);

    return () => {
      container.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, [handleInfiniteScroll]);

  return (
    <div className={styles.catContainer}>
      <a
        href="https://chaicode.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={ChaiCodeLogo} className={styles.logo} alt="ChaiCode" />
      </a>
      <h1 className={styles.heading}>Cats around us</h1>
      <div className={styles.cardList}>
        {cats.map((cat, index) => (
          <div key={index} className={styles.catCard}>
            <img src={cat.image} alt={cat.name} className={styles.catImage} />
            <div className={styles.catInfo}>
              <div className={styles.wrapper}>
                <h4 className={styles.name}>{cat.name}</h4>
                <p className={styles.description}>{cat.description}</p>
                <div className={styles.originInfo}>
                  <span className={styles.originLabel}>Origin</span>
                  <span>{cat.origin}</span>
                </div>
                <div className={styles.temperamentSection}>
                  <p className={styles.temperamentLabel}>Temperament</p>
                  {cat.temperament
                    .split(", ")
                    .slice(0, 3)
                    .map((temp, index) => (
                      <span key={index} className={styles.temperamentButton}>
                        {temp}
                      </span>
                    ))}
                </div>
                <div className={styles.lifeSpanInfo}>
                  <span className={styles.lifeSpanLabel}>Life Span</span>
                  <span>{cat.life_span}</span>
                </div>
              </div>
              <a
                href={cat.wikipedia_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.learnMore}
              >
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>
      {loading && <div className={styles.loading}>Loading...</div>}
    </div>
  );
};

export default CatsListing;
