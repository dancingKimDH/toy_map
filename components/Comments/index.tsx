import axios from "axios";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import CommentForm from "./CommentForm";

interface CommentProps {
    storeId: number;
}

export default function Comments({ storeId }: CommentProps) {

    const { status } = useSession();

    return (
        <div className="md:max-w-2xl py-8 px-2 mb-20 mx-auto">

            {/* comment form */}
            <div className="space-y-4">
                {status === "authenticated" &&
                    <CommentForm storeId={storeId} />
                }



            </div>

        </div>
    )
}