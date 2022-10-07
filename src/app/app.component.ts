import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  navItems: { name: string; link: string }[] = [
    { name: 'Planning', link: '/planning' },
    { name: 'Employees', link: '/employee' },
  ];
}
