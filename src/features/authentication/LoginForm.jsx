import { useForm } from "react-hook-form";

import { Input } from "@/ui/input";
import { useLogin } from "./useLogin";
import { Button } from "@/ui/button";

import logo from "./../../assets/img/myplaylists-banner.svg";
import { Link } from "react-router-dom";
function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login, isPending } = useLogin();

  function onSubmit(data) {
    login({ email: data.email, password: data.password });
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
          {isPending ? "Loading..." : "Login"}
        </Button>

        <Link to="/register" className="text-start mt-2 text-blue-500">
          Don't have an account? Register
        </Link>
      </form>
    </div>
  );
}

export default LoginForm;
