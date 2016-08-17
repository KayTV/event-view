import { Routes }          from '@angular/router';

import { SessionListComponent } from './session-list/session-list.component';
import { SessionComponent } from './session/session.component';
import { SessionsComponent } from './sessions.component';
import { CanDeactivateGuard, CanActivateAuthGuard } from '../routing';

export const SessionsRoutes: Routes = [
  {
    path: 'sessions',
    component: SessionsComponent,
    // canActivate: [CanActivateAuthGuard],
    children: [
      {
        path: '',
        component: SessionListComponent,
        canActivate: [CanActivateAuthGuard]
      },
      {
        path: ':id',
        component: SessionComponent,
        canActivate: [CanActivateAuthGuard],
        canDeactivate: [CanDeactivateGuard]
      },
    ]
  },
];
