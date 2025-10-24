import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isMenuOpen = false;
  menuItems = [
    { icon: '🏠', label: 'Inicio', route: '/' },
    { icon: '👤', label: 'Mi Perfil', route: '/users/user-details/myself' },
    { icon: '✏️', label: 'Editar Perfil', route: '/users/edit-user/myself' },
    { icon: '➕', label: 'Crear Perro', route: '/dogs/create-dog' },
    { icon: '🔍', label: 'Buscar Perros', route: '/dogs/filter-dogs' },
    { icon: '📇', label: 'Buscar Dueños', route: '/users/filter-users' }
    // { icon: '⭐', label: 'Favoritos', route: '' },
    // { icon: '🕓', label: 'Historial', route: '' },
    //{ icon: '🚪', label: 'Cerrar Sesión', route: '' }
  ];  

  constructor(
    private router: Router,
    private userService: UsersService
  ){

  }

  cerrarSesion(){
    try {
      this.userService.endSession().then(res => {
        if(res.message){
          this.router.navigate(['/credentials']);
        }
      });
    } catch (error) {
      console.log(error);
      alert('Error al cerrar session')
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    // Opcional: prevenir scroll del body cuando el menú está abierto
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  // Cierra el menú cuando se navega (opcional)
  closeMenu(): void {
    this.isMenuOpen = false;
    document.body.style.overflow = '';
  }


  
}
