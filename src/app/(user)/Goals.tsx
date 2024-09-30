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
} from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteGroup,
} from "@choc-ui/chakra-autocomplete";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const Prompt = ({ options, text, onClick }: any) => {
  const [selection, setSelection] = useState("");
  const isOptions = options && options.length > 0;
  return (
    <Box rounded="md" bg="gray.50" p="2" m="2" shadow="sm">
      <Stack>
        <Flex gap="2" flexWrap="wrap">
          <Text whiteSpace="nowrap" flex="1">
            {text}
          </Text>

          <Flex gap="1" flex="1">
            {isOptions && (
              <AutoComplete
                rollNavigation
                onChange={(val) => {
                  setSelection(val);
                }}
              >
                <AutoCompleteInput
                  size={"sm"}
                  bg="white"
                  placeholder="Select..."
                />
                <AutoCompleteList>
                  {options.map((option, oid) => (
                    <AutoCompleteItem
                      key={`option-${oid}`}
                      value={option}
                      textTransform="capitalize"
                    >
                      {option}
                    </AutoCompleteItem>
                  ))}
                </AutoCompleteList>
              </AutoComplete>
            )}
            <Spacer />
            <IconButton
              isDisabled={isOptions ? !selection : false}
              onClick={() => {
                if (onClick) onClick({ text, selection });
              }}
              size="sm"
              variant="outline"
              colorScheme="orange"
              aria-label="Go"
            >
              <FaArrowRight />
            </IconButton>
          </Flex>
        </Flex>
      </Stack>
    </Box>
  );
};

export default function Goals({
  profile,
  groups,
  departments,
  roles,
  onClick,
  isLoading,
}: any) {
  const [prompt, setPrompt] = useState("");
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
            <Box px={[4, 0]}>
              <Heading fontSize="lg" lineHeight="6">
                Your Career Goals and Aspirations
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color="gray.600"
                _dark={{
                  color: "gray.400",
                }}
              >
                Let's understand your career ambitions to provide you with
                relevant career path recommendations.
              </Text>
            </Box>
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
                    <div>
                      <FormControl id="goal" mt={1}>
                        <FormLabel
                          fontSize="sm"
                          fontWeight="md"
                          color="gray.700"
                          _dark={{
                            color: "gray.50",
                          }}
                        >
                          What are you looking for?
                        </FormLabel>
                        <Stack mb="4">
                          <Prompt
                            text="I want to switch my role to:"
                            options={roles}
                            onClick={({ selection }) =>
                              onClick(
                                `I want to switch my role to '${selection}'.`
                              )
                            }
                          />

                          <Prompt
                            text="I want to work for a new department:"
                            options={departments}
                            onClick={({ selection }) =>
                              onClick(
                                `I want to work for the '${selection}' department.`
                              )
                            }
                          />
                          <Prompt
                            text="I want to take more responsibility in my current role."
                            onClick={({ text }) => onClick(text)}
                          />

                          <Prompt
                            text="I want to explore career opportunities in my current department"
                            onClick={({ text }) => onClick(text)}
                          />
                        </Stack>

                        <FormLabel
                          fontSize="sm"
                          fontWeight="md"
                          color="gray.700"
                          _dark={{
                            color: "gray.50",
                          }}
                        >
                          Want to be more specific?
                        </FormLabel>
                        <Textarea
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          placeholder="What's your ultimate career goal or specific areas you would like to grow in?"
                          mt={1}
                          rows={3}
                          shadow="sm"
                          focusBorderColor="brand.400"
                          fontSize={{
                            sm: "sm",
                          }}
                        />
                      </FormControl>
                    </div>
                  </Box>
                </SimpleGrid>
              </Stack>
              <Box
                px={{
                  base: 4,
                  sm: 6,
                }}
                py={3}
                bg="gray.50"
                _dark={{
                  bg: "#121212",
                }}
                textAlign="right"
              >
                <Button
                  isLoading={isLoading}
                  onClick={() => {
                    if (onClick) onClick(prompt);
                  }}
                  isDisabled={!prompt}
                  colorScheme="orange"
                  _focus={{
                    shadow: "",
                  }}
                  fontWeight="md"
                >
                  Continue
                </Button>
              </Box>
            </chakra.form>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Card>
  );
}
