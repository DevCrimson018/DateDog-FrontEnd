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

  loading: boolean = false
  loadingComboBox:boolean = false

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
    this.loading = true
    await this.getCurrentData()
    this.editForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      profilePhoto: this.user.profilePhoto,
      address: {
        countryId: this.user.address.countryId._id,
        provinceId: this.user.address.provinceId._id,
        cityId: this.user.address.cityId._id
      }
    })
    console.log(this.editForm.value);
    
    
    await this.getCountries()
    await this.getProvinces()
    this.editForm.patchValue({
      address: {
        countryId: this.user.address.countryId._id,
        provinceId: this.user.address.provinceId._id,
        cityId: this.user.address.cityId._id
      }
    });
    await this.getCities()
    this.editForm.patchValue({
      address: {
        countryId: this.user.address.countryId._id,
        provinceId: this.user.address.provinceId._id,
        cityId: this.user.address.cityId._id
      }
    });

    this.loading = false
    
  }

  async onSubmit(){
    this.loadingComboBox = true
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

    this.loadingComboBox = false

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

      this.loadingComboBox = true

      console.log("City");

      console.log(this.editForm.value);
      
      
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

      this.loadingComboBox = false

    } catch (error) {
      console.log(error);
    }
  }

  async getProvinces(){
    try {

      this.loadingComboBox = true

      if(this.editForm.value.address.countryId != ""){
        console.log("Searching Province");
        
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

      this.loadingComboBox = false

    } catch (error) {
      console.log(error);
    }
  }

  async getCountries(){
    try {

      this.loadingComboBox = true

      this.countries = await this.getter.getCountries();
      
      this.loadingComboBox = false
      
    } catch (error) {
      console.log(error);
    }
  }

}
