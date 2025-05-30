import { Card, CardContent } from "@/Components/ui/card.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select.jsx";
import { Button } from "@/Components/ui/button.jsx";
import { useForm } from "@inertiajs/react";
import { flashMessage } from "@/lib/utils.js";
import { toast } from "sonner";
import { Transition } from "@headlessui/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar.jsx";

export default function MemberWorkspace({action, members}) {

    const {data, setData, post, processing, errors, reset, recentlySuccessful} = useForm({
        email: '',
    })

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    }

    const onHandleSubmit = (e) => {
        e.preventDefault();
        post(action, {
            preserveScroll : true,
            preserveState : true,
            onSuccess : (success) => {
                const flash = flashMessage(success);
                if(flash) toast[flash.type](flash.message);
            }
        })
    }
    return (
        <Card className="md:col-span-2">
            <CardContent>
                <form onSubmit={onHandleSubmit}>
                    <div className="py-6">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    type="text"
                                    name="email"
                                    id="email"
                                    value={data.email}
                                    onChange={onHandleChange}
                                    onErrors={errors.email && <InputError message={errors.email} />}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end py-6 gap-x-2">
                        <Button type="button" variant="ghost" onClick={() => reset()}>
                            Reset
                        </Button>
                        <Button variant="red" type="submit" disabled={processing}>
                            Invite
                        </Button>
                        <Transition
                            show={recentlySuccessful}
                            enter={'transition ease-in-out'}
                            enterFrom={'opacity-0'}
                            leave={'transition ease-in-out'}
                            leaveFrom={'opacity-0'}
                        >
                            <p className={'text-sm text-muted-foreground'}>Invited.</p>
                        </Transition>
                    </div>
                </form>
                <div className={'py-6 space-y-4'}>
                    <ul role={'list'} className={'border border-gray-200 divide-y divide-gray-100 rounded-md'}>
                        {members.map((member, index) => (
                            <li
                                className={'flex justify-between py-4 pl-4 pr-5 text-sm leading-relaxed items-center'}
                                key={index}
                            >
                                <div className={'flex items-center flex-1 w-0'}>
                                    <Avatar>
                                        <AvatarImage src={member.user.avatar} />
                                        <AvatarFallback>{member.user.name.substring(0,1)}</AvatarFallback>
                                    </Avatar>
                                    <div className={'flex flex-col min-w-0 ml-4'}>
                                        <span className={'font-medium truncate'}>{member.user.name}</span>
                                        <span className={'hidden text-muted-foreground sm:block'}>{member.user.email}</span>
                                    </div>
                                </div>
                                <div className={'flex-shrink-0 ml-4'}>
                                    <Button
                                        variant={'link'}
                                        className={'font-medium text-red-500 hover:text-red-600 hover:no-underline'}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    )
}
