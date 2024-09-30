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
  Textarea,
} from "@chakra-ui/react";

export default function YourInformation({
  profile,
  groups,
  departments,
  roles,
  onClick,
  isLoading
}: any) {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data: Record<any, any> = {};
    for (const [key, value] of formData.entries()) {
      const match = key.match(/\[(.*?)\]/);
      if (match) {
        const list_key = match[1];
        const list_val = key.replace(/\[.*?\]/g, "").trim();
        if (!data[list_key]) data[list_key] = [];
        data[list_key].push(list_val);
      } else {
        data[key] = value;
      }
    }
    if (onClick) onClick(data);
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
            <Box px={[4, 0]}>
              <Heading fontSize="lg" lineHeight="6">
                Your Information
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color="gray.600"
                _dark={{
                  color: "gray.400",
                }}
              >
                Your information has been auto-populated from the organization
                database. Make sure everything is up to date before proceeding.
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
              onSubmit={onSubmit}
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
                  <FormControl as={GridItem} colSpan={[6, 3]}>
                    <FormLabel
                      htmlFor="first_name"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{
                        color: "gray.50",
                      }}
                    >
                      First name
                    </FormLabel>
                    <Input
                      type="text"
                      name="first_name"
                      id="first_name"
                      autoComplete="given-name"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      defaultValue={profile.first_name}
                    />
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 3]}>
                    <FormLabel
                      htmlFor="last_name"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{
                        color: "gray.50",
                      }}
                    >
                      Last name
                    </FormLabel>
                    <Input
                      type="text"
                      name="last_name"
                      id="last_name"
                      autoComplete="family-name"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      defaultValue={profile.last_name}
                    />
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 3]}>
                    <FormLabel
                      htmlFor="department"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{
                        color: "gray.50",
                      }}
                    >
                      Department
                    </FormLabel>
                    <Select
                      id="department"
                      name="department"
                      autoComplete="department"
                      placeholder="Select option"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      defaultValue={profile.department}
                    >
                      {departments.map((name) => (
                        <option value={name}>{name}</option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 3]}>
                    <FormLabel
                      htmlFor="current_role"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{
                        color: "gray.50",
                      }}
                    >
                      Current Role
                    </FormLabel>
                    <Select
                      id="current_role"
                      name="current_role"
                      autoComplete="current_role"
                      placeholder="Select option"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      defaultValue={profile.current_role}
                    >
                      {roles.map((name) => (
                        <option value={name}>{name}</option>
                      ))}
                    </Select>
                  </FormControl>
                  <Box as={GridItem} colSpan={6}>
                    <chakra.fieldset>
                      <Box
                        as="legend"
                        fontSize="sm"
                        color="gray.700"
                        _dark={{
                          color: "gray.50",
                        }}
                      >
                        Select all groups you are a member of:
                      </Box>
                      <Stack mt={4} spacing={4}>
                        {groups.map((name) => (
                          <Flex alignItems="start">
                            <Flex alignItems="center" h={5}>
                              <Checkbox
                                colorScheme="orange"
                                _dark={{
                                  borderColor: "gray.50",
                                }}
                                id={name}
                                name={`[groups] ${name}`}
                                rounded="md"
                                
                                defaultChecked={profile.groups.includes(name)}
                              />
                            </Flex>
                            <Box ml={3} fontSize="sm">
                              <chakra.label
                                htmlFor={name}
                                fontWeight="md"
                                color="gray.700"
                                _dark={{
                                  color: "gray.50",
                                }}
                              >
                                {name}
                              </chakra.label>
                            </Box>
                          </Flex>
                        ))}
                      </Stack>
                    </chakra.fieldset>
                  </Box>
                  <FormControl as={GridItem} id="additional_info" colSpan={6}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{
                        color: "gray.50",
                      }}
                    >
                      Anything else you would like us to know about you?
                    </FormLabel>
                    <Textarea
                      name="additional_info"
                      placeholder="Favorite things to do outside of work, any recent achievements in your career?"
                      mt={1}
                      rows={3}
                      shadow="sm"
                      focusBorderColor="brand.400"
                      fontSize={{
                        sm: "sm",
                      }}
                    />
                  </FormControl>
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
                  type="submit"
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
