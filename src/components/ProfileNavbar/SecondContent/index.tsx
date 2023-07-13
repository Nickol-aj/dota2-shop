import React from "react";

import axios from "axios";

import { BASE_URL, SKINS_COLLECTION } from "../../../server/serverLink";
import { addTokenToHeader } from "../../../server/utils";

import { error__message } from "../../../messages";

import styles from "../SecondContent/index.module.scss";
import { Skeleton } from "../../ProductItem/Skeleton";

interface ISkin {
  id: number;
  icon: string;
  name: string;
  quantity: number;
}

const SecondContent = () => {
  const [collectionData, setCollectionData] = React.useState([]);
  const isAuthenticated = localStorage.getItem("accessToken");

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        addTokenToHeader(isAuthenticated);
        const collectionDataResponse = await axios.get(SKINS_COLLECTION);
        setCollectionData(collectionDataResponse.data.items);
      } catch (error) {
        error__message();
      }
    };
    fetchUserData();
  }, [isAuthenticated]);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className={styles.container}>
      {!collectionData ? (
        <div>Нет добавленных товаров</div>
      ) : (
        <>
          <div className={styles.items__container}>
            {collectionData.length === 0 ? (
              skeletons
            ) : (
              <>
                {collectionData.map((item: any) => (
                  <article
                    className={styles.collection__item}
                    key={item.skin.id}
                  >
                    <div className={styles.item__image}>
                      <img src={BASE_URL + item.skin.image} alt="Product" />
                    </div>

                    <div className={styles.item__description}>
                      <span className={styles.item__title}>
                        {item.skin.title}
                      </span>
                      <div className={styles.hero__description}>
                        <img src={BASE_URL + item.skin.icon} alt="Icon" />
                        <div>
                          <p className={styles.hero__name}>{item.skin.name}</p>
                          <p
                            style={{
                              color:
                                item.skin.grade === "Rare"
                                  ? "#4b69ff"
                                  : item.skin.grade === "Mythical"
                                  ? "#8847ff"
                                  : item.skin.grade === "Immortal"
                                  ? "#e4ae39"
                                  : "",
                            }}
                            className={styles.hero__grade}
                          >
                            {item.skin.grade}
                          </p>
                        </div>
                      </div>

                      <div className={styles.rb__panel}>
                        <div className={styles.item__price}>
                          <div className={styles.real__price}>
                            Цена <span> {item.skin.realPrice} руб</span>
                          </div>
                        </div>
                        <div className={styles.total__price}>
                          Итого
                          <span>{item.skin.realPrice * item.quantity} руб</span>
                        </div>
                      </div>
                    </div>
                    {item.quantity != 0 ? (
                      <div className={styles.sale__block}>
                        Колличество
                        <div>{item.quantity}</div>
                      </div>
                    ) : (
                      ""
                    )}
                  </article>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SecondContent;
