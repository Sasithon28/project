import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { DataapiService } from '../dataapi.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  Product: any =[]; //ประกาศตัวแปรมารับค่า

  constructor(private link:NavController,
    private actionSheetCtrl: ActionSheetController,
    public dataapi: DataapiService,
    private route:Router,
    private http:HttpClient
    ) { 
      this.loadDataPro();
    }

  gotocal(){
    this.link.navigateBack('/cal')
  }
  gotocalmon (){
    this.link.navigateBack('/calmoney')
  }
  gotopro(){
    this.link.navigateBack('/product')
  }
  gotohis(){
    this.link.navigateBack('/history')
  }
  gotohome(){
    this.link.navigateBack('/home')
  }
  gotoedit(){
    this.link.navigateBack('/edit')
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Actions',
      buttons: [
        {
          text: 'ยืนยัน',
          role: 'destructive',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'ยกเลิก',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }



  public alertButtons = ['ตกลง'];
  public alertInputs = [
    {
      placeholder: 'ชื่อสินค้า',
    },
    {
      placeholder: 'จำนวนสินค้า',
      attributes: {
        maxlength: 50,
      },
    },
    {
      placeholder: 'ราคาสินค้า',
      attributes: {
        maxlength: 50,
      },
    }
  ];


  

  ngOnInit() {
    this.loadDataPro(); //เรียกใช้งาน ฟังก์ชัน การดึงข้อมูล
  }

  loadDataPro(){
    this.dataapi.listProduct().subscribe({
      next: (res:any) => {
        console.log('ดึงได้');
        this.Product = res;
      },
      error: (error: any) => {
        console.log('ดึงไม่ได้',error);
      }
    });
  }

  //ลิ้งค้ไปหน้า edit2
  edit(dataPro: any){
    this.dataapi.data_detailPro = dataPro;
    console.log(dataPro);
    this.link.navigateForward('/edit2')
  }

}
