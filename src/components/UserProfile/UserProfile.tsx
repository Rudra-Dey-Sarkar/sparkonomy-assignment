"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PencilIcon } from "lucide-react";

type UserPayload = {
    name: string;
    image: string;
};

function UserProfile() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(true);

    const [userData, setUserData] = useState<UserPayload>({
        name: "User Name",
        image: "/images/user.png",
    });

    const ref = useRef<HTMLInputElement>(null);

    // Load saved data on mount
    useEffect(() => {
        const userName = localStorage.getItem("userName");
        const userImage = localStorage.getItem("userImage");
        if (userName && userImage) {
            const updatedData = {
                name: userName ?? "User Name",
                image: userImage ?? "/images/user.png",
            };

            setUserData(updatedData);
            form.reset({ name: updatedData.name });
        }
    }, []);

    useEffect(() => {
        setIsEditing(true);
    }, [isOpen])

    const form = useForm<{ name: string }>({
        defaultValues: { name: userData.name },
    });

    // upload image on change
    const controlUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result as string;
            setUserData((prev) => ({ ...prev, image: base64 }));
            localStorage.setItem("userImage", base64);
        };
        reader.readAsDataURL(file);
        setIsEditing(false);
    };

    const onSubmit = (data: { name: string }) => {
        setUserData((prev) => ({ ...prev, name: data.name }));
        localStorage.setItem("userName", data.name);
        setIsOpen(false);
    };

    return (
        <div>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <div className="w-[40px] h-[40px] rounded-full overflow-hidden relative hover:cursor-pointer hover:scale-105">
                        <Image
                            src={userData.image}
                            alt="user image"
                            fill
                            className="object-cover"
                        />
                    </div>
                </PopoverTrigger>

                <PopoverContent className="min-w-72 flex flex-col items-center gap-3">
                    {/* Profile Preview */}
                    <div className="relative">
                        <div className="relative w-[70px] h-[70px] rounded-full border-4 border-[#E7CDE6] overflow-hidden">
                            <Image
                                src={userData.image}
                                alt="user image"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <button
                            className="absolute bottom-0 left-12 bg-white border-[1px] p-[3px] border-black rounded-full hover:cursor-pointer hover:scale-105"
                            onClick={() => {
                                ref.current?.click();
                            }}
                        >
                            <PencilIcon className="w-[15px] h-[15px]" />
                        </button>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-2 w-full"
                    >

                        <Input
                            {...form.register("name")}
                            onChange={() => setIsEditing(false)}
                            placeholder="Enter your name"
                            defaultValue={userData.name}
                        />

                        <Input
                            type="file"
                            accept="image/*"
                            onChange={controlUpload}
                            className="hidden"
                            ref={ref} />

                        <Button
                            disabled={isEditing}
                            type="submit">Save</Button>
                    </form>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default UserProfile;
