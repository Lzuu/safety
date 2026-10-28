# Binary Decision Diagram (BDD)



## Aufgabe

Wie das Zuverlässigkeitsdiagramm und der Fehlerbaum ist das BDD ein Graph, um Ereignisse und Wahrscheinlichkeiten darzustellen. Die Ereignisse sind Nodes, dargestellt als Kreise. Die Transitionen verbinden die Ereignisse miteinander und sind mit „funktioniert" bzw. „ausgefallen" beschriftet; Ausfallrate und Reparaturrate gehören zum jeweiligen Ereignis (Komponente), nicht zur Transition selbst — die Missionsdauer ist ohnehin projektweit einheitlich (siehe Konzept.md). Der Benutzer soll Nodes vom rechten Feld auf das mittlere Feld ziehen können. An den Ereignissen gibt es Stubs, womit der Benutzer über die Maus die Nodes miteinander verbinden kann. Es gibt auch die BDD-Stubs (Rechtecke), die der Benutzer von rechts in das mittlere Feld ziehen kann. Es gibt ein 0-BDD-Stub und ein 1-BDD-Stub. 0 steht für success, 1 für fail. Das erzeugte BDD soll ein geordnetes BDD sein; die Variablenreihenfolge wird dabei automatisch bestimmt.

a) An den Ereignissen kann der Benutzer (Popup, oder wie auch immer: wichtig - modernes und intuitives Design. Es muss nicht durch ein Popup gelöst sein.) die Ausfallrate angeben. Damit soll die Zuverlässigkeit berechnet werden. Wenn alle Ereignisse vollständig sind, soll im unteren Fenster die Zuverlässigkeit dargestellt werden. 

b) 
Ist wie a), aber es soll hier zusätzlich die Reparaturrate angegeben werden. Damit soll die Verfügbarkeit des gesamten Graphen unten in der App dargestellt werden. 

c) 
Aus dem BDD soll das System-PFDavg ermittelt werden (Berechnung siehe Konzept.md, Abschnitt „System-PFDavg-Berechnung" — keine einfache Verknüpfung der Komponenten-PFDavg-Mittelwerte, insbesondere bei redundanten Pfaden). Über die PFDavg-Tabelle der IEC 61508 soll daraus das SIL bestimmt und unten in der App dargestellt werden.

d) 
Aus dem BDD sollen automatisch das Zuverlässigkeitsdiagramm und der Fehlerbaum erzeugt werden, jeweils sichtbar im zugehörigen Reiter.

e)
Das BDD soll zusätzlich durch Reduktion optimiert werden können: isomorphe Teilbäume (gleiche Knoten mit gleichen Nachfolgern) werden zu einem Knoten zusammengeführt, und Knoten, deren beide Ausgänge zum selben Nachfolger führen, werden entfernt. Damit entsteht ein reduziertes, geordnetes BDD (ROBDD).


