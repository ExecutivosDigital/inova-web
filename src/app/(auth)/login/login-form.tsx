"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/utils/use-media-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Loader2, Lock, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email({ message: "Insira um email válido" }),
  password: z
    .string()
    .min(4, { message: "Senha deve ter no mínimo 4 caracteres" }),
});
export function LogInForm() {
  const [isPending] = React.useTransition();
  const [passwordType, setPasswordType] = React.useState("password");
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");

  const togglePasswordType = () => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else if (passwordType === "password") {
      setPasswordType("text");
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const onSubmit = (data: { email: string; password: string }) => {
    console.log("data", data);
    // startTransition(async () => {
    //   const result = await PostAPI(
    //     "/user/signin",
    //     {
    //       email: data.email,
    //       password: data.password,
    //     },
    //     false,
    //   );
    //   if (result.status === 200) {
    //     toast.success("Login realizado com sucesso!");
    //     // cookies.set(token, result.body.accessToken);
    //     // cookies.set(role, result.body.role);
    //     reset();
    //     window.location.href = "/";
    //   } else {
    //     toast.error(result.body.message);
    //   }
    // });
  };
  return (
    <div className="flex w-full flex-row">
      <div className="mx-auto w-full max-w-[600px]">
        <Link href="#" className="inline-block">
          <Image
            src="/logo/icon.png"
            alt="logo"
            className="h-20 w-max object-contain"
            priority={true}
            width={370}
            height={80}
          />
        </Link>
        <div className="text-default-900 text-2xl font-bold 2xl:text-3xl">
          Acesso Restrito
        </div>
        <div className="flex flex-col">
          <div className="text-default-900 text-xs 2xl:text-sm">
            Entre agora no sistema oficial do
          </div>
          <div className="text-default-900 text-xs font-bold 2xl:text-sm">
            INOVA - INTELIGÊNCIA EM LUBRIFICAÇÃO
          </div>
          <div className="text-default-900 text-xs 2xl:text-sm">
            Caso queira conhecer mais pode{" "}
            <span className="text-primary font-semibold italic underline">
              Clicar aqui agora!
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 2xl:mt-7">
          <div className="relative">
            <Input
              removeWrapper
              type="email"
              id="email"
              size={!isDesktop2xl ? "xl" : "lg"}
              placeholder=""
              disabled={isPending}
              {...register("email")}
              className={cn(
                "peer",
                {
                  "border-destructive": errors.email,
                },
                "border-default-600 rounded-none border-t-0 border-r-0 border-l-0 px-6",
              )}
            />

            <Label
              htmlFor="email"
              className="border-default-900 absolute start-1 top-2 z-10 origin-[0] -translate-y-5 scale-75 transform rounded-md px-6 text-base duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
            >
              Email
            </Label>
            <Mail className="border-default-900 absolute top-3 z-10 h-6 w-6 scale-75 transform duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:px-1" />
          </div>
          {errors.email && (
            <div className="text-destructive mt-2">
              {errors.email?.message && String(errors.email.message)}
            </div>
          )}
          <div className="relative mt-6">
            <Input
              removeWrapper
              type={passwordType === "password" ? "password" : "text"}
              id="password"
              size={!isDesktop2xl ? "xl" : "lg"}
              placeholder=" "
              disabled={isPending}
              {...register("password")}
              className={cn(
                "peer",
                {
                  "border-destructive": errors.password,
                },
                "border-default-900 rounded-none border-t-0 border-r-0 border-l-0 px-6",
              )}
            />
            <Label
              htmlFor="password"
              className={cn(
                "bg-background text-default-900 absolute start-1 top-2 z-10 origin-[0] -translate-y-5 scale-75 transform rounded-md px-6 text-base duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4",
                {
                  "text-sm": isDesktop2xl,
                },
              )}
            >
              Senha
            </Label>
            <Lock className="text-default-900 absolute top-3 z-10 h-6 w-6 scale-75 transform duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:px-1" />
            <div
              className="absolute top-1/2 -translate-y-1/2 cursor-pointer ltr:right-4 rtl:left-4"
              onClick={togglePasswordType}
            >
              {passwordType === "password" ? (
                <Icon icon="heroicons:eye" className="text-primary h-4 w-4" />
              ) : (
                <Icon
                  icon="heroicons:eye-slash"
                  className="text-primary h-4 w-4"
                />
              )}
            </div>
          </div>

          {errors.password && (
            <div className="text-destructive mt-2">
              {errors.password.message && String(errors.password.message)}
            </div>
          )}

          <Button
            className="bg-primary hover:bg-primary/90 mt-4 w-full"
            disabled={isPending}
            size={!isDesktop2xl ? "lg" : "md"}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Loading..." : "Entrar"}
          </Button>
        </form>

        <div className="text-default-600 mt-6 text-center text-base"></div>
      </div>
    </div>
  );
}
