// login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
}) 
export class Login { 
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      // Simulación de autenticación
      setTimeout(() => {
        if (this.loginForm.value.usuario.toLowerCase() === 'lucky' && 
            this.loginForm.value.contrasena === 'hueso123') {
          this.router.navigate(['/register']);
        } else {
          this.errorMessage = '¡Guau! Credenciales incorrectas. ¿Olvidaste tu hueso?';
        }
        this.isLoading = false;
      }, 1500);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}