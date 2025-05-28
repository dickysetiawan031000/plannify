import AppLayout from "@/Layouts/AppLayout.jsx";

export default function Dashboard(){
    return (
        <div>
            This is the dashboard page.
        </div>
    )
}

Dashboard.layout = (page) => <AppLayout title={'Dashboard'} children={page} />;
