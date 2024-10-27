import Button from "../../ui/Button";
import Input from "../../ui/Input";

function LoginForm() {
  return (
    <form className="bg-dark m-auto py-4 px-4 w-full rounded-lg">
      <Input name="email" label="Email" type="email" autoComplete="email" />
      <Input
        name="password"
        label="Password"
        type="password"
        autoComplete="password"
      />
      <Button>Login</Button>
    </form>
  );
}

export default LoginForm;
