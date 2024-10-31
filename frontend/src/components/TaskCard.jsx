import { Button, Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react"

import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";

const TaskCard = ({ index, task }) => {
    return (
        <Card className="max-w-[400px]" key={index}>
            <CardHeader>
                <p className="text-lg font-semibold">{task.title}</p>
            </CardHeader>
            <Divider />
            <CardBody>
                <p>{task.description}</p>
            </CardBody>
            <Divider />
            <CardFooter className="justify-end">
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