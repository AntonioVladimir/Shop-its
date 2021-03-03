import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ListService } from 'src/app/service/list.service';

@Component({
  selector: 'app-list-shop',
  templateUrl: './list-shop.component.html',
  styleUrls: ['./list-shop.component.css'],
})
export class ListShopComponent implements OnInit {
  items: any[] = [];

  constructor(private _listSerice: ListService,
    private toastr: ToastrService,
    private rutaActiva: ActivatedRoute) {}
  
    uid!:string;

  ngOnInit(): void {
    this.uid = this.rutaActiva.snapshot.params.uid;
    this.getItems();
  }

  getItems() {
    // this._listSerice.getItems(this.uid).subscribe((data) => {
    //   this.items = [];
    //   data.forEach((e: any) => {
    //     this.items.push({
    //       id: e.payload.doc.id,
    //       ...e.payload.doc.data(),
    //     });
    //   });
    //   console.log(this.items);
    // });
    this._listSerice.getItems(this.uid).subscribe(data =>{
      this.items = []
      data.forEach((e: any) => {
        const claseses: any = e.payload.val();
        //this.classs.keys = claseses.key;
        this.items.push(claseses);
        //console.log(c);
        //console.log(this.uid)
      })
      //console.log('clase',this.classs)
    })
  }

  deleteItem(name: string) {
    this._listSerice
      .deleteItem(name,this.uid)
      .then(() => {
        console.log('eliminado');
        this.toastr.success("The item has been deleted successfully.", "Item Deleted",{
          positionClass: 'toast-bottom-right'
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
