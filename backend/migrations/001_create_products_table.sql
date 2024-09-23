CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    idSeller INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL,

    dateCreated TEXT NOT NULL DEFAULT (DATETIME('now')),
    dateUpdated TEXT,
    dateDeleted TEXT,

    FOREIGN KEY (idSeller) REFERENCES sellers(id) ON DELETE CASCADE
);

CREATE TRIGGER IF NOT EXISTS update_product_date
AFTER UPDATE ON products
FOR EACH ROW
BEGIN
  UPDATE products SET dateUpdated = DATETIME('now') WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS soft_delete_product
BEFORE DELETE ON products
FOR EACH ROW
WHEN OLD.dateDeleted IS NULL -- Si ya marcado, permite el DELETE físico
BEGIN
  UPDATE products SET dateDeleted = DATETIME('now') WHERE id = OLD.id;
  SELECT RAISE(IGNORE); -- Evita el DELETE físico la primera vez
END;