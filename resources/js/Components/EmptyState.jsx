import { Link } from "@inertiajs/react";
import { PiDatabase } from "react-icons/pi";
import { cn } from "@/lib/utils.js";

export default function EmptyState({title,url,className}){
    return(
        <Link
        href={url}
        className={cn(
            'relative block w-full rounded-lg border-2 border-dashed border-muted-foreground p-12 text-center hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
            className
        )}
        >
            <PiDatabase className="w-12 h-12 mx-auto text-muted-foreground"/>
            <span className={'block mt-2 text-sm font-medium leading-relaxed tracking-tighter'}>
                Create a new {title}
            </span>
        </Link>
    )
}
