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

export default function Suggestions({ suggestions, isLoading, onClick }: any) {
  const [prompt, setPrompt] = useState("");
  const [selected, setSelected] = useState([]);
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
                Suggestions for you
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color="gray.600"
                _dark={{
                  color: "gray.400",
                }}
              >
                Based on the previous information you provided. Upskill
                Navigator has generated some learning preference and skill
                development suggestions for you.
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
                        <Box as={GridItem} colSpan={6} mb="4">
                          <chakra.fieldset>
                            <Box
                              as="legend"
                              fontSize="sm"
                              color="gray.700"
                              _dark={{
                                color: "gray.50",
                              }}
                            >
                              Learning preferences and skill development:
                            </Box>
                            <Stack mt={4} spacing={4}>
                              {suggestions.map(({ title, description }) => (
                                <Flex alignItems="start">
                                  <Flex alignItems="center" h={5}>
                                    <Checkbox
                                      colorScheme="orange"
                                      _dark={{
                                        borderColor: "gray.50",
                                      }}
                                      id={title}
                                      rounded="md"
                                      value={title}
                                      isChecked={selected.includes(title)}
                                      onChange={(e) => {
                                        if (e.target.checked)
                                          setSelected([
                                            ...selected,
                                            e.target.value,
                                          ]);
                                        else
                                          setSelected(
                                            selected.filter(
                                              (option) =>
                                                option !== e.target.value
                                            )
                                          );
                                      }}
                                    />
                                  </Flex>
                                  <Box ml={3} fontSize="sm">
                                    <chakra.label
                                      htmlFor={title}
                                      fontWeight="md"
                                      color="gray.700"
                                      _dark={{
                                        color: "gray.50",
                                      }}
                                    >
                                      {title}
                                    </chakra.label>
                                    <Text
                                      color="gray.500"
                                      _dark={{
                                        color: "gray.400",
                                      }}
                                    >
                                      {description}
                                    </Text>
                                  </Box>
                                </Flex>
                              ))}
                            </Stack>
                          </chakra.fieldset>
                        </Box>

                        <FormLabel
                          fontSize="sm"
                          fontWeight="md"
                          color="gray.700"
                          _dark={{
                            color: "gray.50",
                          }}
                        >
                          Any additional preferences?
                        </FormLabel>
                        <Textarea
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          placeholder="Any additional areas of interest?"
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
                    const preferences: string[] = [...selected];
                    if (prompt) preferences.push(prompt);
                    if (onClick) onClick(preferences);
                  }}
                  isDisabled={selected.length < 1 && !prompt}
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
