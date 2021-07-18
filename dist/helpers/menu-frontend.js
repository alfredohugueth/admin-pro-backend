"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenuFrontEnd = void 0;
const getMenuFrontEnd = (role) => {
    const menu = [
        {
            title: 'Dashboard',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Main', url: '/' },
                { titulo: 'ProgressBarr', url: 'progress' },
                { titulo: 'Gráficas', url: 'grafica1' },
                { titulo: 'Promesas', url: 'promesas' },
                { titulo: 'Rxjs', url: 'rxjs' }
            ]
        },
        {
            title: 'Mantenimiento',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                { titulo: 'Usuarios', url: 'usuarios' },
                { titulo: 'Hospitales', url: 'hospitales' },
                { titulo: 'Médicos', url: 'medicos' },
            ]
        }
    ];
    if (role != 'ADMIN_ROLE')
        menu.splice(1, 1);
    return menu;
};
exports.getMenuFrontEnd = getMenuFrontEnd;
