import { providersMap } from "@/auth";
import { Button } from "@nextui-org/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SiGitlab } from "react-icons/si";

export function AuthProviders() {
  return (
    <div className="flex justify-center gap-4 flex-col">
      <p className="text-center text-sm sm:text-base text-neutral-500">
        Or sign in with
      </p>
      <div className="flex gap-4 flex-wrap">
        {providersMap.map((provider, index) => (
          <form
            key={index}
            className="w-full sm:w-auto flex-1"
            action={async () => {}}
          >
            <Button
              fullWidth
              type="submit"
              variant={providers[provider.id as providerIds].variant}
              color={providers[provider.id as providerIds].color}
              className={providers[provider.id as providerIds].className}
              startContent={providers[provider.id as providerIds].Icon}
            >
              {providers[provider.id as providerIds].label}
            </Button>
          </form>
        ))}
      </div>
    </div>
  );
}

type providerIds = keyof typeof providers;

const providers = {
  google: {
    Icon: <FcGoogle />,
    label: "Google",
    className: "bg-white border-gray-200 border-[1px]",
    variant: "bordered" as const,
    color: undefined,
  },
  github: {
    Icon: <FaGithub />,
    label: "GitHub",
    className: "bg-gray-600 text-white",
    variant: "solid" as const,
    color: "default" as const,
  },
  gitlab: {
    Icon: <SiGitlab />,
    label: "GitLab",
    className: "bg-orange-500 text-white",
    variant: "solid" as const,
    color: undefined,
  },
};
