import AppLayout from "@/Layouts/AppLayout.jsx";

export default function Testing(){
    return (
        <div>
            This is testing page.
        </div>
    )
}

Testing.layout = (page) => <AppLayout children={page} title={'Testing'} />;
