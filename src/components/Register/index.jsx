import "../../style.scss";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useForm, Controller } from "react-hook-form";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm();
  const roles = [
    { value: "provider", label: "Provider" },
    { value: "customer", label: "Customer" },
  ];
  const jobs = [
    { value: "electrician", label: "electrician" },
    { value: "plumber", label: "plumber" },
    { value: "carpenter", label: "carpenter" },
    { value: "ironsmith", label: "ironsmith" },
  ];

  const onSubmit = async (e) => {
    console.log(e);

    const displayName = e.displayName;
    const email = e.email;
    const password = e.password;
    const file = e.pic[0];
    const city = e.city;
    const job = e.job?.value ?? "user";
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
              job,
              role,
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
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">7erafy Chat</span>
        <span className="title">Register</span>
        <Select
          options={roles}
          placeholder="Select Your role"
          onChange={(selectedOption) => setSelectedRole(selectedOption.value)}
        />
        {selectedRole === "provider" && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Enter Your Name"
              {...register("displayName", {
                required: true,
                minLength: 3,
                maxLength: 15,
              })}
            />
            {errors.displayName?.type === "required" && (
              <p className="text-danger">Your Name is required</p>
            )}
            {errors.displayName?.type === "minLength" && (
              <p className="text-danger">Min Length of Name is 3</p>
            )}
            {errors.displayName?.type === "maxLength" && (
              <p className="text-danger">Max Length of Name is 15</p>
            )}
            <input
              type="email"
              placeholder="Enter your Email"
              {...register("email", {
                required: true,
              })}
            />
            {errors.email?.type === "required" && (
              <p className="text-danger">Email is required</p>
            )}
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: true,
                maxLength: 10,
                minLength: 3,
              })}
            />
            {errors.password?.type === "required" && (
              <p className="text-danger">Password is Required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-danger">MinLength Of Password is 3 </p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-danger">MaxLength Of Password is 10 </p>
            )}
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("conf_password", {
                required: true,
                maxLength: 10,
                minLength: 3,
                validate: (val) => {
                  if (watch("password") !== val) {
                    return "Your passwords do no match";
                  }
                },
              })}
            />
            {errors.password?.type === "required" && (
              <p className="text-danger">Password is Required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-danger">MinLength Of Password is 3 </p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-danger">MaxLength Of Password is 10 </p>
            )}
            {errors.conf_password?.type === "validate" && (
              <p className="text-danger">Your passwords do no match </p>
            )}
            <input
              type="text"
              placeholder="Enter Your City"
              {...register("city", {
                required: true,
              })}
            />
            {errors.displayName?.type === "required" && (
              <p className="text-danger">Your City is required</p>
            )}
            <Controller
              name="job"
              control={control}
              render={({ field }) => (
                <CreatableSelect
                  {...field}
                  isClearable
                  options={jobs}
                  placeholder="choose your job"
                />
              )}
            />
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              {...register("pic", {
                required: true,
              })}
            />
            <label htmlFor="file">
              <img src="../public/images/add.png" alt="" />
              <span>Add an avatar</span>
            </label>
            <button type="submit">Sign up</button>
            {err && <span>Something went wrong</span>}
          </form>
        )}
        {selectedRole === "customer" && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Enter Your Name"
              {...register("displayName", {
                required: true,
                minLength: 3,
                maxLength: 15,
              })}
            />
            {errors.displayName?.type === "required" && (
              <p className="text-danger">Your Name is required</p>
            )}
            {errors.displayName?.type === "minLength" && (
              <p className="text-danger">Min Length of Name is 3</p>
            )}
            {errors.displayName?.type === "maxLength" && (
              <p className="text-danger">Max Length of Name is 15</p>
            )}
            <input
              type="email"
              placeholder="Enter your Email"
              {...register("email", {
                required: true,
              })}
            />
            {errors.email?.type === "required" && (
              <p className="text-danger">Email is required</p>
            )}
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: true,
                maxLength: 10,
                minLength: 3,
              })}
            />
            {errors.password?.type === "required" && (
              <p className="text-danger">Password is Required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-danger">MinLength Of Password is 3 </p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-danger">MaxLength Of Password is 10 </p>
            )}
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("conf_password", {
                required: true,
                maxLength: 10,
                minLength: 3,
                validate: (val) => {
                  if (watch("password") !== val) {
                    return "Your passwords do no match";
                  }
                },
              })}
            />
            {errors.password?.type === "required" && (
              <p className="text-danger">Password is Required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-danger">MinLength Of Password is 3 </p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-danger">MaxLength Of Password is 10 </p>
            )}
            {errors.conf_password?.type === "validate" && (
              <p className="text-danger">Your passwords do no match </p>
            )}
            <input
              type="text"
              placeholder="Enter Your City"
              {...register("city", {
                required: true,
              })}
            />
            {errors.displayName?.type === "required" && (
              <p className="text-danger">Your City is required</p>
            )}
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              {...register("pic", {
                required: true,
              })}
            />
            <label htmlFor="file">
              <img src="../public/images/add.png" alt="" />
              <span>Add an avatar</span>
            </label>
            <button type="submit">Sign up</button>
            {err && <span>Something went wrong</span>}
          </form>
        )}
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
