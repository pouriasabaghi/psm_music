import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import { useLogin } from "./useLogin";
import { Button } from "@/ui/button";

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="m-auto w-full rounded-lg bg-dark px-4 py-4"
    >
      <Input
        register={register("email", { required: "Email is required" })}
        label="Email"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
      />
      <Input
        register={register("password", { required: "Password is required" })}
        label="Password"
        type="password"
        autoComplete="password"
        error={errors.password?.message}
      />
      <Button disabled={isPending}>{isPending ? "Loading..." : "Login"}</Button>
    </form>
  );
}

export default LoginForm;
