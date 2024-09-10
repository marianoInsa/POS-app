CREATE TABLE IF NOT EXISTS clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  registerDate TEXT NOT NULL DEFAULT (DATETIME('now')),
  dateUpdated TEXT,
  dateDeleted TEXT
);

CREATE TRIGGER IF NOT EXISTS update_client_date
AFTER UPDATE ON clients
FOR EACH ROW
BEGIN
  UPDATE clients SET dateUpdated = DATETIME('now') WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS soft_delete_client
BEFORE DELETE ON clients
FOR EACH ROW
WHEN OLD.dateDeleted IS NULL -- Si ya marcado, permite el DELETE físico
BEGIN
  UPDATE clients SET dateDeleted = DATETIME('now') WHERE id = OLD.id;
  SELECT RAISE(IGNORE); -- Evita el DELETE físico la primera vez
END;