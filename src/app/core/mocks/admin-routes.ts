import { MerchantUserRole } from "../enums/merchant-user-role";
import { AdminRoute } from "../interfaces/shared/admin-route";

export const allRoutes: Record<MerchantUserRole, AdminRoute[]> = {
    [MerchantUserRole.OWNER]: [
        {
            title: 'Funcionários',
            icon: 'supervisor_account',
            href: '/admin/funcionarios'
        },
        {
            title: 'Configurações Cardápio Online',
            icon: 'tune',
            href: '/admin/configuracoes'
        },
        // {
        //     title: 'Planos ',
        //     icon: 'business',
        //     href: '/admin/planos'
        // },
        {
            title: 'Cardápios',
            icon: 'restaurant_menu',
            href: '/admin/cardapios'
        },
        {
            title: 'Listar Pedidos',
            icon: 'shopping_cart',
            href: '/admin/pedidos/listar'
        },
        {
            title: 'Gestor de Pedidos',
            icon: 'fact_check',
            href: '/admin/pedidos/gestor',
            blank: true
        },
        {
            title: 'Comandas',
            icon: 'table_restaurant',
            href: '/admin/comandas'
        },
        {
            title: 'Configurações de Entrega',
            icon: 'map',
            href: '/admin/configuracoes/entrega'
        }
    ],
    [MerchantUserRole.ADMIN]: [
        {
            title: 'Funcionários',
            icon: 'supervisor_account',
            href: '/admin/funcionarios'
        },
        {
            title: 'Configurações Cardápio Online',
            icon: 'tune',
            href: '/admin/configuracoes'
        },
        // {
        //     title: 'Planos ',
        //     icon: 'business',
        //     href: '/admin/planos'
        // },
        {
            title: 'Cardápios',
            icon: 'restaurant_menu',
            href: '/admin/cardapios'
        },
        {
            title: 'Listar Pedidos',
            icon: 'shopping_cart',
            href: '/admin/pedidos/listar'
        },
        {
            title: 'Gestor de Pedidos',
            icon: 'fact_check',
            href: '/admin/pedidos/gestor',
            blank: true
        },
        {
            title: 'Comandas',
            icon: 'table_restaurant',
            href: '/admin/comandas'
        },
        {
            title: 'Configurações de Entrega',
            icon: 'map',
            href: '/admin/configuracoes/entrega'
        }
    ],
    [MerchantUserRole.GARSON]: [
        {
            title: 'Listar Pedidos',
            icon: 'assignment',
            href: '/admin/pedidos/listar'
        },
        {
            title: 'Gestor de Pedidos',
            icon: 'assignment',
            href: '/admin/pedidos/gestor',
            blank: true
        },
        {
            title: 'Comandas e Mesas',
            icon: 'receipt',
            href: '/admin/comandas'
        }
    ],
    [MerchantUserRole.CHEF]: [
        {
            title: 'Gestor de Pedidos',
            icon: 'assignment',
            href: '/admin/pedidos/gestor',
            blank: true
        }
    ],
    [MerchantUserRole.DRIVER]: [
        {
            title: 'Logística',
            icon: 'map',
            href: '/admin/configuracoes/entrega'
        }
    ]
};
