import { Box, Center, HStack, Text, VStack, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DashboardDrawer from "./composant/dashboard_drawer";
import axios from "axios";
import { useRouter } from "next/router";
import EmployeeTable from "./composant/employe_table";
interface adminInterface {
  uuid: string;
  name: string;
  lastname: string;
  email: string;
}

interface employeeInterface {
  uuid: string;
  isActive: boolean;
  email: string;
  nom: string;
  prenom: string;
  civilite: string;
  numero_de_telephone: string;
  type_contrat: string;
  photo: string;
}
const Dashboard = () => {
  const toast = useToast();
  const router = useRouter();
  const [admin, setAdmin] = useState<adminInterface>({} as adminInterface);
  const [employees, setEmployees] = useState<employeeInterface[]>([]);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const backgrounds = [
    "/bg/bg-1.jpg",
    "/bg/bg-2.jpg",
    "/bg/bg-3.jpg",
    "/bg/bg-4.jpg",
  ];

  // check if user is connected
  useEffect(() => {
    if (!localStorage.getItem("uuid")) {
      router.push("/signin");
    }
  }, [router]);

  // change background
  useEffect(() => {
    const intervalId = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [backgroundIndex, backgrounds.length]);

  // get admin & employees
  useEffect(() => {
    const getAdmin = async () => {
      try {
        const res = await axios.post(
          "http://localhost:4000/admin/getAdmin",
          {
            uuid: localStorage.getItem("uuid"),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status === 200) {
          setAdmin(res.data.data.admin);
        } else {
          toast({
            title: "Imposible de charger les informations de l'administrateur",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAdmin();

    const getEmployees = async () => {
      const res = await axios.get(
        "http://localhost:4000/employee/getEmployees",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        setEmployees(res.data.data.employees);
      } else {
        toast({
          title: "Impossible de charger les employés",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    };
    getEmployees();
  }, [toast]);

  // get employees
  useEffect(() => {}, [toast]);
  const createEmployeee = async (
    email: string,
    nom: string,
    prenom: string,
    civilite: string,
    numero_de_telephone: string,
    type_contrat: string,
    closeDrawer: () => void,
    onClose: () => void
  ) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/employee/create",
        {
          email,
          nom,
          prenom,
          civilite,
          numero_de_telephone,
          type_contrat,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        employees.unshift(res.data.data.employee);
        onClose();
        closeDrawer();
        toast({
          title: "Employé creé",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Impossible de creé l'employé",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Impossible de creé l'employé",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };
  const updateEmployee = async (
    uuid: string,
    email: string,
    nom: string,
    prenom: string,
    civilite: string,
    numero_de_telephone: string,
    type_contrat: string,
    onClose: () => void
  ) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/employee/update",
        {
          uuid: uuid,
          email: email,
          nom: nom,
          prenom: prenom,
          civilite: civilite,
          numero_de_telephone: numero_de_telephone,
          type_contrat: type_contrat,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        onClose();
        employees.map((employee) => {
          if (employee.uuid === uuid) {
            employee.email = email;
            employee.nom = nom;
            employee.prenom = prenom;
            employee.civilite = civilite;
            employee.numero_de_telephone = numero_de_telephone;
            employee.type_contrat = type_contrat;
          }
        });
        toast({
          title: "Employé mis à jour",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Impossible de mettre à jour l'employé",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };
  return (
    <>
      <VStack
        h={"100vh"}
        w={"100%"}
        gap={0}
        bgImage={backgrounds[backgroundIndex]}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
      >
        <HStack
          w={"100%"}
          h={"10vh"}
          bg={"#00000080"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Center ml={"1em"}>
            <Text color={"white"} fontWeight={"bold"} fontSize={"3em"}>
              Sneakers
            </Text>
          </Center>
          <DashboardDrawer
            adminName={admin.name}
            adminLastname={admin.lastname}
            email={admin.email}
            createEmployeee={createEmployeee}
          />
        </HStack>
        <Center w={"100%"} h={"90vh"} bg={"#00000080"}>
          <Box w={"80%"}>
            <EmployeeTable
              employees={employees}
              setEmployees={setEmployees}
              updateEmployee={updateEmployee}
            />
          </Box>
        </Center>
      </VStack>
    </>
  );
};

export default Dashboard;
export type { employeeInterface };
