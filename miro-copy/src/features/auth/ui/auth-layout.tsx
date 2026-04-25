import {
  Card,
  CardFooter,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/shared/ui/kit/card";

export const AuthLayout = ({
  form,
  title,
  description,
  footerText,
}: {
  form: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  footerText: React.ReactNode;
}) => {
  return (
    <div>
      {" "}
      <main className="grow flex flex-col  pt-[200px] items-center">
        <Card className="w-full max-w-[400px]">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>{form}</CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground  text-center">
              {footerText}
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};
