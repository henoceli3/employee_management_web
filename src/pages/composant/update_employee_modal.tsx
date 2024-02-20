import { EditIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
interface UpdateEmployeeModalProps {
  uuid: string;
  email_: string;
  nom_: string;
  prenom_: string;
  civilite_: string;
  numero_de_telephone_: string;
  type_contrat_: string;
  updateEmployeee: (
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
const UpdateEmployeeModal = ({
  uuid,
  email_,
  nom_,
  prenom_,
  civilite_,
  numero_de_telephone_,
  type_contrat_,
  updateEmployeee,
}: UpdateEmployeeModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState(email_);
  const [nom, setNom] = useState(nom_);
  const [prenom, setPrenom] = useState(prenom_);
  const [civilite, setCivilite] = useState(civilite_);
  const [numero_de_telephone, setNumero_de_telephone] =
    useState(numero_de_telephone_);
  const [type_contrat, setType_contrat] = useState(type_contrat_);

  const handleEmailInputChange = (e: { target: { value: string } }) => {
    setEmail(e.target.value.trim().toLowerCase());
  };
  const handleNomInputChange = (e: { target: { value: string } }) => {
    setNom(e.target.value.trim().toLowerCase());
  };
  const handlePrenomInputChange = (e: { target: { value: string } }) => {
    setPrenom(e.target.value.trim().toLowerCase());
  };
  const handleCiviliteInputChange = (e: { target: { value: string } }) => {
    setCivilite(e.target.value);
  };
  const handleNumero_de_telephoneInputChange = (e: {
    target: { value: string };
  }) => {
    setNumero_de_telephone(e.target.value.trim().toLowerCase());
  };
  const handleType_contratInputChange = (e: { target: { value: string } }) => {
    setType_contrat(e.target.value);
  };

  return (
    <>
      <Icon
        as={EditIcon}
        mt={4}
        onClick={() => {
          onOpen();
        }}
      />
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Employee</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              variant="flushed"
              placeholder="Email"
              _placeholder={{ color: "gray.500" }}
              onChange={handleEmailInputChange}
              value={email}
            />
            <Input
              variant="flushed"
              placeholder="Nom"
              _placeholder={{ color: "gray.500" }}
              onChange={handleNomInputChange}
              value={nom}
              mt={4}
            />
            <Input
              variant="flushed"
              placeholder="Prenom"
              _placeholder={{ color: "gray.500" }}
              onChange={handlePrenomInputChange}
              value={prenom}
              mt={4}
            />
            <Select
              placeholder="Selectionnez la civilite"
              _placeholder={{ color: "gray.500" }}
              onChange={handleCiviliteInputChange}
              value={civilite}
              variant="flushed"
              mt={4}
            >
              <option value="Monsieur">Monsieur</option>
              <option value="Madame">Madame</option>
            </Select>
            <InputGroup mt={4}>
              <InputLeftElement pointerEvents="none">
                <PhoneIcon color="gray.300" />
              </InputLeftElement>
              <Input
                variant="flushed"
                onChange={handleNumero_de_telephoneInputChange}
                value={numero_de_telephone}
                placeholder="Numero de telephone"
                _placeholder={{ color: "gray.500" }}
              />
            </InputGroup>
            <Select
              placeholder="Selectionnez la type de contrat"
              _placeholder={{ color: "gray.500" }}
              onChange={handleType_contratInputChange}
              value={type_contrat}
              variant="flushed"
              mt={4}
            >
              <option value="Stage">Stage</option>
              <option value="Interim">Interim</option>
              <option value="CDD">CDD</option>
              <option value="CDI">CDI</option>
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button variant={"ghost"} mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              bg={"#d3f8e2"}
              _hover={{ bg: "#709775" }}
              onClick={() => {
                updateEmployeee(
                  uuid,
                  email,
                  nom,
                  prenom,
                  civilite,
                  numero_de_telephone,
                  type_contrat,
                  onClose
                );
              }}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateEmployeeModal;
