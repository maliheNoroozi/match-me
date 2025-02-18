"use client";

import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { MessageSchema, messageSchema } from "@/lib/schemas/message";
import { zodResolver } from "@hookform/resolvers/zod";
import { createMessage } from "@/actions/message";
import { useParams, useRouter } from "next/navigation";
import { IoSend } from "react-icons/io5";
import { handleFormServerErrors } from "@/lib/utils";
import { useRef } from "react";

export function ChatForm() {
  const router = useRouter();
  const params = useParams<{ userId: string }>();
  const { userId: recipientId } = params;

  const inputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
    defaultValues: { text: "" },
  });

  const onSubmit = async (data: MessageSchema) => {
    const result = await createMessage({ ...data, recipientId });
    if (result.status === "error") {
      handleFormServerErrors(result, setError);
    } else {
      reset();
      inputRef.current?.focus();
      router.refresh();
    }
  };

  const { ref, ...rest } = register("text");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-2 items-center w-full"
    >
      <Input
        {...rest}
        isRequired
        type="text"
        variant="bordered"
        placeholder="Type a message"
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
        errorMessage={errors.text?.message}
        isInvalid={!!errors.text?.message}
      />
      <Button
        isIconOnly
        type="submit"
        className="rounded-full cursor-pointer"
        disabled={isSubmitting || !isValid}
        isLoading={isSubmitting}
      >
        <IoSend />
      </Button>
      {errors.root?.serverError && (
        <p className="text-danger text-sm">{errors.root.serverError.message}</p>
      )}
    </form>
  );
}
