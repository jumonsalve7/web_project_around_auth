import close from "../../../assets/images/close.png"

export default function EditAvatar() {
  return (
    <div className="photo__container">
      <button type="button" className="photo__close">
        <img src={close} alt="close icon" />
      </button>
      <form className="photo__group" novalidate>
        <h2 className="photo__title">New photo</h2>
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
