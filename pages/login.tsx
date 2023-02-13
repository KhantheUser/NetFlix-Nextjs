import useAuth from "@/hooks/useAuth";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
type Inputs = {
  email: string;
  password: string;
};
function Login() {
  const { signIn, signUp } = useAuth();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      console.log(email, password);
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };
  const [login, setLogin] = useState<boolean>(false);
  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        alt="image"
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />
      <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 rounded space-y-8 bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="font-semibold text-4xl">Sign In</h1>
        <div className="space-y-4">
          <label htmlFor="" className="w-full inline-block">
            <input
              type="text"
              placeholder="Email"
              {...register("email", { required: true })}
              className="input"
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label htmlFor="" className="w-full inline-block">
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
              className="input"
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>
        <button
          onClick={() => setLogin(true)}
          type="submit"
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
        >
          Sign in
        </button>
        <div className="text-[gray]">
          New to Netflix?{" "}
          <button
            onClick={() => setLogin(false)}
            className="text-white hover:underline"
          >
            Sign up now
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
