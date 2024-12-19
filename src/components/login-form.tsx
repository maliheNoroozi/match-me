"use client";

import { loginSchema, LoginSchema } from "@/lib/schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, CardBody, Card, CardHeader, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import { CenteredContainer } from "./center";
import { signInUser } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { urls } from "@/lib/urls";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const router = useRouter();

  const onSubmit = async (data: LoginSchema) => {
    const result = await signInUser(data);
    if (result.status === "success") {
      console.log(result.data);
      router.push(urls.members);
    } else {
      setError("root", { message: result.error as string });
    }
  };

  return (
    <CenteredContainer>
      <Card className="w-1/3 mx-auto">
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-2 items-center text-default">
            <div className="flex flex-row items-center gap-3">
              <GiPadlock size={30} />
              <h1 className="text-3xl font-semibold">Login</h1>
            </div>
            <p className="text-neutral-500">Welcome back to MatchMe!</p>
          </div>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                isLoading={isSubmitting}
                isDisabled={!isValid}
              >
                Login
              </Button>
              <div className="p-1">
                {errors.root && (
                  <span className="text-danger">{errors.root?.message}</span>
                )}
              </div>
            </div>
          </form>
        </CardBody>
      </Card>
    </CenteredContainer>
  );
};
