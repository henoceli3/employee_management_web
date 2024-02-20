// Composant ChangePhotoModal
import React, { useState } from "react";
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { employeeInterface } from "./employe_table";

interface ChangePhotoModalProps {
  employee: employeeInterface;
}

const ChangePhotoModal: React.FC<ChangePhotoModalProps> = ({ employee }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUpdatePhoto = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("photo", selectedFile);
    formData.append("uuid", employee.uuid);

    try {
      const res = await axios.post(
        "http://localhost:4000/employee/update/photo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        employee.photo = res.data.data.employee.photo;
        setSelectedFile(null);
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Avatar
        name={`${employee.nom} ${employee.prenom}`}
        bg={"white"}
        color={"black"}
        src={`http://localhost:4000/uploads/${employee.photo}`}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Avatar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center flexDirection={"column"}>
              <Box>
                <label htmlFor={`file-input`}>
                  <Avatar
                    size={"2xl"}
                    name={`${employee.nom} ${employee.prenom}`}
                    bg={"#00000080"}
                    color={"black"}
                    src={
                      selectedFile
                        ? URL.createObjectURL(selectedFile)
                        : `http://localhost:4000/uploads/${employee.photo}`
                    }
                    cursor={"pointer"}
                  />
                </label>
                <input
                  id={`file-input`}
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    setSelectedFile(e.target.files && e.target.files[0])
                  }
                />
              </Box>
              <Text>
                {selectedFile ? selectedFile.name : "Select a new photo"}
              </Text>
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleUpdatePhoto}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangePhotoModal;
