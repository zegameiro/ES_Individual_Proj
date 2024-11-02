import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	Textarea,
	Spinner
} from "@nextui-org/react"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"

import { MdError } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";

import { postAddTask, putUpdateTask } from "../api/taskActions"

const AddTaskModal = ({ isOpen, onOpenChange, onClose, currentTask, isEdit }) => {

	const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm()

	const queryClient = useQueryClient()

	const onSubmit = (data) => {

		if (isEdit) { 
			currentTask.title = data.title
			currentTask.description = data.description
		}

		addTaskMutation.mutate(isEdit ? currentTask : data)
	}

	const addTaskMutation = useMutation({
		mutationKey: ['addTask'],
		mutationFn: (data) => isEdit ? putUpdateTask(data) : postAddTask(data),
		onSuccess: () => {
			setTimeout(() => {
				reset()
				addTaskMutation.reset()
				onClose()
				queryClient.invalidateQueries('getTasks')
			}, 1000)
		},
		onError: () => {
			console.error("Failed to add task")
			setTimeout(() => {
				onClose()
				reset()
				addTaskMutation.reset()
			}, 1000)
		}
	})

	useEffect(() => {

		if (isEdit) {
			setValue("title", currentTask.title, { shouldValidate: true })
			setValue("description", currentTask.description, { shouldValidate: true })
		}

	}, [currentTask, isEdit])

	console.log(isEdit)
	console.log(currentTask)

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
									{...register("title", {
										required: "Missing title for the Task",
										maxLength: { value: 100, message: "Max length is 100 characters" },
										minLength: { value: 5, message: "Title is required to have at least 5 characters" }
									})}
									isRequired
									isClearable
									isInvalid={errors.title}
									label="Title"
									color={errors.title ? "danger" : "primary"}
									variant="underlined"
									errorMessage={errors.title?.message}
									placeholder="Enter a title for your task"
									labelPlacement="outside"
									defaultValue={isEdit ? currentTask?.title : ""}
									onClear={() => console.log("input cleared")}
								/>
								<Textarea
									{...register("description", {
										required: "Missing description for the Task",
										maxLength: { value: 1000, message: "Max length is 1000 characters" },
										minLength: { value: 10, message: "Description must have at least 10 characters" }
									})}
									isRequired
									isInvalid={errors.description}
									variant="underlined"
									label="Description"
									color={errors.description ? "danger" : "primary"}
									errorMessage={errors.description?.message}
									labelPlacement="outside"
									defaultValue={isEdit ? currentTask?.description : ""}
									placeholder="Enter a description for your task"
								/>
							</ModalBody>
							<ModalFooter>
								{addTaskMutation.isPending ? (
									<span className="flex flex-row gap-2 justify-center w-full items-center text-primary font-semibold">
										<Spinner size="md" color="secondary" /> Loading
									</span>
								) : addTaskMutation.isSuccess ? (
									<span className="flex flex-row gap-1 w-full justify-center items-center text-success font-semibold">
										<FaCircleCheck /> Task added with success
									</span>
								) : addTaskMutation.isError ? (
									<span className="flex flex-row gap-1 w-full justify-center items-center text-error font-semibold">
										<MdError className="text-lg" /> Error - {addTaskMutation.error?.detail}
									</span>
								) : (
									<>
										<Button color="danger" variant="light" onPress={onClose} onClick={(e) => { e.preventDefault(); reset(); addTaskMutation.reset() }}>
											Close
										</Button>
										<Button color="secondary" type="submit">
											{isEdit ? "Edit Task" : "Add Task"}
										</Button>
									</>
								)}
							</ModalFooter>
						</form>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}

export default AddTaskModal