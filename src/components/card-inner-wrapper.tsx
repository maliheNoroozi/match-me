import { CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import { ReactNode } from "react";

interface Props {
  header: ReactNode | string;
  body: ReactNode;
  footer?: ReactNode;
}

export function CardInnerWrapper({ header, body, footer }: Props) {
  return (
    <>
      <CardHeader>
        {typeof header === "string" ? (
          <div className="text-2xl font-semibold text-default">{header}</div>
        ) : (
          <>{header}</>
        )}
      </CardHeader>
      <Divider />
      <CardBody className="overflow-y-auto">{body}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </>
  );
}
