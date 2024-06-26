'use client';

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { RecoilRoot } from "recoil";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import Navbar from "@/components/Navbar";

const queryClient = new QueryClient();

interface Props {
    children?: React.ReactNode;
}

export const NextProvider = ({ children }: Props) => {

    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <SessionProvider>
                        {children}
                        <ToastContainer />
                    <ReactQueryDevtools />
                </SessionProvider>
            </QueryClientProvider>
        </RecoilRoot>
    )
};

export const NextLayout = ({children}: Props) => {
    return(
        <div className="layout">
            <Navbar/>
            {children}
        </div>
    )
}
