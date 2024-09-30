"use client";
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaBell, FaCompass, FaUser } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { Providers } from "./providers";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from 'next/navigation'
import Loader from "./Loader";
const NavItem = (props: any) => {
  const { icon, children, ...rest } = props;
  return (
    <Link href={rest.href}>
      <Flex
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color="inherit"
        _dark={{ color: "gray.400" }}
        _hover={{
          bg: "gray.100",
          _dark: { bg: "gray.900" },
          color: "gray.900",
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mx="2"
            boxSize="4"
            _groupHover={{
              color: "gray.600",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const SidebarContent = (props: any) => (
  <Box
    as="nav"
    pos="fixed"
    top="0"
    left="0"
    zIndex="sticky"
    h="full"
    pb="10"
    overflowX="hidden"
    overflowY="auto"
    bg="white"
    _dark={{ bg: "gray.800" }}
    border
    color="inherit"
    borderRightWidth="1px"
    w="60"
    {...props}
  >
    <Flex px="4" py="5" align="center">
      <Text
        fontSize="xl"
        ml="2"
        color="brand.500"
        _dark={{ color: "white" }}
        fontWeight="semibold"
      >
        🧭
      </Text>
      <Text
        fontSize="lg"
        ml="2"
        color="brand.500"
        _dark={{ color: "white" }}
        fontWeight="semibold"
      >
        Upskill Navigator
      </Text>
    </Flex>
    <Flex
      direction="column"
      as="nav"
      fontSize="sm"
      color="gray.600"
      aria-label="Main Navigation"
    >
      <NavItem icon={FaCompass} href="/">
        My Journey
      </NavItem>
      <NavItem icon={FaUser} href="/profile">
        Profile
      </NavItem>
    </Flex>
  </Box>
);
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const getSession = async () => {
    const res = await supabase.auth.getUser();
    setSession(res.data.user);
  };
  useEffect(() => {
    getSession();
  }, []);
  const sidebar = useDisclosure();
  if (!session) return <Box p="8"><Loader/></Box>;
  return (
    <Box as="section" bg="gray.50" _dark={{ bg: "gray.700" }} minH="100vh">
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg="white"
          _dark={{ bg: "gray.800" }}
          borderBottomWidth="1px"
          color="inherit"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          <Spacer />

          <Flex align="center">
            <Button
              size="sm"
              onClick={async () => {
                await supabase.auth.signOut();
                router.replace("/login");
              }}
            >
              Sign Out
            </Button>
          </Flex>
        </Flex>

        <Box as="main" p="4">
          <Providers>{children}</Providers>
        </Box>
      </Box>
    </Box>
  );
}
