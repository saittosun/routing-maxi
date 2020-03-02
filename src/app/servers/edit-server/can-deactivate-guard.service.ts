import { Observable } from 'rxjs';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

//  an interface simply is a contract which can be imported by some other class let's say which forces this class to provide some logic.
export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

// tslint:disable-next-line:max-line-length
// it will wrap an interface which forces some component or some class to implement the canDeactivate method. the set up which will make sure that we later can easily connect a component to our CanDeactivateGuard here.
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  // tslint:disable-next-line:max-line-length
  // canDeactivate method which will be called by the Angular router once we try to leave a route. this component needs to be of type CanComponentDeactivate, which means it needs to be a component which has this interface here implemented,
  canDeactivate(component: CanComponentDeactivate,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // tslint:disable-next-line:max-line-length
    // I now want to call canDeactivate on the component we're currently on and this is why I need to implement this interface in this component, why I created this interface in the first place because now, the Angular router can execute canDeactivate in our service and can rely on the fact that the component we're currently on has the canDeactivate method too because this is what we will actually implement the logic checking whether we are allowed to leave or not because we need this connection between our guard and the component.
    return component.canDeactivate();
  }
}
