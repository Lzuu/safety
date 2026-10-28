# Fehlerbaumanalyse

## Einleitung

Der Fehlerbaum ist ein Werkzeug zur logischen Verknüpfung von Komponenten und Teilsystemen. Unter anderem will man die Kombination der Ausfälle ermitteln, die zu einem unerwünschten Ergebnis führen. Hier ist insbesondere die Bestimmung der Minimal Cut Sets interessant und Teil dieser Praktikumsaufgabe. Der Fehlerbaum besteht aus einer Menge von Verknüpfungselementen. Bei dieser Aufgabe sollen aber nur Standardeingang, Oder-Verknüpfung und Und-Verknüpfung behandelt werden.

## Aufgabe

Es soll mit Hilfe von den Verknüpfungselementen Standardeingang, Oder-Verknüpfung und Und-Verknüpfung ein beliebiger Fehlerbaum aufgebaut werden. Dafür sollen die drei Elemente als Klassen definiert werden. Die Klassen sollen Listen (`nodes`) als Attribute enthalten, die Instanzen von weiteren Verknüpfungselementen aufnehmen können.

Die Verknüpfungselemente sollen von einer Sidebar herangezogen werden und in die Mitte des Bildschirms platziert werden. Die Verknüpfungselemente sollen eine Art von Stub erhalten, die es ermöglichen, Verbindungen zwischen den Verknüpfungselementen aufzubauen.

a)
Wenn der Baum fertiggestellt ist, dann kann durch ein Icon oben an der Leiste automatisch die Minimal Cut Sets am unteren Ende angezeigt werden.

b) 
Die Eingänge können durch Ausfallraten und Zeitinformation (Exponentialfunktion) die Zuverlässigkeit ermittelt werden. Alternativ soll durch die Ausfallrate und Reparaturrate die Verfügbarkeit berechnet werden. Mit einem Icon oben sollen Zuverlässigkeit bzw. Verfügbarkeit des gesamten Baums unten dargestellt werden. 

c)
Aus dem Fehlerbaum soll das System-PFDavg ermittelt werden (Berechnung siehe Konzept.md, Abschnitt „System-PFDavg-Berechnung" — keine einfache Verknüpfung der Komponenten-PFDavg-Mittelwerte, insbesondere bei redundanten Teilbäumen). Über die PFDavg-Tabelle der IEC 61508 soll daraus das SIL ermittelt werden.

d)
Aus dem Fehlerbaum sollen automatisch das Zuverlässigkeitsdiagramm und das BDD erzeugt werden, jeweils sichtbar im zugehörigen Reiter.




