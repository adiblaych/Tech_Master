import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    // save the order
    { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
    { path: '/about', title: 'About',  icon: 'ui-1_bell-53', class: '' },
    { path: '/test', title: 'Test',  icon: 'users_single-02', class: '' },
    { path: '/answers', title: 'Answers',  icon: 'design_bullet-list-67', class: '' },
    { path: '/statistics', title: 'Statistics',  icon: 'text_caps-small', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
