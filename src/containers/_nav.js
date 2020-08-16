export default [
  // Dashboard
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
  },

  //  Movies
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Movies',
    route: '/movie',
    icon: 'cil-movie', 
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New',
        to: '/movie/create',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'List',
        to: '/movie/list',
      },

    ]
  },

  // Games
  
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Games',
    route: '/game',
    icon: 'cil-gamepad',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New',
        to: '/game/create',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'List',
        to: '/game/list',
      },

    ]
  }
]

