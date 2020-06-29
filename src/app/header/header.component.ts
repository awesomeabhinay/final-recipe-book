import { Component, OnInit} from '@angular/core';
import { Response } from '@angular/http';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private dsService: DataStorageService,
              public authService: AuthService) { }

  ngOnInit(): void {
  }

  onSavaData(){
    this.dsService.storeRecipes().subscribe(
      (response: Response) => {
        console.log(response);
      }
    );

    this.dsService.storeShoppingList().subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
  }

  onLogout(){
    this.authService.logout();
  }
  onGetData(){
    this.dsService.fetchRecipes();
  }
}
