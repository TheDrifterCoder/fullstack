import { AfterViewInit, ViewChild, Component, OnInit, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { GlobalsService } from 'src/app/config/globals.service';
import { SelectionModel } from '@angular/cdk/collections';

import { MatDialog } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/catalogs/users.service';
import { Users } from 'src/app/interfaces/catalogs/users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'lastname', 'login_user', 'email'];
  search  = "";
  Users = [];
  datatoDelete: any;
  selected = [];
  selection = new SelectionModel<Users>(false, []);
  dataSource = new MatTableDataSource<Users>([]);
  public dataResponse: any;
  nPages = this.globals.paginator;
  tempData: any = [];
  showNotify: boolean = false;
  notify: String = "";


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  result: string = '';

  constructor(public globals: GlobalsService, private userService: UsersService, public dialog: MatDialog) { }

  ngOnInit(): void {    
    this.getUsers();
  }

  getUsers() {
    this.userService.usersAll().subscribe(
      data => {
        this.dataResponse = data;
        this.dataSource.data = this.dataResponse.data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel = "Usuarios por página";
        this.dataSource.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => { if (length == 0 || pageSize == 0) { return `0 of ${length}`; } length = Math.max(length, 0); const startIndex = page * pageSize; const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize; return `${startIndex + 1} - ${endIndex} de ${length}`; }
      }
    );
  }

  buscarDatos(){
    var filter = this.search;

    if(filter.trim() != ''){
      this.userService.search(filter).subscribe(
        data => {
          this.dataResponse = data;
          this.dataSource.data = this.dataResponse.data;
        }
      )
    } else {
      this.getUsers();
    }
  }
}
