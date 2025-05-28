import { PiHouse, PiLockKeyOpen, PiPlus, PiSidebar, PiSquaresFour, PiUser, PiX } from 'react-icons/pi';
import { Link } from "@inertiajs/react";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar.jsx";
import { cn } from "@/lib/utils.js";

export default function Sidebar({auth, url, workspaces}){
    return (
        <nav className="flex flex-col flex-1">
            <ul role="list" className="flex flex-col flex-1 gap-y-7">
                <li>
                    <ul role="list" className="-mx-2 space-y-2">
                        {/* menu */}
                        <li>
                            <Link
                                href={route('dashboard')}
                                className={cn(
                                    url.startsWith('/dashboard') ? 'bg-red-500 text-white' : 'text-foreground hover:bg-gray-100',
                                    'group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed'
                                )}
                            >
                                <PiHouse className={cn(
                                    url.startsWith('/dashboard') ? 'text-white' : 'text-foreground',
                                    'h-6 w-6 shrink-0'
                                )} />
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={'#'}
                                className={cn(
                                    url.startsWith('/user') ? 'bg-red-500 text-white' : 'text-foreground hover:bg-gray-100',
                                    'group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed'
                                )}
                            >
                                <PiUser  className={cn(
                                    url.startsWith('/user') ? 'text-white' : 'text-foreground',
                                    'h-6 w-6 shrink-0'
                                )}/>
                                People
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={'#'}
                                className={cn(
                                    url.startsWith('/my-tasks') ? 'bg-red-500 text-white' : 'text-foreground hover:bg-gray-100',
                                    'group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed'
                                )}
                            >
                                <PiSquaresFour  className={cn(
                                    url.startsWith('/my-tasks') ? 'text-white' : 'text-foreground',
                                    'h-6 w-6 shrink-0'
                                )} />
                                My Tasks
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('logout')}
                                method={'post'}
                                as={'button'}
                                className={cn(
                                    url.startsWith('/logout') ? 'bg-red-500 text-white' : 'text-foreground hover:bg-gray-100',
                                    'group w-full flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed'
                                )}
                            >
                                <PiLockKeyOpen  className={cn(
                                    url.startsWith('/logout') ? 'text-white' : 'text-foreground',
                                    'h-6 w-6 shrink-0'
                                )} />
                                Logout
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    {/* workspaces */}
                    <div className={'flex items-center justify-between'}>
                        <div className={'text-xs font-semibold leading-relaxed uppercase text-foreground'}>
                            Workspaces
                        </div>
                        <Link
                            href={route('workspaces.create')}
                        >
                            <PiPlus className={'w-4 h-4 text-foreground hover:text-red-500'} />
                        </Link>
                    </div>
                    <ul role={'List'} className={'mt-2 -mx-2 space-y-2'}>
                        {workspaces.map((workspaces, index) => (
                            <li key={index}>
                                <Link
                                    href={route('workspaces.show', [workspaces])}
                                    className={'flex w-full p-3 text-sm font-semibold leading-relaxed rounded-md text-foreground hover:bg-gray-100 group gap-x-3'}
                                >
                                    <span className={'border-foreground text-foreground uppercase flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium'}>
                                        {workspaces.name.substring(0, 1)}
                                    </span>
                                    <span>{workspaces.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
                <li className="mt-auto -mx-6">
                    {/* profile */}
                    <Link
                        href={'#'}
                        className={'flex items-center px-6 py-3 text-sm font-semibold leading-relaxed gap-x-4 text-foreground hover:bg-gray-100'}
                    >
                        <Avatar>
                            <AvatarFallback>X</AvatarFallback>
                        </Avatar>
                        <span>{auth.name}</span>

                    </Link>
                </li>
            </ul>
        </nav>
    )
}
