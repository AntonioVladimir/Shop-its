import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this._listSerice.getItems().subscribe((data) => {
      this.items = [];
      data.forEach((e: any) => {
        this.items.push({
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        });
      });
      console.log(this.items);
    });
  }

  deleteItem(id: string) {
    this._listSerice
      .deleteItem(id)
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
