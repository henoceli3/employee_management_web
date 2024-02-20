import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import UpdateEmployeeModal from "./update_employee_modal";
import DeleteModal from "./disable_or_delete_modal";
import ChangePhotoModal from "./change_photo_modal";
import { employeeInterface } from "../dashboard";

interface employeeTablePops {
  employees: employeeInterface[];
  setEmployees: Dispatch<SetStateAction<employeeInterface[]>>;
  updateEmployee: (
    uuid: string,
    email: string,
    nom: string,
    prenom: string,
    civilite: string,
    numero_de_telephone: string,
    type_contrat: string,
    onClose: () => void
  ) => void;
}

const EmployeeTable = ({
  employees,
  setEmployees,
  updateEmployee,
}: employeeTablePops) => {
  const toast = useToast();
  const [thListe, setThListe] = useState<string[]>([
    "Photo",
    "Statut",
    "uuid",
    "Email",
    "Nom",
    "Prénom",
    "Civille",
    "Téléphone",
    "Type de contrat",
    "Actions",
  ]);

  const disableEmployee = async (uuid: string) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/employee/disable",
        {
          uuid: uuid,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        setEmployees(
          employees.map((employee) =>
            employee.uuid === uuid ? { ...employee, isActive: false } : employee
          )
        );
        toast({
          title: "Employé désactive",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Impossible de désactiver l'employé",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      toast({
        title: "Impossible de désactiver l'employé! verifiez votre connexion",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      console.log(error);
    }
  };

  const enableEmployee = async (uuid: string) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/employee/enable",
        {
          uuid: uuid,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        setEmployees(
          employees.map((employee) =>
            employee.uuid === uuid ? { ...employee, isActive: true } : employee
          )
        );
        toast({
          title: "Employé active",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Impossible d'activer l'employé",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      toast({
        title: "Impossible d'activer l'employé! verifiez votre connexion",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      console.log(error);
    }
  };

  const deleteEmployee = async (uuid: string) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/employee/delete",
        {
          uuid: uuid,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        setEmployees(employees.filter((employee) => employee.uuid !== uuid));
        toast({
          title: "Employé supprime",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Impossible de supprimer l'employé",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      toast({
        title: "Impossible de supprimer l'employé! verifiez votre connexion",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      console.log(error);
    }
  };

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              {thListe.map((th, index) => (
                <Th key={index} color={"white"}>
                  {th}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {employees.map((employee, index) => (
              <Tr
                key={index}
                color={"white"}
                _hover={{ bg: "#00000080" }}
                cursor={"pointer"}
              >
                <Td>{<ChangePhotoModal employee={employee} />}</Td>
                <Td>{employee.isActive ? "Actif" : "Inactif"}</Td>
                <Td>{employee.uuid}</Td>
                <Td>{employee.email}</Td>
                <Td>{employee.nom}</Td>
                <Td>{employee.prenom}</Td>
                <Td>{employee.civilite}</Td>
                <Td>{employee.numero_de_telephone}</Td>
                <Td>{employee.type_contrat}</Td>
                <Td>
                  <Icon
                    as={employee.isActive ? CloseIcon : CheckIcon}
                    mr={"1em"}
                    onClick={() => {
                      employee.isActive
                        ? disableEmployee(employee.uuid)
                        : enableEmployee(employee.uuid);
                    }}
                  />
                  <UpdateEmployeeModal
                    uuid={employee.uuid}
                    updateEmployeee={updateEmployee}
                    email_={employee.email}
                    nom_={employee.nom}
                    prenom_={employee.prenom}
                    civilite_={employee.civilite}
                    numero_de_telephone_={employee.numero_de_telephone}
                    type_contrat_={employee.type_contrat}
                  />
                  <DeleteModal
                    deleteEmployee={() => {
                      deleteEmployee(employee.uuid);
                    }}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default EmployeeTable;
