import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { CustomContext } from "../../utils/Context";

const Form = () => {
  const [status, setStatus] = useState(false);
  const [email, setEmail] = useState("");
  const [eye, setEye] = useState(true);
  const { user, setUser } = useContext(CustomContext);
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    let newUser = { email, password: e.target[0].value };
    axios
      .post("http://localhost:8080/register", newUser)
      .then(({ data }) => {
        console.log(data);
        setUser({
          token: data.accessToken,
          ...data.user,
        });
        localStorage.setItem(
          "user",
          JSON.stringify({
            token: data.accessToken,
            ...data.user,
          })
        );
        navigate("/");
      })
      .then()
      .catch((error) => console.log(error));
    console.log();
  };
  return (
    <>
      <form className="form" onSubmit={registerUser}>
        {status && (
          <p className="form-email" onClick={() => setStatus((prev) => !prev)}>
            {email} <FaPencilAlt />
          </p>
        )}
        <h2 className="form-title">
          {status
            ? "Придумайте пароль для входа на любом устройстве"
            : "Создай аккаунт и получи 30 дней подписки бесплатно"}
        </h2>

        <div className="form-act">
          {status ? (
            <>
              <div className="form-password">
                <input
                  type={eye ? "password" : "text"}
                  className="form-field"
                  placeholder="Придумай пароль"
                />
                <span
                  onClick={() => setEye((prev) => !prev)}
                  className="form-eye">
                  {eye ? <AiFillEye /> : <AiFillEyeInvisible />}
                </span>
              </div>
              <button className="form-btn" type="submit">
                Создать аккаунт
              </button>
            </>
          ) : (
            <>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-field"
                placeholder="Email"
                required
              />
              <div
                className="form-btn btn"
                onClick={() => setStatus((prev) => !prev)}>
                ПРОДОЛЖИТЬ
              </div>
            </>
          )}
        </div>
        <Link to="/login">У меня есть аккаунт</Link>

        {/* <Link to="/social">Использовать соцсеть </Link> */}
      </form>
    </>
  );
};

export default Form;
