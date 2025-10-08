import { Component, inject } from '@angular/core';
import { DogsService } from '../../../core/services/dogs.service';
import { filterDogs } from '../../../core/models/filters';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  nearbyDogs: any[] = [];
  isMenuOpen = false;

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

  // ... el resto de tu código permanece igual
  showMapView = false;
  selectedDog: any = null;
  loading: boolean = true;
  
  private dogService = inject(DogsService);

  menuItems = [
    { icon: '🏠', label: 'Inicio', active: true },
    { icon: '👤', label: 'Mi Perfil' },
    { icon: '✏️', label: 'Editar Perfil' },
    { icon: '➕', label: 'Crear Perro' },
    { icon: '🔍', label: 'Buscar Perros' },
    { icon: '📇', label: 'Buscar Dueños' },
    { icon: '⭐', label: 'Favoritos' },
    { icon: '🕓', label: 'Historial' },
    { icon: '🚪', label: 'Cerrar Sesión' }
  ];

  async ngOnInit() {
    await this.getNearByDogs();
  }

  async getNearByDogs() {
    try {
      this.loading = true;
      this.nearbyDogs = await this.dogService.nearByDogs(filterDogs({}, 0, 10));
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  }
}