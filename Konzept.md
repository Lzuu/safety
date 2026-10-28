# Konzept

Es soll eine Software für Safety Engineering geschrieben werden.
Tabs bzw. Reiter sollen die Software aufteilen in: Fehlerbaumanalyse, Zuverlässigkeitsdiagramm und Binary Decision Diagram (BDD). Später sollen weitere Reiter hinzukommen, wie Markov, Markov Decision Process etc.
Rechts sollen immer die Komponenten dargestellt werden, die man per Drag-and-Drop in das mittlere Fenster ziehen kann.
Die Komponenten haben Stubs, und an den Stubs kann man Verbindungen anbringen. Die Verbindungen sollen mit der Maus gezogen werden. Durch einen Button soll das Programm den Graphen schön machen. Schön machen bedeutet, dass beim Fehlerbaum der TOP-Knoten oben ist und der Rest (die Eingänge) unten angefügt wird. Beim Zuverlässigkeitsdiagramm ist der Anfang immer links und das Ende rechts — das Diagramm baut sich also von links nach rechts auf, im Gegensatz zum Fehlerbaum. Beim BDD ist der erste Knoten oben, die weiteren Knoten jeweils eine Ebene darunter, bis unten die BDD-Stubs kommen.

Der Benutzer kann ein neues Projekt aufmachen und dann über den Reiter wählen, ob er einen Fehlerbaum, ein Zuverlässigkeitsdiagramm oder ein Binary Decision Diagram aufbauen möchte.

Alle drei Reiter beschreiben dasselbe System, nur in unterschiedlicher Darstellung, und haben dieselbe Funktion: Egal in welchem Reiter man das Modell aufbaut, werden die beiden anderen Darstellungen automatisch daraus abgeleitet und im jeweiligen Reiter angezeigt. Damit das BDD immer als Fehlerbaum und Zuverlässigkeitsdiagramm darstellbar bleibt, ist der BDD-Editor auf monotone Funktionen beschränkt (keine Negation/NOT) — das deckt sich mit den ursprünglichen Aufgabenblättern, die NOT-Gatter ohnehin ausgeschlossen hatten.

Die Synchronisierung zwischen den Reitern passiert beim Wechsel von einem Reiter zu einem anderen, und auch nur dann, wenn das Quell-Diagramm gültig ist. Gültig heißt: vollständig (keine offene Transition fehlt), keine Zyklen, eindeutiger TOP- bzw. Start-/Endpunkt, beim BDD genau zwei beschriftete Terminalausgänge, einheitliche Variablenreihenfolge und geprüfte Monotonie (das Fehlen von NOT-Gattern allein garantiert noch keine Monotonie). Ist das Quell-Diagramm nicht gültig, bleibt im Zielreiter das zuletzt abgeleitete, gültige Diagramm stehen, wird aber als veraltet markiert, und es erscheint eine Meldung, dass keine Umwandlung stattfindet, weil das Diagramm im vorherigen Reiter noch unvollständig bzw. ungültig ist.

Die Umwandlung erhält die logische Funktion und die Komponentenidentitäten, nicht aber das ursprüngliche Layout: Die händische Anordnung aus der Quelldarstellung lässt sich nicht eindeutig in eine andere Darstellung übertragen, jede Darstellung bekommt beim Ableiten ihr eigenes (automatisches) Layout.

# Ziel
Es soll ein intuitives und modernes Design sein, so ähnlich wie mein Linux (Omarchy). Da wird viel mit Keybindings gearbeitet. Die Keybindings sollen aber sehr einfach abrufbar sein.

## Plattform
Die Software soll als Web-App im Browser laufen. Projekte werden lokal als Datei exportiert/importiert; ein Server-Backend ist nicht vorgesehen.

## Berechnungsgrundlagen
- Komponentenausfälle werden als unabhängig angenommen — das gilt zwischen verschiedenen Komponenten. Taucht dieselbe Komponente mehrfach auf (im selben Diagramm oder über mehrere Reiter hinweg), ist sie dieselbe Variable/Identität, nicht mehrere unabhängige Kopien.
- Es wird von konstanten Ausfall- und Reparaturraten ausgegangen (Exponentialverteilung).
- Es gibt eine gemeinsame Missionsdauer *t* für das gesamte Diagramm/Projekt, in Stunden.
- Die Verfügbarkeit wird als stationäre Verfügbarkeit berechnet: A = μ/(λ+μ) bzw. MTTF/(MTTF+MTTR).
- Das SIL wird über die PFDavg-Tabelle aus der IEC 61508 bestimmt, nur für die Betriebsart Low-Demand.

### Systemwahrscheinlichkeiten allgemein

Einfache UND-/ODER-Produktformeln (UND: Produkt, ODER: Komplement des Produkts der Gegenwahrscheinlichkeiten) gelten nur zwischen unabhängigen Teilereignissen. Da dieselbe Komponente laut Komponentenidentität mehrfach im selben Diagramm vorkommen kann, sind die zugehörigen Teilbäume dann nicht mehr unabhängig. Systemwahrscheinlichkeiten (Zuverlässigkeit, Verfügbarkeit, PFDavg) werden daher über das BDD berechnet, da sich dort gemeinsame Komponentenidentitäten durch geteilte Knoten korrekt abbilden lassen; einfache UND-/ODER-Produktformeln kommen nur dort zum Einsatz, wo die kombinierten Teilereignisse tatsächlich unabhängig sind (keine gemeinsam genutzte Komponente in den beteiligten Zweigen).

### System-PFDavg-Berechnung

- Es wird dieselbe eingegebene Ausfallrate λ sowohl für Zuverlässigkeit/Verfügbarkeit als auch als gefährliche unentdeckte Ausfallrate λ_DU für PFDavg verwendet (vereinfachende Modellannahme, keine Trennung nach Ausfallarten).
- Das Prüfintervall τ ist ein einzelner, projektweiter Wert (wie die Missionsdauer *t*), unter der Annahme synchroner, perfekter Prüfungen aller Komponenten.
- PFDavg wird nicht durch Verknüpfen der gemittelten Komponenten-PFDavg-Werte (λ·τ/2) berechnet — das unterschätzt den Wert bei redundanten Strukturen (z. B. ergibt das bei 1oo2 fälschlich τ²/4 statt τ²/3). Stattdessen gilt:
  1. Für jede Komponente wird die momentane Ausfallwahrscheinlichkeit q(t) = λ_DU·t gebildet (t läuft dabei über ein Prüfintervall, 0 ≤ t ≤ τ). q(t) ist eine lineare Näherung, gültig für kleine λ_DU·τ; das Ergebnis wird auf [0,1] begrenzt.
  2. Die momentanen q(t)-Werte werden über das BDD kombiniert (siehe "Systemwahrscheinlichkeiten allgemein" — gemeinsame Komponentenidentitäten beachten, nicht pauschal über Produkte), sodass sich eine momentane System-Ausfallwahrscheinlichkeit q_system(t) ergibt.
  3. Der Mittelungszeitraum ist ein Prüfintervall τ. PFDavg_system = (1/τ) · ∫₀^τ q_system(t) dt.
  - Beispiel 1oo2 (zwei identische, unabhängige Komponenten, Systemausfall nur bei gemeinsamem Ausfall): q_system(t) = (λ_DU·t)², PFDavg_system = λ_DU²·τ²/3.

## Github
Das gesamte Projekt soll öffentlich auf GitHub bei github.com/derkrembold im Repo safety liegen.
Es sollen auch Studenten Zugriff bekommen, aber der Pull Request soll von mir gereviewt werden. Wichtig: Es sind also viele User, die an diesem Projekt mitwirken.

### Spielregeln

Als Ticketsystem reicht GitHub Issues zusammen mit einem GitHub-Projects-Board (Kanban: To do / In Progress / Review / Done) — kein externes Tool nötig.

- Für jede Aufgabe/jedes Feature wird zuerst ein Issue angelegt, bevor jemand mit dem Code anfängt.
- Pro Issue gibt es einen eigenen Branch (z. B. `issue-<nr>-kurzbeschreibung`). Niemand arbeitet direkt auf `main`.
- Pro Issue gibt es einen eigenen Pull Request, möglichst klein und auf das Issue fokussiert.
- Der Pull Request referenziert das Issue (z. B. `Closes #12`) und wird erst nach Review durch mich gemerged.
- Commit-Messages kurz und im Imperativ, bei Bezug auf ein Issue mit Issue-Nummer.
- Jedes Issue/PR ist eindeutig einem Studenten zugeordnet, zur Nachvollziehbarkeit und Bewertung (ähnlich der Namenskonvention aus den Praktikumsaufgaben).

### Review-Prozess

Drei getrennte Rollen:

- **Codex (automatischer Review):** Sobald zu einem Issue ein Pull Request offen ist, schaut sich Codex den PR an und schreibt Kommentare dazu. Codex verändert dabei keinen Code, sondern kommentiert nur.
- **Student bzw. ich (inhaltliche Freigabe):** Die von Codex aufgeworfenen Punkte müssen vom jeweiligen Studenten oder von mir gelöst werden. Die endgültige Merge-Freigabe liegt bei mir.
- **Claude (Merge-Mechanik):** Auf Zuruf an Claude kann der Review-Schritt übersprungen und der Merge-Prozess direkt angestoßen werden — das führt dann Claude aus.


