'use client'
import { Popover, PopoverTrigger, PopoverContent, Button, Link, User, Card, CardBody, CardHeader, CardFooter } from "@nextui-org/react";
import { useRouter } from "next/navigation";
// import { UserTwitterCard } from "./UserTwitterCard";
const PopoverUser = ({ profileSiswa, profileGuru, handleLogout }) => {
    return (
        <Popover showArrow placement="bottom" className="h-[100px] w-[220px]">
            <PopoverTrigger>
            {profileSiswa && profileSiswa.urlimage ? (
                    <User
                        as="button"
                        className="transition-transform"
                        avatarProps={{ src: profileSiswa.urlimage }}
                    />
                ) : profileGuru && profileGuru.urlimage ? (
                    <User
                        as="button"
                        className="transition-transform"
                        avatarProps={{ src: profileGuru.urlimage }}
                    />
                ) : (
                    <User as="button" className="transition-transform" />
                )}
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
                            className="bg-transparent text-left text-gray-500 hover:shadow"
                        >
                            Profile
                        </Button>
                        <Button
                            variant="light"
                            onPress={handleLogout}
                            className="text-accent-orange hover:shadow bg-transparent"
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