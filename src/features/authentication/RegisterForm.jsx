import { useForm } from "react-hook-form";

import { Input } from "@/ui/input";
import { useRegister } from "./useRegister";
import { Button } from "@/ui/button";

import logo from "./../../assets/img/myplaylists-logo.svg";
import { Link } from "react-router-dom";
function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { register: registerUser, isPending } = useRegister();

  function onSubmit(data) {
    registerUser({ email: data.email, password: data.password, name:data.name });
  }

  return (
    <div className="mt-6 px-3">
      <img
        className="mx-auto mb-3 h-28 w-full rounded-lg object-cover"
        src={logo}
        alt="myplaylists logo "
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="m-auto flex w-full flex-col gap-y-3 rounded-lg bg-dark px-4 py-10"
      >
        <Input
          {...register("name", { required: "Name is required" })}
          placeholder="Name"
          type="text"
          autoComplete="username"
          error={errors.name?.message}
        />
        <Input
          {...register("email", { required: "Email is required" })}
          placeholder="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
        />
        <Input
          {...register("password", { required: "Password is required" })}
          placeholder="Password"
          type="password"
          autoComplete="password"
          error={errors.password?.message}
        />
        <Button disabled={isPending}>
          {isPending ? "Loading..." : "Register"}
        </Button>

        <Link to="/login" className="mt-2 text-start text-blue-500">
          You already have an account? Login
        </Link>
      </form>
    </div>
  );
}

export default RegisterForm;
