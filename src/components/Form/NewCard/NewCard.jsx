import close from "../../../assets/images/close.png"

export default function NewCard() {
  return (
      <div className="formadd__container">
        <button type="button" className="formadd__close">
          <img src={close} alt="close icon" />
        </button>
        <form className="formadd__group" novalidate>
          <h2 className="formadd__title">New place</h2>
          <input
            type="text"
            id="inputTitle"
            placeholder="Title"
            name="place"
            className="form__placeholder"
            minlength="2"
            maxlength="30"
            required
          />
          <span className="form__input-error inputTitle-error"></span>
          <input
            type="url"
            id="inputUrl"
            name="url"
            placeholder="Image URL"
            className="form__placeholder"
            required
          />
          <span className="form__input-error inputUrl-error">
            Please enter a URL.
          </span>
          <button type="submit" className="form__submit">
            Save
          </button>
        </form>
      </div>
  );
}
