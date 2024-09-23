CREATE TABLE IF NOT EXISTS stockOfProducts (
    sku INTEGER PRIMARY KEY AUTOINCREMENT,
    idProduct INTEGER NOT NULL,

    dateCreated TEXT NOT NULL DEFAULT (DATETIME('now')),
    dateUpdated TEXT,
    dateDeleted TEXT,

    FOREIGN KEY (idProduct) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TRIGGER IF NOT EXISTS update_stockOfProduct_date
AFTER UPDATE ON stockOfProducts
FOR EACH ROW
BEGIN
  UPDATE stockOfProducts SET dateUpdated = DATETIME('now') WHERE sku = NEW.sku;
END;

CREATE TRIGGER IF NOT EXISTS soft_delete_stockOfProduct
BEFORE DELETE ON stockOfProducts
FOR EACH ROW
WHEN OLD.dateDeleted IS NULL -- Si ya marcado, permite el DELETE físico
BEGIN
  UPDATE stockOfProducts SET dateDeleted = DATETIME('now') WHERE sku = OLD.sku;
  SELECT RAISE(IGNORE); -- Evita el DELETE físico la primera vez
END;