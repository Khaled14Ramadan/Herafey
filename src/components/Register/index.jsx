import "./style-reg.scss";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useForm, Controller } from "react-hook-form";
import image from "../../assets/images/24361830.jpg";
import { useSelector, useDispatch } from "react-redux";
import messages from "./../../Locale/messages";
import { changeLang } from "../../Redux/Languageslice/languageslice";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();
  const language = useSelector((s) => s.lang.lang);
  const dispatch = useDispatch();
  const { reg } = messages[language];
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm();
  const roles = [
    { value: "provider", label: `${reg.provider}` },
    { value: "customer", label: `${reg.customer}` },
  ];
  const jobs = [
    { value: "electrician", label: `${reg.electrician}` },
    { value: "plumber", label: `${reg.plumber}` },
    { value: "carpenter", label: `${reg.carpenter}` },
    { value: "ironsmith", label: `${reg.ironsmith}` },
  ];
  const city = [
    { value: "cairo", label: `${reg.cairo}` },
    { value: "alexandria", label: `${reg.alex}` },
    { value: "giza", label: `${reg.giza}` },
    { value: "mansoura", label: `${reg.mansoura}` },
  ];

  const onSubmit = async (e) => {
    console.log(e);

    const displayName = e.displayName;
    const email = e.email;
    const password = e.password;
    const file = e.pic[0];
    const city = e.city.value;
    const job = e.job?.value ?? "user";
    const phone = e.phone;
    const role = selectedRole;

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
              city,
              phoneNumber: phone,
              job,
              role,
              following: [],
              followers: [],
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="content1 d-flex align-items-center justify-content-center ">
      <button
        className="btn btn-secondary lang-change "
        onClick={() => dispatch(changeLang())}
      >
        {language}
      </button>
      <div className="container w-75 ">
        <div className="col-md-12 contents">
          <div className="col-md-12 col-lg-12 img-wrapper ">
            <img src={image} alt="Image" className="img-fluid" />
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-10">
              <div className="mb-4">
                <h3>{reg.register}</h3>
                <p className="mb-3">{reg.createaccount}</p>
              </div>

              <div className="form-group">
                <label htmlFor="role">{reg.registeras}</label>

                <Select
                  options={roles}
                  placeholder="Select Your role"
                  onChange={(selectedOption) =>
                    setSelectedRole(selectedOption.value)
                  }
                />
              </div>
              {selectedRole === "provider" && (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div class="form-row d-flex justify-content-between ">
                    <div className="form-group col-md-6 ">
                      <label htmlFor="name">{reg.name}</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder={reg.entername}
                        {...register("displayName", {
                          required: true,
                          minLength: 3,
                          maxLength: 15,
                        })}
                      />
                      {errors.displayName?.type === "required" && (
                        <p className="text-danger">{reg.namerequired}</p>
                      )}
                      {errors.displayName?.type === "minLength" && (
                        <p className="text-danger">{reg.minname}</p>
                      )}
                      {errors.displayName?.type === "maxLength" && (
                        <p className="text-danger">{reg.maxname}</p>
                      )}
                    </div>
                    <div className="form-group col-md-6 ">
                      <label htmlFor="email">{reg.email}</label>
                      <input
                        type="email"
                        id="email"
                        placeholder={reg.enteremail}
                        className="form-control"
                        {...register("email", {
                          required: true,
                        })}
                      />
                      {errors.email?.type === "required" && (
                        <p className="text-danger">{reg.emailrequired}</p>
                      )}
                    </div>
                  </div>
                  <div class="form-row d-flex justify-content-between ">
                    <div className="form-group col-md-6 ">
                      <label htmlFor="password">{reg.password}</label>
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder={reg.enterpass}
                        {...register("password", {
                          required: true,
                          maxLength: 20,
                          minLength: 8,
                        })}
                      />
                      {errors.password?.type === "required" && (
                        <p className="text-danger">{reg.passrequired}</p>
                      )}
                      {errors.password?.type === "minLength" && (
                        <p className="text-danger">{reg.minpass}</p>
                      )}
                      {errors.password?.type === "maxLength" && (
                        <p className="text-danger">{reg.maxpass}</p>
                      )}
                    </div>
                    <div className="form-group col-md-6 ">
                      <label htmlFor="conf-password">{reg.confpass}</label>
                      <input
                        type="password"
                        className="form-control"
                        id="conf-password"
                        placeholder={reg.enterconfpass}
                        {...register("conf_password", {
                          required: true,
                          validate: (val) => {
                            if (watch("password") !== val) {
                              return `${reg.passdontmatch}`;
                            }
                          },
                        })}
                      />
                      {errors.password?.type === "required" && (
                        <p className="text-danger">{reg.passrequired}</p>
                      )}
                      {errors.conf_password?.type === "validate" && (
                        <p className="text-danger">{reg.passdontmatch}</p>
                      )}
                    </div>
                  </div>
                  <div class="form-row d-flex justify-content-between ">
                    <div className="form-group col-md-6 ">
                      <label htmlFor="city">{reg.city}</label>
                      <Controller
                        name="city"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            required
                            options={city}
                            placeholder={reg.choosecity}
                          />
                        )}
                      />
                      {errors.field?.type === "required" && (
                        <p className="text-danger">{reg.cityrequired}</p>
                      )}
                    </div>
                    <div className="form-group col-md-6 ">
                      <label htmlFor="job">{reg.job}</label>
                      <Controller
                        name="job"
                        control={control}
                        render={({ field }) => (
                          <CreatableSelect
                            {...field}
                            isClearable
                            options={jobs}
                            placeholder={reg.choosejob}
                          />
                        )}
                      />
                      {errors.field?.type === "required" && (
                        <p className="text-danger">{reg.jobrequired}</p>
                      )}
                    </div>
                  </div>
                  <div class="form-row d-flex justify-content-between ">
                    <div className="form-group col-md-6 ">
                      <label htmlFor="phone">{reg.phone}</label>
                      <input
                        type="tel"
                        id="phone"
                        className="form-control"
                        placeholder={reg.enterphone}
                        {...register("phone", {
                          required: true,
                          maxLength: 11,
                          minLength: 11,
                        })}
                      />
                      {errors.phone?.type === "required" && (
                        <p className="text-danger">{reg.phonerequired}</p>
                      )}
                      {errors.phone?.type === "minLength" && (
                        <p className="text-danger">{reg.minphone}</p>
                      )}
                      {errors.phone?.type === "maxLength" && (
                        <p className="text-danger">{reg.maxphone}</p>
                      )}
                    </div>
                    <div className="form-group col-md-6 ">
                      <label htmlFor="file">{reg.uploadimg}</label>
                      <div class="input-group ">
                        <input
                          type="file"
                          class="form-control"
                          id="file"
                          {...register("pic", {
                            required: true,
                          })}
                        />
                        <label class="input-group-text" for="file">
                          {reg.upload}
                        </label>
                      </div>
                      {errors.pic?.type === "required" && (
                        <p className="text-danger">{reg.imgrequired}</p>
                      )}
                    </div>
                  </div>
                  <button className="btn btn-primary mt-3" type="submit">
                    {reg.signup}
                  </button>
                  {err && <span>{reg.err}</span>}
                </form>
              )}
              {selectedRole === "customer" && (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div class="form-row d-flex justify-content-between ">
                    <div className="form-group col-md-6 ">
                      <label htmlFor="name">{reg.name}</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder={reg.entername}
                        {...register("displayName", {
                          required: true,
                          minLength: 3,
                          maxLength: 15,
                        })}
                      />
                      {errors.displayName?.type === "required" && (
                        <p className="text-danger">{reg.namerequired}</p>
                      )}
                      {errors.displayName?.type === "minLength" && (
                        <p className="text-danger">{reg.minname}</p>
                      )}
                      {errors.displayName?.type === "maxLength" && (
                        <p className="text-danger">{reg.maxname}</p>
                      )}
                    </div>
                    <div className="form-group col-md-6 ">
                      <label htmlFor="email">{reg.email}</label>
                      <input
                        type="email"
                        id="email"
                        placeholder={reg.enteremail}
                        className="form-control"
                        {...register("email", {
                          required: true,
                        })}
                      />
                      {errors.email?.type === "required" && (
                        <p className="text-danger">{reg.emailrequired}</p>
                      )}
                    </div>
                  </div>
                  <div class="form-row d-flex justify-content-between ">
                    <div className="form-group col-md-6 ">
                      <label htmlFor="password">{reg.password}</label>
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder={reg.enterpass}
                        {...register("password", {
                          required: true,
                          maxLength: 20,
                          minLength: 8,
                        })}
                      />
                      {errors.password?.type === "required" && (
                        <p className="text-danger">{reg.passrequired}</p>
                      )}
                      {errors.password?.type === "minLength" && (
                        <p className="text-danger">{reg.minpass}</p>
                      )}
                      {errors.password?.type === "maxLength" && (
                        <p className="text-danger">{reg.maxpass}</p>
                      )}
                    </div>
                    <div className="form-group col-md-6 ">
                      <label htmlFor="conf-password">{reg.confpass}</label>
                      <input
                        type="password"
                        className="form-control"
                        id="conf-password"
                        placeholder={reg.enterconfpass}
                        {...register("conf_password", {
                          required: true,
                          validate: (val) => {
                            if (watch("password") !== val) {
                              return `${reg.passdontmatch}`;
                            }
                          },
                        })}
                      />
                      {errors.password?.type === "required" && (
                        <p className="text-danger">{reg.passrequired}</p>
                      )}
                      {errors.conf_password?.type === "validate" && (
                        <p className="text-danger">{reg.passdontmatch}</p>
                      )}
                    </div>
                  </div>
                  <div class="form-row d-flex justify-content-between ">
                    <div className="form-group col-md-6 ">
                      <label htmlFor="city">{reg.city}</label>
                      <Controller
                        name="city"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            required
                            options={city}
                            placeholder={reg.choosecity}
                          />
                        )}
                      />
                      {errors.field?.type === "required" && (
                        <p className="text-danger">{reg.cityrequired}</p>
                      )}
                    </div>
                  </div>
                  <div class="form-row d-flex justify-content-between ">
                    <div className="form-group col-md-6 ">
                      <label htmlFor="phone">{reg.phone}</label>
                      <input
                        type="tel"
                        id="phone"
                        className="form-control"
                        placeholder={reg.enterphone}
                        {...register("phone", {
                          required: true,
                          maxLength: 11,
                          minLength: 11,
                        })}
                      />
                      {errors.phone?.type === "required" && (
                        <p className="text-danger">{reg.phonerequired}</p>
                      )}
                      {errors.phone?.type === "minLength" && (
                        <p className="text-danger">{reg.minphone}</p>
                      )}
                      {errors.phone?.type === "maxLength" && (
                        <p className="text-danger">{reg.maxphone}</p>
                      )}
                    </div>
                    <div className="form-group col-md-12 ">
                      <label htmlFor="file">{reg.uploadimg}</label>
                      <div class="input-group ">
                        <input
                          type="file"
                          class="form-control"
                          id="file"
                          {...register("pic", {
                            required: true,
                          })}
                        />
                        <label class="input-group-text" for="file">
                          {reg.upload}
                        </label>
                      </div>
                      {errors.pic?.type === "required" && (
                        <p className="text-danger">{reg.imgrequired}</p>
                      )}
                    </div>
                  </div>
                  <button className="btn btn-primary mt-3" type="submit">
                    {reg.signup}
                  </button>
                  {err && <span>{reg.err}</span>}
                </form>
              )}
              <p>
                {reg.haveaccount}
                <Link to="/login">{reg.login}</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
