import { Button, Card, CardHeader, CardBody, CardFooter, Divider, Spinner } from "@nextui-org/react"
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import { BiSolidError } from "react-icons/bi";

import { putUpdateTask } from "../api/taskActions";

const TaskCard = ({ index, task }) => {

    const queryClient = useQueryClient()

    const completeTaskMutation = useMutation({
        mutationKey: ["update-task", task.id],
        mutationFn: () =>  {
            task.is_completed = true
            putUpdateTask(task)
        },
        onSuccess: () => queryClient.invalidateQueries("getTasks"),
        onError: () => console.error("Failed to complete task")
    })

    return (    
        <Card className="max-w-[500px]" key={index}>
            <CardHeader className="flex flex-row justify-between items-center">
                <p className="text-lg font-semibold">{task.title}</p>
                {task.is_completed ?
                    <p className="flex flex-row items-center gap-1 text-success"><FaCheckCircle /> Completed</p>
                    :
                    <p className="flex flex-row items-center gap-1 text-warning"><BiSolidError /> Not Completed</p>
                }
            </CardHeader>
            <Divider />
            <CardBody>
                <p>{task.description}</p>
            </CardBody>
            <Divider />
            <CardFooter className={!task.is_completed ? "justify-between" : "justify-end"}>
                {completeTaskMutation.isError ? (
                    <span className="flex flex-row gap-1 items-center text-error font-semibold">
                        <BiSolidError /> Error
                    </span>
                ) : completeTaskMutation.isPending ? (
                    <span className="flex flex-row gap-2 justify-center w-full items-center text-primary font-semibold">
                        <Spinner size="md" color="secondary" /> Loading
                    </span>
                ) : !task.is_completed && (
                    <Button color="success" className="text-md" variant="flat" size="sm" onClick={() => completeTaskMutation.mutate()}>
                        <FaCheckCircle /> Complete Task
                    </Button>
                )}
                <div className="flex flex-row gap-5">
                    <Button color="primary" variant="light">
                        <FiEdit3 />Edit
                    </Button>
                    <Button color="danger">
                        <RiDeleteBin6Line /> Delete
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}

export default TaskCard