import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { animate, animation, state, style, transition, trigger, useAnimation } from '@angular/animations';

const menuAnimation = animation([
  animate("200ms ease-out")
]);

export const menuTrigger = trigger("menuTrigger", [
  state("open", style({
    transform: "rotate(45deg)"
  })),
  state("close", style({
    transform: "rotate(0)"
  })),
  transition("open <=> close", [
    useAnimation(menuAnimation)
  ])
]);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [menuTrigger]
})
export class AppComponent {

  links = [
    {
      name: "Blackjack",
      href: "/blackjack"
    }
  ];

  drawer!: MatDrawer;
  menuOpened = false;

  constructor(router: Router) {
    router.navigateByUrl("/blackjack");
  }

  public toggleMenu(sideNav: MatDrawer): void {
    sideNav.toggle();
    if (!this.drawer) {
      this.drawer = sideNav;
      this.drawer.openedStart.subscribe(() => {
        this.menuOpened = true;
      });
      this.drawer.closedStart.subscribe(() => {
        this.menuOpened = false;
      })
    }
  }
}
