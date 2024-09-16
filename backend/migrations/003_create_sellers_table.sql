CREATE TABLE IF NOT EXISTS sellers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  registerDate TEXT NOT NULL DEFAULT (DATETIME('now')),
  storeInfo TEXT NOT NULL,
  dateUpdated TEXT,
  dateDeleted TEXT
);

CREATE TRIGGER IF NOT EXISTS update_seller_date
AFTER UPDATE ON sellers
FOR EACH ROW
BEGIN
  UPDATE sellers SET dateUpdated = DATETIME('now') WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS soft_delete_seller
BEFORE DELETE ON sellers
FOR EACH ROW
WHEN OLD.dateDeleted IS NULL -- Si ya marcado, permite el DELETE físico
BEGIN
  UPDATE sellers SET dateDeleted = DATETIME('now') WHERE id = OLD.id;
  SELECT RAISE(IGNORE); -- Evita el DELETE físico la primera vez
END;