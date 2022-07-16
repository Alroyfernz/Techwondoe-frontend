import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Stack,
    Input,
    Select,
    
  } from "@chakra-ui/react";
import IModal from '../../Interfaces/IModal';
const ModalComp:React.FC<IModal> = ({handleEdit,handleUpload,isEdit,movieData,changeHandler,isOpen,onClose}) => {
   

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{isEdit ? "Edit" : "Save"} Movie</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form
          action=""
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            handleUpload();
          }}
        >
          <Stack spacing={7}>
            <Input
              variant="flushed"
              value={movieData.Title}
              placeholder="Enter Movie Name "
              onChange={(e) => changeHandler(e, "Title")}
            />
            <Input
              variant="flushed"
              placeholder="Enter Streaming App"
              value={movieData.StreamingApp}
              onChange={(e) => changeHandler(e, "StreamingApp")}
            />
            <Select
              variant="flushed"
              placeholder="Enter Rating"
              onChange={(e) => changeHandler(e, "Rating")}
              value={movieData.Rating}
            >
              <option value="1">1</option>
              <option value="2">2</option>

              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Select>
            <Input
              variant="flushed"
              placeholder="Enter your Review"
              value={movieData.Review}
              onChange={(e) => changeHandler(e, "Review")}
            />
          </Stack>
        </form>
      </ModalBody>

      <ModalFooter>
        <Button variant="ghost" mr={3} onClick={onClose}>
          Close
        </Button>
        <Button
          colorScheme="red"
          onClick={() => {
            if (isEdit) {
              handleEdit();
            } else {
              handleUpload();
            }
          }}
        >
          Save
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
}

export default ModalComp