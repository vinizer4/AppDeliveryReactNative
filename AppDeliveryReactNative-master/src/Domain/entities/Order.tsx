import { User } from "./User";
import { Address } from './Address';
import { Product } from './Product';

export interface Order {
    id?: string;
    id_client: string;
    id_delivery?: string;
    id_address: string;
    status?: string;
    lat?: number;
    lng?: number;
    timestamp?: number;
    client?: User,
    delivery?: User,
    address?: Address,
    products: Product[]
}