"use client";

import { loginSchema, LoginSchema } from "@/lib/schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, CardBody, Card, CardHeader, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import { Center } from "./center";
import { signInUser } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { AuthProviders } from "./auth-providers";
import { toast } from "react-toastify";
import { urls } from "@/lib/urls";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const router = useRouter();

  const onSubmit = async (data: LoginSchema) => {
    const result = await signInUser("credentials", data);
    if (result.status === "success") {
      router.push(urls.members);
    } else {
      toast.error(result.error as string);
    }
  };

  return (
    <Center>
      <Card className="mx-auto w-full max-w-md p-4 sm:p-6 md:p-8">
        <CardHeader className="flex flex-col items-center justify-center text-center">
          <div className="flex flex-col gap-2 items-center text-default">
            <div className="flex flex-row items-center gap-3">
              <GiPadlock size={30} />
              <h1 className="text-2xl sm:text-3xl font-semibold">Login</h1>
            </div>
            <p className="text-sm sm:text-base text-neutral-500">
              Welcome back to MatchMe!
            </p>
          </div>
        </CardHeader>
        <CardBody className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <Input
                isRequired
                type="email"
                variant="bordered"
                label="Email"
                labelPlacement="inside"
                {...register("email")}
                errorMessage={errors.email?.message}
                isInvalid={!!errors.email?.message}
              />
              <Input
                isRequired
                type="password"
                variant="bordered"
                label="Password"
                labelPlacement="inside"
                {...register("password")}
                errorMessage={errors.password?.message}
                isInvalid={!!errors.password?.message}
              />
              <Button
                fullWidth
                type="submit"
                className="w-full bg-red-400 text-white hover:bg-red-500"
                isLoading={isSubmitting}
                isDisabled={!isValid}
              >
                Login
              </Button>
            </div>
          </form>
          <AuthProviders />
        </CardBody>
      </Card>
    </Center>
  );
};
