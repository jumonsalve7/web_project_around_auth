import close from "../../../assets/images/close.png"

export default function EditProfile() {
  return (
      <div className="form__container">
        <button type="button" className="form__close">
          <img src={close} alt="close icon" />
        </button>
        <form className="form__group" novalidate>
          <h2 className="form__title">Edit profile</h2>
          <input
            type="text"
            id="name"
            placeholder="Name"
            name="profile"
            className="form__placeholder"
            minlength="2"
            maxlength="40"
            required
          />
          <span className="form__input-error name-error"></span>
          <input
            type="text"
            id="profession"
            placeholder="About me"
            name="profession"
            className="form__placeholder"
            minlength="10"
            maxlength="200"
            required
          />
          <span className="form__input-error profession-error"></span>
          <button type="submit" className="form__submit">
            Save
          </button>
        </form>
      </div>
  );
}
