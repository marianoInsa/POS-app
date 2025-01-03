CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    total REAL NOT NULL,
    idClient INTEGER NOT NULL UNIQUE,

    dateCreated TEXT NOT NULL DEFAULT (DATETIME('now')),
    dateUpdated TEXT,
    dateDeleted TEXT,

    FOREIGN KEY (idClient) REFERENCES clients(id) ON DELETE CASCADE
);

CREATE TRIGGER IF NOT EXISTS update_sale_date
AFTER UPDATE ON sales
FOR EACH ROW
BEGIN
  UPDATE sales SET dateUpdated = DATETIME('now') WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS soft_delete_sale
BEFORE DELETE ON sales
FOR EACH ROW
WHEN OLD.dateDeleted IS NULL -- Si ya marcado, permite el DELETE físico
BEGIN
  UPDATE sales SET dateDeleted = DATETIME('now') WHERE id = OLD.id;
  SELECT RAISE(IGNORE); -- Evita el DELETE físico la primera vez
END;