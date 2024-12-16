import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registroForm = this.fb.group({
      inputNombre: ['', Validators.required],
      inputApellido: ['', Validators.required],
      inputEmail: ['', [Validators.required, Validators.email]],
      inputPassword: ['', [Validators.required, Validators.minLength(6), this.passwordPatternValidator]],
      inputRPassword: ['', Validators.required],
      inputUsername: ['', Validators.required],
      inputFechaNacimiento: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    const pass = group.get('inputPassword')?.value;
    const confirmPass = group.get('inputRPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  passwordPatternValidator(control: FormControl) {
    const pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    return pattern.test(control.value) ? null : { patternNotMatched: true };
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const userData = {
        username: this.registroForm.get('inputUsername')?.value,
        nombre: this.registroForm.get('inputNombre')?.value,
        apellido: this.registroForm.get('inputApellido')?.value,
        fechaNacimiento: this.registroForm.get('inputFechaNacimiento')?.value,
        correo: this.registroForm.get('inputEmail')?.value,
        password: this.registroForm.get('inputPassword')?.value,
      };
      this.http.post('http://localhost:8080/usuarios/registro', userData)
        .subscribe(
          response => {
            console.log('Registro exitoso', response);
            this.router.navigate(['/home']);
            alert('Registro exitoso');
          },
          error => {
            // Mostrar mensaje de error

            alert('Error en el registro: ' + (error.error || 'El servidor no responde, intentelo más tarde' ));
            console.error('Error en el registro', error);
          }
        );
    } else {
      console.error('Formulario no es válido');
    }
  }
}
