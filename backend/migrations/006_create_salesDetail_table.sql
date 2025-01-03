CREATE TABLE IF NOT EXISTS salesDetail (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    quantity INTEGER NOT NULL,
    subTotal REAL NOT NULL,
    sku INTEGER NOT NULL UNIQUE,
    idSale INTEGER NOT NULL UNIQUE,

    dateCreated TEXT NOT NULL DEFAULT (DATETIME('now')),
    dateUpdated TEXT,
    dateDeleted TEXT,

    FOREIGN KEY (sku) REFERENCES stockOfProducts(sku),
    FOREIGN KEY (idSale) REFERENCES sales(id) ON DELETE CASCADE
);

CREATE TRIGGER IF NOT EXISTS update_saleDetail_date
AFTER UPDATE ON salesDetail
FOR EACH ROW
BEGIN
  UPDATE salesDetail SET dateUpdated = DATETIME('now') WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS soft_delete_saleDetail
BEFORE DELETE ON salesDetail
FOR EACH ROW
WHEN OLD.dateDeleted IS NULL -- Si ya marcado, permite el DELETE físico
BEGIN
  UPDATE salesDetail SET dateDeleted = DATETIME('now') WHERE id = OLD.id;
  SELECT RAISE(IGNORE); -- Evita el DELETE físico la primera vez
END;