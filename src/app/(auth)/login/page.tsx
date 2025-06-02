import { LogInForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="loginwrapper bg-background flex h-screen w-full items-center justify-center overflow-hidden overflow-y-hidden">
      <div className="flex h-full w-full items-center justify-center overflow-y-hidden lg:justify-start">
        <div className="relative flex w-full items-center justify-center px-5 lg:w-1/2">
          <LogInForm />
        </div>
        <div className="hidden h-screen w-screen bg-[url('/static/login.png')] bg-cover bg-center bg-no-repeat lg:flex lg:w-1/2"></div>
      </div>
    </div>
  );
}
