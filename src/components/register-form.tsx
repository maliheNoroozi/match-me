"use client";

import { registerSchema, RegisterSchema } from "@/lib/schemas/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, CardBody, Card, CardHeader, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import { CenteredContainer } from "./center";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = (data: RegisterSchema) => {
    console.log(data);
  };

  return (
    <CenteredContainer>
      <Card className="w-1/3 mx-auto">
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-2 items-center text-default">
            <div className="flex flex-row items-center gap-3">
              <GiPadlock size={30} />
              <h1 className="text-3xl font-semibold">Register</h1>
            </div>
            <p className="text-neutral-500">Welcome back to MatchMe!</p>
          </div>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <Input
                isRequired
                type="name"
                variant="bordered"
                label="Name"
                labelPlacement="inside"
                {...register("name")}
                errorMessage={errors.name?.message}
                isInvalid={!!errors.name?.message}
              />
              <Input
                isRequired
                type="email"
                variant="bordered"
                label="Email"
                labelPlacement="inside"
                {...register("email")}
                errorMessage={errors.email?.message}
                isInvalid={!!errors.email}
              />
              <Input
                isRequired
                type="password"
                variant="bordered"
                label="Password"
                labelPlacement="inside"
                {...register("password")}
                errorMessage={errors.password?.message}
                isInvalid={!!errors.password}
              />
              <Button
                fullWidth
                type="submit"
                isLoading={isSubmitting}
                isDisabled={!isValid}
              >
                Register
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </CenteredContainer>
  );
};