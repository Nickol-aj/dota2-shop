import "../scss/components/_server-error.scss";

export const ServerError = () => {
  return (
    <div className="content__error-container">
      <div className="content__error-img-block">
        <img src="" alt="" />
      </div>
      <div className="content__error-info">
        <h2>Произошла ошибка</h2>
        <p>
          К сожалению, не удалось получить товары. Попробуйте повторить попытку
          позже.
        </p>
      </div>
    </div>
  );
};
