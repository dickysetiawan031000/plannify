import AppLayout from "@/Layouts/AppLayout.jsx";
import HeaderForm from "@/Components/HeaderForm.jsx";
import { Card, CardContent } from "@/Components/ui/card.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select.jsx";
import { Button } from "@/Components/ui/button.jsx";
import { useRef, useState } from "react";
import { router, useForm } from "@inertiajs/react";
// import { success } from "concurrently/dist/src/defaults.js";
import { flashMessage } from "@/lib/utils.js";
import { toast } from "sonner";
import InputError from "@/Components/InputError.jsx";

export default function Create({page_settings, visibilities}) {

    const {data, setData, processing, reset, post, errors} = useForm({
        name: '',
        cover: '',
        logo: '',
        visibility: '',
        _method: page_settings.method
    })

    const handleReset = () => {
        reset();
    };

    const onHandleSubmit = (e) => {
        e.preventDefault();
        post(page_settings.action, {
            onSuccess: (success) => {
                const flash = flashMessage(success);
                if (flash) toast[flash.type](flash.message);
            },
            preserveScroll: true,
            preserveState: true,
        })
    }

    return (
        <div className={'space-y-10 divide-y divide-dashed divide-gray-900/10'}>
            <div className={'grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8'}>
                <HeaderForm className={'mb-8'} title={page_settings.title} subtitle={page_settings.subtitle} />

                <Card className={'md:col-span-2'}>
                    <CardContent>
                        <form onSubmit={onHandleSubmit}>
                            <div className={'py-6'}>
                                <div className={'grid grid-cols-1 md:grid-cols-6 gap-x-6 gap-y-8'}>
                                    <div className={'col-span-full'}>
                                        <InputLabel htmlFor={'name'} value={'Name'} />
                                        <TextInput
                                            type={'text'}
                                            id={'name'}
                                            name={'name'}
                                            value={data.name}
                                            onChange={(e) => setData(e.target.name, e.target.value)}
                                            onErrors={errors.name && <InputError message={errors.name} />}
                                        />
                                    </div>

                                    <div className={'col-span-full'}>
                                        <InputLabel htmlFor={'cover'} value={'Cover'} />
                                        <TextInput
                                            type={'file'}
                                            id={'cover'}
                                            name={'cover'}
                                            onChange={(e) => setData(e.target.name, e.target.files[0])}
                                            onErrors={errors.cover && <InputError message={errors.cover} />}
                                        />
                                    </div>

                                    <div className={'col-span-full'}>
                                        <InputLabel htmlFor={'logo'} value={'Logo'} />
                                        <TextInput
                                            type={'file'}
                                            id={'logo'}
                                            name={'logo'}
                                            onChange={(e) => setData(data => ({
                                                ...data,
                                                [e.target.name]: e.target.files[0]
                                            }))}
                                            onErrors={errors.logo && <InputError message={errors.logo} />}
                                        />
                                    </div>

                                    <div className={'col-span-full'}>
                                        <InputLabel htmlFor={'visibility'} value={'Visibility'} />
                                        <Select
                                            defaultValue={'Select a visibility'}
                                            onValueChange={(value) => setData('visibility', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue>
                                                    {visibilities.find(
                                                        (visibility) => visibility.value === data.visibility
                                                    ) ?. label || 'Select a visibility'}
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
                                        {errors.visibility && <InputError message={errors.visibility} />}
                                    </div>
                                </div>
                            </div>
                            <div className={'flex items-center justify-end py-6 gap-x-2'}>
                                <Button type={'button'} variant={'ghost'} onClick={handleReset}>Reset</Button>
                                <Button type={'submit'} variant={'red'} disabled={processing}>Save</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

Create.layout = (page) => <AppLayout title={'Create Workspace'} children={page} />;
