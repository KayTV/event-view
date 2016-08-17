import { Component } from '@angular/core';

import { SessionService } from './shared';

@Component({
  // selector: 'ev-sessions',
  template: `<router-outlet></router-outlet>`,
  providers: [SessionService]
})
export class SessionsComponent  {}
