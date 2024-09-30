import {
  Card,
  SimpleGrid,
  GridItem,
  Heading,
  chakra,
  Stack,
  FormControl,
  FormLabel,
  Select,
  Flex,
  Checkbox,
  Button,
  Box,
  Input,
  Text,
  FormHelperText,
  Textarea,
  IconButton,
  Spacer,
  useColorModeValue,
  CardHeader,
  CardBody,
  InputGroup,
  InputRightElement,
  HStack,
  Icon,
  Link,
  VStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  StackDivider,
  Progress,
  CardFooter,
} from "@chakra-ui/react";
import { useAsync } from "./useAsync";

import { useContext, useEffect, useState } from "react";
import {
  FaPaperPlane,
  FaAddressBook,
  FaTrashAlt,
  FaCheck,
} from "react-icons/fa";
import { IconType } from "react-icons";
import Loader from "./Loader";
import { AppContext, defaultData } from "./AppContext";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
interface TimelineCardProps {
  title: string;
  type: string;
  source: string;
  description: string;
  icon: IconType;
  duration: string;
  link: string;
  isPrimary?: boolean;
  isLoading?: boolean;
  completed?: boolean;
  onCompleted?: () => any;
}

const TimelineCard = ({
  title,
  type,
  description,
  icon,
  source,
  link,
  duration,
  onCompleted,
  completed,
  isPrimary,
  isLoading,
}: TimelineCardProps) => {
  return (
    <HStack
      w="full"
      shadow="md"
      p={{ base: 3, sm: 6 }}
      bg={isPrimary ? "white" : "gray.50"}
      spacing={4}
      rounded="lg"
      alignItems="center"
      pos="relative"
      _before={{
        content: `""`,
        w: "0",
        h: "0",
        borderColor: `transparent ${useColorModeValue(
          "#f7fafc",
          "#1a202c"
        )} transparent`,
        borderStyle: "solid",
        borderWidth: "15px 15px 15px 0",
        position: "absolute",
        left: "-15px",
        display: "block",
      }}
    >
      <Icon
        as={icon}
        w={6}
        h={6}
        color={isPrimary ? "orange.300" : "gray.300"}
      />
      <Box w="full">
        <HStack spacing={2} mb={1}>
          <Text color={isPrimary ? "black" : "gray.400"} fontSize="sm">
            {type}
          </Text>
          <Text color={isPrimary ? "black" : "gray.400"} fontSize="sm">
            {source}
          </Text>
          <Spacer />
          {!completed && (
            <Button
              rounded="full"
              variant={isPrimary ? "solid" : "link"}
              colorScheme="gray"
              leftIcon={<FaCheck />}
              size="sm"
              isLoading={isLoading}
              onClick={() => {
                if (onCompleted) onCompleted();
              }}
            >
              Mark Completed
            </Button>
          )}
        </HStack>
        <VStack w="full" spacing={1} mb={1} textAlign="left">
          <chakra.h1
            color={isPrimary ? "black" : "gray.400"}
            fontSize="lg"
            lineHeight={1.2}
            fontWeight="bold"
            w="100%"
          >
            {title}
          </chakra.h1>
          <ReactMarkdown
            components={ChakraUIRenderer()}
            children={description}
            skipHtml
          />
        </VStack>
        <Text color={isPrimary ? "black" : "gray.400"} fontSize="sm">
          {duration}
        </Text>
      </Box>
    </HStack>
  );
};

const LineWithDot = ({ isPrimary }: { isPrimary?: boolean }) => {
  return (
    <Flex pos="relative" alignItems="center" mr="40px">
      <chakra.span
        position="absolute"
        left="50%"
        height="calc(100% + 10px)"
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        top="0px"
      ></chakra.span>
      <Box pos="relative" p="10px">
        <Box
          pos="absolute"
          width="100%"
          height="100%"
          bottom="0"
          right="0"
          top="0"
          left="0"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          backgroundPosition="center center"
          backgroundColor="rgb(255, 255, 255)"
          borderRadius="100px"
          border={`3px solid ${isPrimary ? "orange" : "gray"}`}
          backgroundImage="none"
          opacity={1}
        ></Box>
      </Box>
    </Flex>
  );
};

export default function Dashboard({}: any) {
  const app = useContext(AppContext);
  const onMarkCompleted = async (index: number) => {
    const lp_clone = { ...app.data.learning_path };
    const ms = lp_clone.milestones;
    ms[ms.findIndex(({ index: i }) => i == index)].completed = true;
    await app.updateLearningPathAsync.request(lp_clone);
  };
  const { loading: isMarkCompletedLoading, request: markCompletedRequest } =
    useAsync<any>(onMarkCompleted);

  const getIconFromType = (type: any) => {
    const pathIcon: any = {
      Activity: FaPaperPlane,
      Course: FaPaperPlane,
      Mentorship: FaPaperPlane,
    };
    if (pathIcon[type]) return pathIcon[type];
    return FaAddressBook;
  };

  return (
    <Card>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Learning Path</Tab>
          <Tab>Progress</Tab>
        </TabList>
        {app.isLoading ? (
          <Loader />
        ) : (
          <TabPanels>
            <TabPanel>
              <Box p="2" mt={[10, 0]}>
                <Stack
                  px={4}
                  py={5}
                  p={[null, 6]}
                  bg="white"
                  _dark={{
                    bg: "#141517",
                  }}
                  alignItems="center"
                  spacing={6}
                >
                  <Box>
                    <chakra.h3
                      fontSize="2xl"
                      fontWeight="bold"
                      mb={18}
                      textAlign="center"
                    >
                      {app.data.learning_path.title || ""}
                    </chakra.h3>
                    {app.data.learning_path?.milestones.every(
                      ({ completed }) => completed
                    ) && (
                      <Card align="center" bg="gray.50">
                        <CardHeader>
                          <Heading size="md" color="gray.600">
                            {" "}
                            Congratulations on completing your Learning Path! 🎉{" "}
                          </Heading>
                        </CardHeader>
                        <CardBody>
                          <Text>
                            What a fantastic achievement! You've completed your
                            learning path. Celebrate your success!
                          </Text>
                        </CardBody>
                        <CardFooter>
                          <Button
                            colorScheme="orange"
                            onClick={() => {
                              app.updateLearningPathAsync.request(
                                defaultData.learning_path
                              );
                            }}
                          >
                            Start new Journey
                          </Button>
                        </CardFooter>
                      </Card>
                    )}
                    {app.data.learning_path?.milestones
                      ?.filter(({ completed }: any) => !completed)
                      ?.map((path, index) => (
                        <Flex key={index} mb="10px">
                          <LineWithDot isPrimary={index === 0} />
                          <TimelineCard
                            isLoading={isMarkCompletedLoading}
                            isPrimary={index === 0}
                            {...path}
                            icon={getIconFromType(path.type)}
                            onCompleted={() => {
                              markCompletedRequest(path.index);
                            }}
                          />
                        </Flex>
                      ))}
                  </Box>
                </Stack>
                <Box
                  px={{
                    base: 4,
                    sm: 6,
                  }}
                  py={3}
                  _dark={{
                    bg: "#121212",
                  }}
                  textAlign="right"
                ></Box>
              </Box>
            </TabPanel>
            <TabPanel>
              <StatGroup bg="gray.50" p="4">
                <Stat>
                  <StatLabel>Total Milestones</StatLabel>
                  <StatNumber>
                    {app.data.learning_path?.milestones?.length}
                  </StatNumber>
                  <StatHelpText></StatHelpText>
                </Stat>

                <Stat>
                  <StatLabel>Completed</StatLabel>
                  <StatNumber>
                    {
                      app.data.learning_path?.milestones?.filter(
                        ({ completed }) => completed
                      )?.length
                    }
                  </StatNumber>
                  <StatHelpText></StatHelpText>
                </Stat>
              </StatGroup>
              <Progress
                hasStripe
                value={Math.floor(
                  (app.data.learning_path?.milestones?.filter(
                    ({ completed }) => completed
                  )?.length /
                    app.data.learning_path?.milestones?.length) *
                    100
                )}
              />
              <Card shadow="none">
                <CardHeader>
                  <Heading size="md">Completed Milestones</Heading>
                </CardHeader>

                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4">
                    {app.data.learning_path?.milestones
                      ?.filter(({ completed }: any) => completed)
                      ?.map((path, index) => (
                        <Box key={index}>
                          <Heading size="xs" textTransform="uppercase">
                            {path.title}
                          </Heading>
                          <Text pt="2" fontSize="sm">
                            {path.description}
                          </Text>
                        </Box>
                      ))}
                  </Stack>
                </CardBody>
              </Card>
            </TabPanel>
          </TabPanels>
        )}
      </Tabs>
    </Card>
  );
}
