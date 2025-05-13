import { Head, Link } from '@inertiajs/react';
export default function GuestLayout({ title, children }) {
    console.log(children)
    return (
        <>
            <Head title={title} />
            {children}
        </>
    );
}
