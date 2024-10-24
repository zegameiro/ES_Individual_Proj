import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Button, 
    useDisclosure,
    Input,
    Textarea
} from "@nextui-org/react"

const AddTaskModal = ({ isOpen, onOpen, onOpenChange }) => {

    return (
        <Modal
            backdrop="opaque"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Add a new Task</ModalHeader>
                        <ModalBody className="space-y-3">
                            <Input
                                isRequired
                                isClearable
                                type="email"
                                label="Title"
                                color="primary"
                                variant="underlined"
                                placeholder="Enter a title for your task"
                                labelPlacement="outside"
                                onClear={() => console.log("input cleared")}
                                className="max-w-xs"
                            />
                            <Textarea
                                isRequired
                                isClearable
                                variant="underlined"
                                label="Description"
                                color="primary"
                                labelPlacement="outside"
                                placeholder="Enter a description for your task"
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={onClose}>
                                Action
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default AddTaskModal