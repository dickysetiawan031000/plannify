import { Card, CardContent } from "@/Components/ui/card.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select.jsx";
import { Button } from "@/Components/ui/button.jsx";
import { useForm } from "@inertiajs/react";
import { flashMessage } from "@/lib/utils.js";
import { toast } from "sonner";

export default function EditWorkspace({workspace, page_settings, visibilities}) {

    const {data, setData, post, processing, errors, reset} = useForm({
        name: workspace.name ?? '',
        cover : '',
        logo: '',
        visibility: workspace.visibility ?? 'Private',
        _method : page_settings.method
    })

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    }

    const onHandleSubmit = (e) => {
        e.preventDefault();
        post(page_settings.action, {
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
                                <InputLabel htmlFor="name" value="Name" />
                                <TextInput
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={data.name}
                                    onChange={onHandleChange}
                                    onErrors={errors.name && <InputError message={errors.name} />}
                                />
                            </div>

                            <div className="col-span-full">
                                <InputLabel htmlFor="cover" value="Cover" />
                                <TextInput
                                    type="file"
                                    name="cover"
                                    id="cover"
                                    onChange={(e) => setData(e.target.name, e.target.files[0])}
                                    onErrors={errors.cover && <InputError message={errors.cover} />}
                                />
                            </div>

                            <div className="col-span-full">
                                <InputLabel htmlFor="logo" value="Logo" />
                                <TextInput
                                    type="file"
                                    name="logo"
                                    id="logo"
                                    onChange={(e) => setData(e.target.name, e.target.files[0])}
                                    onErrors={errors.logo && <InputError message={errors.logo} />}
                                />
                            </div>

                            <div className="col-span-full">
                                <InputLabel htmlFor="visibility" value="Visibility" />
                                <Select
                                    defaultValue={data.visibility}
                                    onValueChange={(value) => setData('visibility', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue>
                                            {visibilities.find((visibility) => visibility.value == data.visibility)
                                                ?.label ?? 'Select a Visibility'}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {visibilities.map((visibility, index) => (
                                            <SelectItem key={index} value={visibility.value}>
                                                {visibility.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end py-6 gap-x-2">
                        <Button type="button" variant="ghost" onClick={() => reset()}>
                            Reset
                        </Button>
                        <Button variant="red" type="submit" disabled={processing}>
                            Save
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
