export interface CatalogueItem {
  id:    number;
  name:  string;
  price: string;
}

export interface PurchaseRecord {
  id:        string | number;
  itemId:    string;
  itemName:  string;
  itemPrice: string;
  quantity:  string;
}

export interface ContactPayload {
  firstName: string;
  lastName:  string;
  address1:  string;
  address2:  string;
  address3:  string;
  address4:  string;
  pet:       string;
  agree:     boolean;
}

export interface ContactRecord extends ContactPayload {
  id: string | number;
}

export interface JournalEntry {
  id:          number;
  date:        string;
  description: string;
  debit:       string;
  credit:      string;
  amount:      number;
}