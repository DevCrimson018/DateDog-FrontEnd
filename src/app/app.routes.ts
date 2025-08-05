import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/general/general-module').then(m => m.GeneralModule)
    },
    {
        path: 'boarding',
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
