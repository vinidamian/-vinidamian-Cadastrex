import {Component, OnInit} from '@angular/core';
import {ClientEntity} from '../Entity/ClientEntity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public searchText: string;
  public defaultPicture: 'assets/img/profile-icon.png';
  public currentIndex: number;
  public hasItemsVar: boolean;
  public clientes: ClientEntity[] = [];
  public cliente: ClientEntity;

  constructor() {
    this.cliente = new ClientEntity();
  }

  ngOnInit(): void {
    console.log('INIT');
    const cache = localStorage.getItem('CLIENTES');
    try {
      if (cache) {
        this.clientes = JSON.parse(cache);
        this.hasItemsVar = true;
      } else {
        this.clientes = [];
        this.hasItemsVar = false;
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  onFilter(searchText): void {
    const have = this.clientes.filter(searchText);
    if (!have) {
      this.hasItemsVar = false;
    }
  }

  hasItems(): boolean {
    return this.clientes.length > 0 || false;
  }

  onSave(): void {
    console.log(this.cliente);
    // Validate
    if (!this.cliente.name) {
      alert('O campo nome é obrigatório');
    } else if (!this.cliente.email) {
      alert('O campo email é obrigatório');
    } else if (this.cliente.email && this.cliente.name && !this.cliente.id) {
      // Setting id
      this.cliente.id = this.clientes.length + 1;
      // Default chart for profile picture
      if (!this.cliente.picture) {
        this.cliente.picture = this.defaultPicture;
      }
      // Adding to the main list
      this.clientes.push(this.cliente);
      // Set in cache
      localStorage.setItem('CLIENTES', JSON.stringify(this.clientes));
      // Clearing
      this.clearClient();
    }
  }

  onEdit(item: ClientEntity, index: number): void {
    this.cliente = item;
    this.currentIndex = index;
    localStorage.setItem('CLIENTES', JSON.stringify(this.clientes));
  }

  onRemove(index: number): void {
    this.clientes.splice(index, 1);
    localStorage.setItem('CLIENTES', JSON.stringify(this.clientes));
  }

  onUpdate(): void {
    if (this.currentIndex !== 0) {
      let i = 0;
      for (let item of this.clientes) {
        if (i === this.currentIndex) {
          item = this.cliente;
        }
      }
      i++;
    }
  }

  clearClient(isNew?: boolean): void {
    this.cliente = new ClientEntity();
    if (isNew) {
      document.getElementById('name').focus();
    }
  }
}
