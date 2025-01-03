CREATE TABLE IF NOT EXISTS offers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    idProduct INTEGER NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    value REAL NOT NULL,
    dateOfActivation TEXT,
    dateOfExpiration TEXT,

    dateCreated TEXT NOT NULL DEFAULT (DATETIME('now')),
    dateUpdated TEXT,
    dateDeleted TEXT,

    FOREIGN KEY (idProduct) REFERENCES products(id)
);

CREATE TRIGGER IF NOT EXISTS update_offer_date
AFTER UPDATE ON offers
FOR EACH ROW
BEGIN
  UPDATE offers SET dateUpdated = DATETIME('now') WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS soft_delete_offer
BEFORE DELETE ON offers
FOR EACH ROW
WHEN OLD.dateDeleted IS NULL -- Si ya marcado, permite el DELETE físico
BEGIN
  UPDATE offers SET dateDeleted = DATETIME('now') WHERE id = OLD.id;
  SELECT RAISE(IGNORE); -- Evita el DELETE físico la primera vez
END;