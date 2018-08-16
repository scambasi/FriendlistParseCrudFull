import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FriendService } from '../../service/friendService';
import { Friend } from '../../model/friend';
import Parse from 'parse';
import { Observable } from 'rxjs/Observable'
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage implements OnInit {

  friends:Friend[]=[];
  kullaniciId:string;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,private alertcontroller:AlertController,
     public friendService:FriendService,private toastCtrl:ToastController,
     private localStorage:Storage) {
      console.log('constructor:ListPage');
      this.localStorage.get('kullaniciId').then((value)=>{
        this.kullaniciId=value;
        this.getFriends(null);
       });
     
  }
  ngOnInit()
  {
    console.log('ngOnInit:ListPage');
       
  }
  ionViewWillEnter()
  {
    console.log('ionViewWillEnter:ListPage');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad:ListPage');
    
    }
    // this.localStorage.get('kullaniciId').then((value)=>{
    //   this.kullaniciId=value;
    //   this.getFriends(null);
    //  });
  showAddDialog()
  {
this.alertcontroller.create(
  {
    title:"Arkadaş ekle",
    message:"Arkadaşın bilgilerini gir",
    inputs:[
      {
        name:"adi",
        placeholder:"adınız"
      },
      {
        name:"email",
        placeholder:"mailiniz"
      },
      {
        name:"ceptelefon",
        placeholder:"cep telefonu"
      }

    ],
    buttons:[
      {
        text:"iptal"

      },
      {
        text:"kaydet",
        handler:data=>
        { console.log(data);
          this.friendService. addFriend(data.adi,data.email,data.ceptelefon,"http://lorempixel.com/32/32");
          this.getFriends(null);
          const toast=this.toastCtrl.create({
            message:'Yeni Arkadaş Eklendi',
            duration:2000,
            position:'bottom'
          });
          toast.present();
        }
      }
    ]

  }
).present();
  }
getFriends(refresher)
{
  this.friends= this.friendService.getFriends();
  if(refresher!=null)
  {
    setTimeout(() => {
      console.log('ion-Refresher Çalıştı');
      refresher.complete();
    }, 1000);
  }

}
editFriend(friend)
{
  this.alertcontroller.create({
    title:"Arkadaş Güncelle",
    message:"Arkadaş bilgilerini güncelle",
    inputs:[{
      name:"adi",
      value:friend.adi,
      placeholder:"adınız"
    },
    {
      name:"email",
      value:friend.email,
      placeholder:"mailiniz"
    },
    {
      name:"ceptelefon",
      value:friend.ceptelefon,
      placeholder:"cep telefonu"
    }],
    buttons:[{
      text:"iptal"
    },
    {
      text:"kaydet",
      handler:data=>
      {

        this.friendService.updateFriend(friend.id, data.adi,
          data.email,data.ceptelefon);
          this.getFriends(null);

      }
    }]
  }).present();

}
deleteFriend(friend)
{
  this.alertcontroller.create({
    title:"Arkadaş Silme",
    message:"Eminmisiniz?",
    buttons:[{
      text:"iptal"
    },
    {
      text:"Ok",
      handler:data=>
      {
        this.friendService.deleteFriend(friend.id);
        this.getFriends(null);
      }
    }]
  }).present();
}
logOut()
{
  this.localStorage.remove('kullanici').then(()=>
  {
    this.navCtrl.setRoot(LoginPage); 
  });
}
 

}
