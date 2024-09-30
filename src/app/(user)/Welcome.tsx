import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Button,
  Text
} from "@chakra-ui/react";

export default function Welcome({ onClick, isLoading }: any) {
  return (
    <Card align="center">
      <CardHeader>
        <Heading size="md"> Welcome to Upskill Navigator 🧭</Heading>
      </CardHeader>
      <CardBody>
        <Text>
          We're here to help you navigate your career, access mentorship, and
          upskill with AI-Powered personalized learning paths—tailored to your goals and
          experiences.
        </Text>
      </CardBody>
      <CardFooter>
        <Button
          isLoading={isLoading}
          colorScheme="orange"
          onClick={() => {
            if (onClick) onClick();
          }}
        >
          Get Started
        </Button>
      </CardFooter>
    </Card>
  );
}
