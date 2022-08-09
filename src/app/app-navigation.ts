export const navigation = 
[
  {
    text: 'Home',
    path: '/home',
    icon: 'home'
  },
  {
    text: 'Maestros',
    icon: 'folder',
    items: [
      
      {
        text: 'Fases',
        path: '/maestro-fases',
      },
      {
        text: 'Tareas',
        path: '/maestro-tareas',
      }
    ]
  },
  {
    text: 'Configuración Proyecto',
    icon: 'folder',
    items: [
      {
        text: 'Configuración Proyecto',
        path: '/configuracion-proyecto',
      },
      {
        text: 'Proyectos',
        path: '/maestro-proyectos'
      },
      {
        text: 'Modulos',
        path: '/maestro-modulos',
      },
      {
        text: 'Funcionalidades',
        path: '/maestro-funcionalidades',
      },
      {
        text: 'Funcionalidades Tareas',
        path: '/maestro-funcionalidades-tareas',
      }
    ]
  },
  {
    text: 'Visualizar proyecto',
    icon: 'search',
    path: '/creacion-proyecto'
  }
];
