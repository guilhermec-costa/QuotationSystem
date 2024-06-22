import { Badge } from "@/components/ui/badge";

export default function Available({ status }) {
    return <Badge className="bg-green-500 min-w-max p-2" variant={"outline"}>{status}</Badge>
}
