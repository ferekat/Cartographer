A játék leírása
Rövid áttekintés
Ebben az egyszemélyes játékban egy 11x11-es négyzetrácsos térképre kell lehelyezni különböző alakzatú, különböző tereptípusú térképelemeket. Minden elemhez tartozik egy időérték (1 vagy 2), a játék 28 időegységből áll. A játék végén (vagy közben) a négyzetrács aktuális állapota alapján kell pár ellenőrzést (küldetést) elvégezni, és ez alapján alakul ki a végső pontszám.

A térkép kiindulási állapota
A térkép egy 11x11-es négyzetrács, kezdetben üres cellákkal feltöltve. A térképen 5 fix cellában hegymezők találhatóak. A hegyeink a térkép alábbi mezőiben találhatóak:

(sor, oszlop) => (2,2), (4,9), (6,4), (9,10), (10,6)

Térképelemek lehelyezése
A letehető térképelemek tereptípusai a következők lehetnek: erdő, falu, farm és víz. Az összes lehetséges elemet megadtuk lejjebb egy JavaScript tömbben.
A lehetséges elemeket véletlenszerűen megkeverjük, majd sorban egymás után egyesével kell őket lehelyezni a térképre. Minden térképelemet tudunk forgatni és tükrözni, és a térképelem nem fedhet le egy már teli mezőt (a hegy is ennek számít), illetve nem lóghat le egy része sem a térképről.A lehetséges elemeket véletlenszerűen megkeverjük, majd sorban egymás után egyesével kell őket lehelyezni a térképre. Minden térképelemet tudunk forgatni és tükrözni, és a térképelem nem fedhet le egy már teli mezőt (a hegy is ennek számít), illetve nem lóghat le egy része sem a térképről.

A játék időtartama
A játék 28 időegységig tart. Minden térképelemhez tartozik egy időegység, ami meghatározza, hogy mennyi ideig tart őket felfedezni. Addig tudunk új térképelemeket húzni, amíg el nem érjük a 28 időegységet. Ha az összesített időérték eléri, vagy meghaladja a 28 időegységet, a játék véget ér. Például, ha 1 időegységünk maradt hátra, és egy két időegységgel rendelkező térképelemet kapunk, a térképelemet még lehelyezhetjük, és utána a játék véget ér.

Pontszámítás
Minden játék elején ki kell választani 4 véletlenszerű küldetéskártyát (A,B,C,D), amik alapján pontot lehet kapni. Ilyen küldetéskártya lehet például ez:

'A hegymezőiddel szomszédos vízmezőidért három-három pontot kapsz.'

Ha a hegyeket 4 oldalról körbevesszük, körbevett hegyenként 1-1 pontot kapunk.

A játék végén meg kell számolni mindegyik küldetés alapján kapott pontokat, és ezek összesített eredménye lesz a végleges pontszám. A négy küldetésnél egyenként is fel kell tüntetni, melyik küldetésre hány pontot kaptunk!

Évszakok
A 28 időegység egy évet jelképez. Ez felbontható 4 évszakra, mindegyik évszak 7 időgységig tart. Ha a térképelemek húzása közben az összesített időérték eléri, vagy meghaladja a 7 többszörösét, az évszak véget ér.

Minden évszak végén 2 küldetéskártyáért tudunk pontszámot kapni. A tavasz végén az A-B küldetésért, a nyár végén a B-C küldetésért, az ősz végén a C-D küldetésért, a tél végén pedig a D-A küldetésért tudunk pontokat szerezni. A négy küldetésnél egyenként fel kell tüntetni évszakonként, melyik küldetésre hány pontot kaptunk!

A játék végén a négy évszak alatt szerzett pontszámaink összeadódnak, és ezek fogják adni a végleges pontszámunkat.

Küldetések
Itt találod a játékban kiértékelendő küldetéseket és a hozzájuk tartozó ábrákat.

Alap küldetések
Az erdő széle: A térképed szélével szomszédos erdőmezőidért egy-egy pontot kapsz.
Álmos-völgy: Minden olyan sorért, amelyben három erdőmező van, négy-négy pontot kapsz.
Krumpliöntözés: A farmmezőiddel szomszédos vízmezőidért két-két pontot kapsz.
Határvidék: Minden teli sorért vagy oszlopért 6-6 pontot kapsz.

Extra küldetések (plusz pontért)
Fasor: A leghosszabb, függőlegesen megszakítás nélkül egybefüggő erdőmezők mindegyikéért kettő-kettő pontot kapsz. Két azonos hosszúságú esetén csak az egyikért.
Gazdag város: A legalább három különböző tereptípussal szomszédos falumezőidért három-három pontot kapsz.
Öntözőcsatorna: Minden olyan oszlopodért, amelyben a farm illetve a vízmezők száma megegyezik, négy-négy pontot kapsz. Mindkét tereptípusból legalább egy-egy mezőnek lennie kell az oszlopban ahhoz, hogy pontot kaphass érte.
Mágusok völgye: A hegymezőiddel szomszédos vízmezőidért három-három pontot kapsz.
Üres telek: A falumezőiddel szomszédos üres mezőkért 2-2 pontot kapsz.
Sorház: A leghosszabb, vízszintesen megszakítás nélkül egybefüggő falumezők mindegyikéért kettő-kettő pontot kapsz.
Páratlan silók: Minden páratlan sorszámú teli oszlopodért 10-10 pontot kapsz.
Gazdag vidék: Minden legalább öt különböző tereptípust tartalmazó sorért négy-négy pontot kapsz.

Játéktér
A játéktéren az alábbi dolgok jelennek meg:

11x11-es mátrix a térképpel, amin a hegyek és a letett alakzatok látszanak
A véletlenszerűen kiválasztott küldetések nevei és leírása
A játékból hátralévő idő
Melyik évszakban vagyunk éppen, és jelzi a játék, hogy ezekhez melyik küldetés tartozik
Az évszakok alatt gyűjtött pontszámaink
A pontszámaink összesen, és melyik küldetésre hány pontot kaptunk.
A lehelyezendő elem és a hozzátartozó időtartam
Forgatás és tükrözés gombok
