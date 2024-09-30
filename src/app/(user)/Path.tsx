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
} from "@chakra-ui/react";

import { useContext, useState } from "react";
import { FaPaperPlane, FaAddressBook, FaTrashAlt } from "react-icons/fa";
import { IconType } from "react-icons";
import { AppContext } from "./AppContext";
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
  onRemove?: () => any;
}

const TimelineCard = ({
  title,
  type,
  description,
  icon,
  source,
  link,
  duration,
  onRemove,
}: TimelineCardProps) => {
  return (
    <HStack
      p={{ base: 3, sm: 6 }}
      bg={useColorModeValue("gray.50", "gray.800")}
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
      <Icon as={icon} w={6} h={6} color="orange.300" />
      <Box>
        <HStack spacing={2} mb={1}>
          <Text fontSize="sm">{type}</Text>
          <Text fontSize="sm">{source}</Text>
          <Spacer />
          <IconButton
            rounded="full"
            colorScheme="gray"
            aria-label="remove"
            variant="ghost"
            onClick={() => {
              if (onRemove) onRemove();
            }}
          >
            <FaTrashAlt />
          </IconButton>
        </HStack>
        <VStack spacing={1} mb={1} textAlign="left">
          <chakra.h1 fontSize="lg" lineHeight={1.2} fontWeight="bold" w="100%">
            {title}
          </chakra.h1>
          <ReactMarkdown
            components={ChakraUIRenderer()}
            children={description}
            skipHtml
          />
          ;
        </VStack>
        <Text fontSize="sm">{duration}</Text>
      </Box>
    </HStack>
  );
};

const LineWithDot = () => {
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
          border="3px solid orange"
          backgroundImage="none"
          opacity={1}
        ></Box>
      </Box>
    </Flex>
  );
};

export default function Path({
  learningPath,
  setLearningPath,
  onClick,
  isLoading,
}: any) {
  const app = useContext(AppContext);
  const [prompt, setPrompt] = useState("");

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
      <Box p="2" mt={[10, 0]}>
        <SimpleGrid
          display={{
            base: "initial",
            md: "grid",
          }}
          columns={{
            md: 3,
          }}
          spacing={{
            md: 6,
          }}
        >
          <GridItem
            colSpan={{
              md: 1,
            }}
          >
            <Stack height="100%">
              <Box px={[4, 0]}>
                <Heading fontSize="lg" lineHeight="6">
                  Ready to start your Journey?
                </Heading>
                <Text
                  mt={1}
                  fontSize="sm"
                  color="gray.600"
                  _dark={{
                    color: "gray.400",
                  }}
                >
                  Navigator AI has generated a Learning path that will get your
                  career goal.
                </Text>
              </Box>
              <Spacer />
              <FormControl>
                <FormLabel
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  Anything you would like to change?
                </FormLabel>
                <Flex alignItems="end" gap="2">
                  <InputGroup>
                    <Textarea
                      bg="gray.50"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="What are some missing things you would like your learning path to include?"
                      mt={1}
                      rows={3}
                      shadow="sm"
                      fontSize={{
                        sm: "sm",
                      }}
                    />
                    <InputRightElement top="initial" bottom="1" right="2">
                      <IconButton
                        onClick={async () => {
                          const lp = await app.reGenLearningPathAsync.request(
                            prompt,
                            learningPath
                          );
                          setLearningPath(lp);
                          setPrompt("");
                        }}
                        isLoading={app.reGenLearningPathAsync.loading}
                        rounded="full"
                        isDisabled={!prompt}
                        colorScheme="gray"
                        shadow="md"
                        aria-label="send"
                      >
                        <FaPaperPlane />
                      </IconButton>
                    </InputRightElement>
                  </InputGroup>
                </Flex>
              </FormControl>
            </Stack>
          </GridItem>
          <GridItem
            mt={[5, null, 0]}
            colSpan={{
              md: 2,
            }}
          >
            <chakra.form
              method="POST"
              shadow="base"
              rounded={[null, "md"]}
              overflow={{
                sm: "hidden",
              }}
            >
              <Stack
                px={4}
                py={5}
                p={[null, 6]}
                bg="white"
                _dark={{
                  bg: "#141517",
                }}
                spacing={6}
              >
                <SimpleGrid columns={6} spacing={6}>
                  <Box as={GridItem} colSpan={6}>
                    <chakra.h3
                      fontSize="2xl"
                      fontWeight="bold"
                      mb={18}
                      textAlign="center"
                    >
                      {learningPath.title}
                    </chakra.h3>
                    {learningPath.milestones.map((path: any, index: number) => (
                      <Flex key={index} mb="10px">
                        <LineWithDot />
                        <TimelineCard
                          {...path}
                          icon={getIconFromType(path.type)}
                          onRemove={() => {
                            setLearningPath({
                              ...learningPath,
                              milestones: [
                                ...learningPath.milestones.slice(0, index),
                                ...learningPath.milestones.slice(index + 1),
                              ],
                            });
                          }}
                        />
                      </Flex>
                    ))}
                  </Box>
                </SimpleGrid>
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
              >
                <Button
                  isLoading={isLoading}
                  onClick={() => {
                    if (onClick) onClick(learningPath);
                  }}
                  isDisabled={learningPath.milestones.length < 1}
                  colorScheme="orange"
                  _focus={{
                    shadow: "",
                  }}
                  fontWeight="md"
                >
                  Begin
                </Button>
              </Box>
            </chakra.form>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Card>
  );
}
