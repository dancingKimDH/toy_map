import { NextResponse } from "next/server";

import prisma from "@/db"
import axios from "axios";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

interface ResponseType {
    page?: string;
    limit?: string;
    q?: string;
    district?: string;
    id?: string;
}

export async function GET(req: Request) {

    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") as string;
    const limit = searchParams.get("limit") as string;
    const q = searchParams.get("q") as string;
    const district = searchParams.get("district") as string;
    const id = searchParams.get("id") as string;

    const session = await getServerSession(authOptions);

    if (page) {

        // Converts page string to an integer and subtracts 1 ---> pagination in programming starts from 0
        const skipPage = parseInt(page) - 1;

        // Count the number of records in the store tables
        const count = await prisma.store.count();

        // Fetch directly
        // const stores = (await import("../../data/store_data.json"))["DATA"] as StoreType[];

        // Fetch through prisma + pagination
        const stores = await prisma.store.findMany({
            orderBy: { id: "asc" },
            where: {
                name: q ? { contains: q } : {},
                address: district ? { contains: district } : {},
            },
            take: parseInt(limit),
            skip: skipPage * 10,
        });

        return NextResponse.json(
            {
                page: parseInt(page),
                data: stores,
                totalCount: count,
                totalPage: Math.ceil(count / 10),
            }, {
            status: 200,
        }
        )

    }

    else {

        const stores = await prisma.store.findMany(
            {
                orderBy: { id: "asc" },
                where: { id: id ? parseInt(id) : {} },
                include: {
                    Likes: {
                        where: session ? { userId: session.user.id } : {},
                    }
                }
            },

        )
        return NextResponse.json(
            id ? stores[0] : stores, { status: 200 }
        )
    }

}

export async function POST(req: Request) {
    const formData = await req.json();

    // Kakao API
    const headers = {
        Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
    };

    const { data } = await axios.get(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(formData.address)}`, { headers })

    const result = await prisma.store.create({
        //     data : ---> key in the key-value pair, a key expected as per its API, a name of the property
        //     ...data ---> spread operator, represents the value (from the req.body) that is being assigned to the 'data' key
        data: { ...formData, lat: data.documents[0].y, lng: data.documents[0].x },
    });

    return NextResponse.json(result, { status: 200 });
}

export async function PUT(req: Request) {
    const formData = await req.json();

    // Kakao API
    const headers = {
        Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
    };

    const { data } = await axios.get(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(formData.address)}`, { headers })

    const result = await prisma.store.update({
        where: { id: formData.id },
        data: { ...formData, lat: data.documents[0].y, lng: data.documents[0].x }
    })

    return NextResponse.json(result, { status: 200 });
}

export async function DELETE(req: Request) {

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
        const result = await prisma.store.delete({
            where: { id: parseInt(id), }
        })
        return NextResponse.json(result, {status: 200});
    } else {
        return NextResponse.json(null, {status: 500});
    }
}