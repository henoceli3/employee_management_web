import { CopyIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Icon,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Router, useRouter } from "next/router";
import React from "react";
import CreateEmployeeModal from "./create_employee_modal";

interface DashboardDrawerProps {
  adminName: string;
  adminLastname: string;
  email: string;
  createEmployeee: (
    email: string,
    nom: string,
    prenom: string,
    civilite: string,
    numero_de_telephone: string,
    type_contrat: string,
    closeDrawer: () => void,
    onClose: () => void
  ) => void;
}

const DashboardDrawer = ({
  adminName,
  adminLastname,
  email,
  createEmployeee,
}: DashboardDrawerProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();
  return (
    <>
      <Center mr={"1em"}>
        <Icon
          as={HamburgerIcon}
          color={"white"}
          boxSize={"3em"}
          onClick={onOpen}
        />
      </Center>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Dashboard</DrawerHeader>
          <DrawerBody>
            <VStack w={"100%"}>
              <Text
                fontSize={"1.5em"}
                fontWeight={"bold"}
              >{`${adminName} ${adminLastname}`}</Text>
              <HStack>
                <Text>{email}</Text>
                <Icon
                  as={CopyIcon}
                  onClick={() => {
                    navigator.clipboard.writeText(email);
                    toast({
                      title: "Email copie",
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                      position: "top-right",
                    });
                  }}
                />
              </HStack>
              <CreateEmployeeModal closeDrawer={onClose} createEmployeee={createEmployeee} />
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <Button
              onClick={() => {
                localStorage.clear();
                router.push("/signin");
              }}
              bg={"red.500"}
            >
              Log out
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DashboardDrawer;
