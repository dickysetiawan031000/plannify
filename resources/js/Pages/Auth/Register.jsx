import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import GuestLayout from '@/Layouts/GuestLayout';
import { Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Card>
                    <CardHeader>
                        <Link href="/" className="text-4xl font-black leading-relaxed tracking-tighter">
                            Plannify<span className="text-red-500">.</span>
                        </Link>
                        <h2 className="text-lg font-medium leading-9 tracking-tight text-left text-muted-foreground">
                            Create your account
                        </h2>
                    </CardHeader>
                    <CardContent>
                        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" onSubmit={submit}>
                                {/* form */}
                                <div>
                                    <InputLabel htmlFor={'name'} value={'Name'} />
                                    <TextInput
                                        id={'name'}
                                        type={'text'}
                                        name={'name'}
                                        value={data.name}
                                        className={'block w-full mt-1'}
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                        onErrors={errors.name && <InputError className='mt-1' message={errors.name} />}
                                    />
                                </div>
                                <div>
                                    <InputLabel htmlFor={'email'} value={'Email'} />
                                    <TextInput
                                        id={'email'}
                                        type={'email'}
                                        name={'email'}
                                        value={data.email}
                                        className={'block w-full mt-1'}
                                        isFocused={true}
                                        onChange={(e) => setData('email', e.target.value)}
                                        onErrors={errors.email && <InputError className='mt-1' message={errors.email} />}
                                    />
                                </div>
                                <div>
                                    <InputLabel htmlFor={'password'} value={'Password'} />
                                    <TextInput
                                        id={'password'}
                                        type={'password'}
                                        name={'password'}
                                        value={data.password}
                                        className={'block w-full mt-1'}
                                        isFocused={true}
                                        onChange={(e) => setData('password', e.target.value)}
                                        onErrors={errors.password && <InputError className='mt-1' message={errors.password} />}
                                    />
                                </div>
                                <div>
                                    <InputLabel htmlFor={'password_confirmation'} value={'Password Confirmation'} />
                                    <TextInput
                                        id={'password_confirmation'}
                                        type={'password'}
                                        name={'password_confirmation'}
                                        value={data.password_confirmation}
                                        className={'block w-full mt-1'}
                                        isFocused={true}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        onErrors={errors.password_confirmation && <InputError className='mt-1' message={errors.password_confirmation} />}
                                    />
                                </div>
                                <div>
                                    <Button type={'submit'} className={'w-full'} disabled={processing} variant={'red'}>
                                        Sign up
                                    </Button>
                                </div>
                            </form>

                            <p className="mt-10 text-sm text-center text-muted-foreground">
                                Your member?{' '}
                                <Link
                                    href={route('login')}
                                    className="font-semibold leading-6 text-red-500 hover:text-red-600"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}

Register.layout = (page) => <GuestLayout title={'Register'} children={page} />;
