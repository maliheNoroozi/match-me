"use client";

import { updateMemberProfile } from "@/actions/user";
import { MemberSchema, memberSchema } from "@/lib/schemas/member";
import { handleFormServerErrors } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea } from "@nextui-org/react";
import { Member } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface Props {
  member: Member;
}

export function MemberEditForm({ member }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<MemberSchema>({
    resolver: zodResolver(memberSchema),
    defaultValues: member,
    mode: "onTouched",
  });

  useEffect(() => {
    if (member) {
      reset(member);
    }
  }, [member, reset]);

  const submitHandler = async (data: MemberSchema) => {
    const nameUpdated = member.name !== data.name;
    const result = await updateMemberProfile(nameUpdated, data);
    if (result.status === "success") {
      toast.success("Updated profile successfully.");
      reset({ ...result.data });
      router.refresh();
    } else handleFormServerErrors(result, setError);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-4"
    >
      <Input
        isRequired
        variant="bordered"
        label="Name"
        labelPlacement="inside"
        {...register("name")}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
      />
      <Textarea
        minRows={6}
        isRequired
        variant="bordered"
        label="Description"
        labelPlacement="inside"
        placeholder="Enter your description"
        {...register("description")}
        isInvalid={!!errors.description}
        errorMessage={errors.description?.message}
      />
      <div className="w-full flex flex-row gap-3">
        <Input
          isRequired
          variant="bordered"
          label="City"
          labelPlacement="inside"
          {...register("city")}
          isInvalid={!!errors.city}
          errorMessage={errors.city?.message}
        />
        <Input
          isRequired
          variant="bordered"
          label="Country"
          labelPlacement="inside"
          {...register("country")}
          isInvalid={!!errors.country}
          errorMessage={errors.country?.message}
        />
      </div>
      {errors.root?.serverError && (
        <p className="text-danger text-sm">{errors.root.serverError.message}</p>
      )}
      <Button
        type="submit"
        variant="solid"
        isLoading={isSubmitting}
        isDisabled={!isValid || !isDirty}
        className="bg-red-400 text-white hover:bg-red-500 w-fit self-end"
      >
        Update Profile
      </Button>
    </form>
  );
}
