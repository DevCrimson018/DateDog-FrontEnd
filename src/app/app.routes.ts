import { Routes } from '@angular/router';
import { loggedGuard } from './core/guards/logged-guard-guard';
import { adminGuard } from './core/guards/admin-guard-guard';
import { notLoggedGuardGuard } from './core/guards/not-logged-guard-guard';

export const routes: Routes = [
    {
        path: '',
        canActivate: [loggedGuard],
        loadChildren: () => import('./pages/general/general-module').then(m => m.GeneralModule)
    }, 
    {
        path: 'credentials',
        canActivate: [notLoggedGuardGuard],
        loadChildren: () => import('./pages/credentials/credentials-module').then(m => m.CredentialsModule)
    },
    {
        path: 'dogs',
        canActivate: [loggedGuard],
        loadChildren: () => import('./pages/dogs/dogs-module').then(m => m.DogsModule)
    },
    {
        path: 'users',
        canActivate: [loggedGuard],
        loadChildren: () => import('./pages/users/users-module').then(m => m.UsersModule)
    }
];
