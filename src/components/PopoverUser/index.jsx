'use client'
import { Popover, PopoverTrigger, PopoverContent, Button, Link, User, Card, CardBody, CardHeader, CardFooter } from "@nextui-org/react";
import { useRouter } from "next/navigation";
// import { UserTwitterCard } from "./UserTwitterCard";
const PopoverUser = ({handleLogout}) => {
    return (
        <Popover showArrow placement="bottom">
            <PopoverTrigger>
                <User
                    as='button'
                    className="transition-transform"
                // avatarProps={{
                //     src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                // }}
                />
            </PopoverTrigger>
            <PopoverContent
                className="p-0"
            >
                <Card
                    shadow="none"
                    className="bg-transparent w-full"
                >
                    <CardBody
                        className="flex flex-col gap-1"
                    >
                        <Button
                            as={Link}
                            href="/profile"
                            className="bg-transparent text-left text-gray-500"
                        >
                            Profile
                        </Button>
                        <Button
                            color="danger"
                            variant="flat"
                            onPress={handleLogout}
                        >
                            Logout
                        </Button>
                    </CardBody>
                </Card>
            </PopoverContent>
        </Popover>
    );
}

export default PopoverUser