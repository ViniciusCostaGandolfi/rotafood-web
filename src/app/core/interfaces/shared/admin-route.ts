export interface AdminRoute {
    title: string;
    icon: string;
    href?: string;
    blank?: boolean
    items?: {
        subtitle: string;
        href: string;
        blank?: boolean
    }[];
}