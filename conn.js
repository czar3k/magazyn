const sqlite3 = require('sqlite3').verbose();
 
// open the database
let db = new sqlite3.Database('./DB/magazyn.db3', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the magazyn database.');
});
 
db.serialize(() => {
  db.each(`select ty.name TYP, ar.name ARTYKUL, ar.amount ILOSC, u.name JEDNOSTKA, v.name VAT, ar.price_n CENA_N, ar.price_b CENA_B, ar.price_n*ar.amount WARTOSC_N, ar.price_b*ar.amount WARTOSC_B, ar.code KOD
  from article ar, type ty, unit u, vat v
  where ar.type_id = ty.id and ar.vat_id = v.id and ar.unit_id = u.id`, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row.TYP + "\t" + row.ARTYKUL);
  });
});
 
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});