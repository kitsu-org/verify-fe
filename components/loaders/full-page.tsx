import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import type { FC } from "react";

export const FullPageLoader: FC<{
    text: string;
}> = ({ text }) => {
    return (
        <Dialog open={true}>
            <DialogContent
                className="p-4 flex items-center justify-center bg-transparent ring-0 border-0 focus:ring-0"
                onOpenAutoFocus={(e) => e.preventDefault()}
            >
                <DialogHeader className="flex flex-col justify-center items-center gap-4">
                    <DialogTitle className="sr-only">Loading</DialogTitle>
                    <Loader2 className="animate-spin size-12" />
                    <DialogDescription className="text-xl text-muted-foreground sr-only">
                        {text}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
