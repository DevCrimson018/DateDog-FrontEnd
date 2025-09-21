import { Routes } from '@angular/router';
import { loggedGuard } from './core/guards/logged-guard-guard';
import { adminGuard } from './core/guards/admin-guard-guard';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/general/general-module').then(m => m.GeneralModule)
    }, 
    {
        path: 'credentials',
        loadChildren: () => import('./pages/credentials/credentials-module').then(m => m.CredentialsModule)
    },
    {
        path: 'dogs',
        loadChildren: () => import('./pages/dogs/dogs-module').then(m => m.DogsModule)
    },
    {
        path: 'users',
        loadChildren: () => import('./pages/users/users-module').then(m => m.UsersModule)
    }
];
