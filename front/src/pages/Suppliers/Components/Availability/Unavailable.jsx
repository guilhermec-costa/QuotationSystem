import { Badge } from "@/components/ui/badge";

export default function Unavailable({ status }) {
    return <Badge variant={"outline"} className="bg-destructive min-w-max p-2">{status}</Badge>
}
