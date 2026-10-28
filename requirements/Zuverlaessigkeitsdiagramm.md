# Zuverlässigkeitsdiagramm

## Einleitung

Ein Zuverlässigkeitsdiagramm ist eine Methode zur Darstellung von Komponenten mit unterschiedlichen Fehlerarten. Dabei wird einer Komponente, bzw. die Fehlerart der Komponente, einem Block zugewiesen. Dieser Block hat dann eine Zuverlässigkeitswahrscheinlichkeit, bzw. eine Ausfallswahrscheinlichkeit. Durch Verknüpfung der Blöcke (Parallelstruktur, Serienstruktur) lassen sich beliebige Systeme mit und ohne Redundanzen modellieren.

## Aufgabe

Es soll ein Zuverlässigkeitsdiagramm mit Blöcken aufgebaut werden. Von der rechten Seite können die Blöcke in das mittlere Feld hineingezogen werden. Die Blöcke haben links und rechts Stubs. Dadurch können mehrere Blöcke mit der Maus über Transitionen verbunden werden. Die Blöcke können angeklickt werden. Die Ausfallraten und Zeitinformation (Exponentialfunktion) für die Zuverlässigkeitswahrscheinlichkeit sollen eingegeben werden; alternativ sollen Ausfallrate und Reparaturrate für die Verfügbarkeit eingegeben werden können. Wie das passiert, ist noch nicht klar. Es ist wichtig, dass es eine intuitive und moderne Eingabe ist. Popups könnten eine Option sein, es sollten aber auch andere Möglichkeiten evaluiert werden.

a)
Es soll aus dem Zuverlässigkeitsdiagramm die Zuverlässigkeitswahrscheinlichkeit ermittelt werden. Diese wird im unteren Bereich dargestellt.

b)
Alternativ soll durch Ausfallrate und Reparaturrate die Verfügbarkeit berechnet werden. Diese wird ebenfalls im unteren Bereich dargestellt.

c)
Aus dem Zuverlässigkeitsdiagramm soll das System-PFDavg ermittelt werden (Berechnung siehe Konzept.md, Abschnitt „System-PFDavg-Berechnung" — keine einfache Verknüpfung der Komponenten-PFDavg-Mittelwerte, insbesondere bei Parallelstrukturen/Redundanz). Über die PFDavg-Tabelle der IEC 61508 soll daraus das SIL ermittelt werden.

d) Aus dem Zuverlässigkeitsdiagramm sollen automatisch der Fehlerbaum und das BDD erzeugt werden, jeweils sichtbar im zugehörigen Reiter.




