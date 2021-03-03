import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { ListService } from 'src/app/service/list.service';

@Component({
  selector: 'app-create-shop-list',
  templateUrl: './create-shop-list.component.html',
  styleUrls: ['./create-shop-list.component.css'],
})
export class CreateShopListComponent implements OnInit {
  addItem: FormGroup;
  add = false;
  loading = false;
  id: string | null;
  title = 'Add new Item';
  public user$: Observable<any> = this.authSvc.afAuth.user;

  constructor(
    private builder: FormBuilder,
    private _listSerice: ListService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute,
    public afAuth: AngularFireAuth,
    private authSvc: AuthService,
    private rutaActiva: ActivatedRoute
  ) {
    this.addItem = this.builder.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  uid!:string;

  ngOnInit(): void {
    this.uid = this.rutaActiva.snapshot.params.uid;
    this.editItem();
  }

  addEditItem() {
    
    this.add = true;
    if (this.addItem.invalid) {
      return;
    }
    if (this.id === null) {
      this.addNewItem();
    } else {
      this.editTheItem(this.id);
    }
  }
  
  addNewItem() {
    const item: any = {
      name: this.addItem.value.name,
      quantity: this.addItem.value.quantity,
      creationDate: new Date(),
      updateDate: new Date(),
      user: this.uid
    };
    this.loading = true;
    this._listSerice
      .addItem(item, this.uid)
      .then(() => {
        this.toastr.success(
          'The item was successfully added to the list.',
          'Successfully added',
          {
            positionClass: 'toast-bottom-right',
          }
        );
        this.loading = false;
        this.router.navigate(['/shop-list']);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(item);
  }

  editTheItem(id:string){
    const item: any = {
      name: this.addItem.value.name,
      quantity: this.addItem.value.quantity,
      updateDate: new Date(),
      user: this.uid
    };
    this.loading=true;
    this._listSerice.updateItem(id, item).then(()=>{
      this.loading=false;
      this.toastr.info('The Item was modified correctly.', 'Successfully modified',{
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/shop-list']);
    })
  }

  editItem() {
    this.title = 'Edit Item';
    
    if (this.id !== null) {
      
      this.loading = true;
      this._listSerice.getOneItem(this.id,this.uid).subscribe(data => {
        this.loading = false;
        this.addItem.setValue({
          name: data.payload.data()['name'],
          quantity: data.payload.data()['quantity'],
        });
      });
    }
  }
}
