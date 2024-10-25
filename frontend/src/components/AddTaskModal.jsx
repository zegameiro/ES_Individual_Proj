import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	Textarea
} from "@nextui-org/react"
import { useForm } from "react-hook-form"

const AddTaskModal = ({ isOpen, onOpen, onOpenChange }) => {

	const { register, handleSubmit, reset, formState: { errors } } = useForm()

	const onSubmit = (data) => {
		console.log(data)
	}

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
						<form onSubmit={handleSubmit(onSubmit)}>
							<ModalBody className="space-y-3">
								<Input
									{...register("title", { required: "Missing title for the Task", maxLength: 100, minLength: 5 })}
									isRequired
									isClearable
									isInvalid={errors.title}
									label="Title"
									color={errors.title ? "danger" : "primary"}
									variant="underlined"
									errorMessage={errors.title?.message}
									placeholder="Enter a title for your task"
									labelPlacement="outside"
									onClear={() => console.log("input cleared")}
								/>
								<Textarea
									{...register("description", { required: "Missing description for the Task", maxLength: 1000, minLength: 10 })}
									isRequired
									isInvalid={errors.description}
									variant="underlined"
									label="Description"
									color={errors.description ? "danger" : "primary"}
									errorMessage={errors.description?.message}
									labelPlacement="outside"
									placeholder="Enter a description for your task"
								/>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose} onClick={(e) => { e.preventDefault(); reset() }}>
									Close
								</Button>
								<Button color="secondary" type="submit">
									Action
								</Button>
							</ModalFooter>
						</form>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}

export default AddTaskModal