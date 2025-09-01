import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  // Perras en celo (featured)

    isMenuOpen = false;
  
  // Nueva publicación
  newPost = {
    content: '',
    photos: [] as string[]
  };

    // Menú items
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

  // ... (resto del código anterior de dogsInHeat, lostDogs, posts, etc.)


    toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < Math.min(files.length, 4); i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newPost.photos.push(e.target?.result as string);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }

  removePhoto(index: number): void {
    this.newPost.photos.splice(index, 1);
  }

  createPost(): void {
    if (this.newPost.content.trim() || this.newPost.photos.length > 0) {
      const newPost = {
        dogName: 'Mi Perro', // Esto debería venir del usuario logueado
        breed: 'Mixed Breed',
        content: this.newPost.content,
        //photos: [...this.newPost.photos],
        likes: 0,
        comments: 0,
        time: 'Justo ahora'
      };

      //this.posts.unshift(newPost);
      
      // Reset form
      this.newPost = {
        content: '',
        photos: []
      };
    }
  }


  dogsInHeat = [
    {
      id: 1,
      name: 'Bella',
      breed: 'Labrador',
      age: 3,
      profilePhoto: 'assets/dogs/bella.jpg',
      owner: {
        name: 'María García',
        phone: '+1 809-555-0123',
        photo: 'assets/users/maria.jpg'
      },
      requiredBreed: 'Labrador o Golden Retriever',
      description: 'Bella está buscando un compañero saludable y de buena genética',
      photos: ['assets/dogs/bella1.jpg', 'assets/dogs/bella2.jpg'],
      likes: 24,
      comments: 8,
      isInHeat: true
    },
    {
      id: 2,
      name: 'Luna',
      breed: 'Husky',
      age: 2,
      profilePhoto: 'assets/dogs/luna.jpg',
      owner: {
        name: 'Carlos Rodríguez',
        phone: '+1 809-555-0456',
        photo: 'assets/users/carlos.jpg'
      },
      requiredBreed: 'Husky o Malamute',
      description: 'Luna busca un macho puro para camada de invierno',
      photos: ['assets/dogs/luna1.jpg', 'assets/dogs/luna2.jpg'],
      likes: 18,
      comments: 5,
      isInHeat: true
    }
  ];

  // Perros perdidos
  lostDogs = [
    {
      name: 'Max',
      breed: 'Golden Retriever',
      lastSeen: 'Santo Domingo Este',
      date: 'Hace 2 días',
      photo: 'assets/dogs/max-lost.jpg',
      contact: '+1 809-555-0789'
    },
    {
      name: 'Rocky',
      breed: 'Bulldog',
      lastSeen: 'Zona Colonial',
      date: 'Hace 1 día',
      photo: 'assets/dogs/rocky-lost.jpg',
      contact: '+1 809-555-0321'
    }
  ];

  // Posts normales
  posts = [
    {
      dogName: 'Thor',
      breed: 'Pastor Alemán',
      content: '¡Thor cumplió 2 años hoy! 🎉🐕',
      photo: 'assets/dogs/thor.jpg',
      likes: 45,
      comments: 12,
      time: 'Hace 3 horas'
    },
    {
      dogName: 'Coco',
      breed: 'Poodle',
      content: 'Paseo matutino en el parque Mirador Sur 🏞️',
      photo: 'assets/dogs/coco.jpg',
      likes: 32,
      comments: 7,
      time: 'Hace 5 horas'
    }
  ];

  selectedDog: any = null;

  showDogDetails(dog: any): void {
    this.selectedDog = dog;
  }

  closeDetails(): void {
    this.selectedDog = null;
  }

  likePost(post: any): void {
    post.likes++;
  }

  contactOwner(phone: string): void {
    console.log('Contactando al:', phone);
    // Aquí iría la lógica para contactar
  }
}
