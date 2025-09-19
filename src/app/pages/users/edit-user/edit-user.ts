import { Component, input } from '@angular/core';
import { Getters } from '../../../core/functions/getters';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filterCities, filterProvinces } from '../../../core/models/filters';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-edit-user',
  standalone: false,
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.scss'
})
export class EditUser {
  _id = input.required<string>();
  user: any

  getter = new Getters()

  editForm!: FormGroup

  countries: any[] = [];
  provinces: any[] = [];
  cities: any[] = [];


  profileImage: string | ArrayBuffer | null  = null;

  constructor(
    private userService: UsersService,
    private fb: FormBuilder
  ){
    this.editForm = this.fb.group({
      firstName: ['', Validators.minLength(2)],
      lastName: ['', Validators.minLength(2)],
      profilePhoto: [''],
      address: this.fb.group({
        cityId: [''],
        provinceId: [''],
        countryId: ['']
      })
    })
  }


  async ngOnInit(){
    await this.getCurrentData()
    await this.getCountries()
    this.editForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      address: {
        countryId: this.user.address.countryId._id
      }
    })
  }

  async onSubmit(){
    if(this.editForm.value.address.countryId == ''){
      delete this.editForm.value.address.countryId
    }

    if(this.editForm.value.address.provinceId == ''){
      delete this.editForm.value.address.provinceId
    }

    if(this.editForm.value.address.cityId == ''){
      delete this.editForm.value.address.cityId
    }

    let message = await this.userService.updateUser(this._id(), this.editForm.value)

    console.log(message);
    

  }

  async getCurrentData(){
    try {
      this.user = await this.userService.getUser(this._id())
      console.log(this.user);
      
    } catch (error) {
      console.log(error);
    }
  }

  async getCities(){
    try {
      if(this.editForm.value.address.provinceId != ""){
        console.log("searching city");
        
        const filter = {
          countryId: this.editForm.value.address.countryId,
          provinceId: this.editForm.value.address.provinceId
        }
        this.cities = await this.getter.getCities(filterCities(filter, 0, 10))
      }else{
        this.cities = []
      }
      this.editForm.value.address.cityId = "";
    } catch (error) {
      console.log(error);
    }
  }

  async getProvinces(){
    try {
      if(this.editForm.value.address.countryId != ""){
        const filter = {
          countryId: this.editForm.value.address.countryId
        }
        this.provinces = await this.getter.getProvinces(filterProvinces(filter, 0, 10))
      }else{
        this.provinces = []
      }
      this.editForm.value.address.provinceId = "";
      this.editForm.value.address.cityId = "";

      this.cities = [];
    } catch (error) {
      console.log(error);
    }
  }

  async getCountries(){
    try {

      this.countries = await this.getter.getCountries();
      
      
    } catch (error) {
      console.log(error);
    }
  }

}
