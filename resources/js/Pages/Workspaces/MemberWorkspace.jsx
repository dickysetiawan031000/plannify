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

export default function MemberWorkspace({action}) {

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
            </CardContent>
        </Card>
    )
}
