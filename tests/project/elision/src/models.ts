export interface Order { id: string }
export type OrderId = string;
export enum Status { Open = "open" }
export class OrdersService { find(id: OrderId): Order { return { id }; } }
export const LIMIT = 10;
export declare const ambient: number;
