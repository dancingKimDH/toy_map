export interface StoreType {
    // tel_no: string;
    // cob_code_nm: string;
    // bizcnd_code_nm: string;
    // upso_nm: string;
    // x_cnts: string;
    // y_dnts: string;
    // rdn_code_nm: string;
    // crtfc_gbn_nm: string;
    id: number;
    phone?: string | null;
    address?: string | null;
    lat?: string | null;
    lng?: string | null;
    name?: string | null;
    category?: string | null;
    storeType?: string | null;
    foodCertifyName?: string | null;
    Likes?: LikeInterface[];
}

export interface LikeInterface {
    id: number;
    storeId: number;
    userId: number;
    store?: StoreType;
}

export interface LikeApiInterface {
    data?: LikeInterface[];
    totalPage?: number;
    totalCount?: number;
    page?: number;
}

export interface CommentInterface {
    id: number;
    storeId: number;
    userId: number;
    store?: StoreType;
    body?: string;
}

export interface CommentApiInterface {
    data?: LikeInterface[];
    totalPage?: number;
    totalCount?: number;
    page?: number;
}

export interface StoreApiResponse {
    data: StoreType[];
    totalPage?: number;
    totalCount?: number;
    page?: number;
}

export interface LocationType {
    lat?: string | null;
    lng?: string | null;
    zoom?: number | null;
}

export interface SearchType {
    q?: string;
    district?: string;
}