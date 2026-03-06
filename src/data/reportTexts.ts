export interface DimensionReport {
  summary: string;
  strengths: string;
  advice: string;
  practice: string;
}

// 4 levels per dimension: strength (>=4.2), good (>=3.4), developing (>=2.6), focus (<2.6)
type LevelKey = 'strength' | 'good' | 'developing' | 'focus';

function getLevelKey(score: number): LevelKey {
  if (score >= 4.2) return 'strength';
  if (score >= 3.4) return 'good';
  if (score >= 2.6) return 'developing';
  return 'focus';
}

const reports: Record<string, Record<LevelKey, DimensionReport>> = {
  cognitive_flexibility: {
    strength: {
      summary: 'Természetesen gondolkodsz több nézőpontból egyszerre — és ez a csapatodnak is látszik. Komplex helyzetekben nem kerülöd a bizonytalanságot, hanem keretezed. Ez a FLUX évtized egyik legritkább képessége.',
      strengths: 'Gyorsan váltasz gondolkodási keretek között anélkül, hogy elveszítenéd a fonalat. Nyitott vagy arra, hogy az új információ alapján felülírj egy korábbi döntést — és a csapatodnak ezt kommunikálni is tudod.',
      advice: 'A következő kihívásod nem a saját rugalmasságod, hanem mások fejlesztése. Könnyen elfelejtjük, hogy ami nekünk magától értetődő, másnak komoly tanulás. Figyelj arra, hogy a csapatod is kapjon teret és időt a perspektívaváltásra.',
      practice: 'Legközelebb, amikor a csapatod egy megoldást vár tőled, fordítsd meg a folyamatot: mondd el a leggyengébb érvét a saját álláspontodnak, és kérd meg a csapatot, hogy folytassák. Komoly döntéshozatali kultúrát épít — és meglepő eredményeket hoz.',
    },
    good: {
      summary: 'A legtöbb vezető vagy ragaszkodik egy megközelítéshez, vagy minden pillanatban kérdőjelez — te a kettő között jársz. Ez értékes egyensúly, és van hova fejlődni.',
      strengths: 'Nyitott vagy az alternatív megközelítésekre, és nem ragaszkodsz mereven az első ötletedhez. Stressz nélküli helyzetekben jól kezeled a váratlan fordulatokat.',
      advice: 'Figyelj arra, mi történik nyomás alatt. A legtöbb vezető stressz esetén automatikusan visszatér a "bevált" megoldáshoz — még akkor is, ha a helyzet megváltozott. Ez nem hiba, de érdemes felismerni, mikor fordul ez elő nálad.',
      practice: 'Egy fontos megbeszélés előtt írj le 3 dolgot, amit biztosan tudsz a témáról — és melléjük 1 dolgot, amiben lehet, hogy tévedsz. Vitasd meg a csapatoddal azt az egyet. A legkomolyabb belátások ott születnek, ahol valaki megkérdőjelezi, amit biztosra veszünk.',
    },
    developing: {
      summary: 'Ismerős területeken magabiztosan mozogsz. Új vagy összetett szituációkban az első megközelítés vonzó marad, még akkor is, ha nem a legjobb. Ez nem hiba — hanem egy felismerhető és megváltoztatható minta.',
      strengths: 'Van benned hajlandóság más vélemények meghallgatására, és a jól ismert területeken tudatosan alkalmazkodsz. Erre lehet építeni.',
      advice: 'A rugalmasság nem azt jelenti, hogy mindig megváltoztatod az álláspontodat — hanem hogy aktívan keresed az ellenérveket, mielőtt megerősíted. Ez a különbség a rugalmasság és az ingadozás között.',
      practice: 'A következő héten vezess egy rövid "pre-mortem" elemzést egy fontos projekt előtt: kérd meg a csapatot, hogy képzeljék el, a projekt 6 hónap múlva kudarcba fulladt — és mondják el, miért. Komoly gondolkodási gimnasztika, és előre feltárja a valódi kockázatokat.',
    },
    focus: {
      summary: 'Jelenleg a megszokott kereteken belül érzed magad biztonságban — és ez teljesen érthető. A rugalmasabb gondolkodás fejleszthető képesség, nem veleszületett adottság.',
      strengths: 'A stabilitásod és a következetességed, amit képviselsz, értékes. Sok szituáció igényli ezt. A kérdés az, hogyan bővíted a repertoárodat — nem cseréled le.',
      advice: 'Kezdd azzal, hogy tudatosan megkülönbözteted: mikor ragaszkodsz egy megközelítéshez, mert az valóban a legjobb — és mikor azért, mert ismerős? Ez a kettő sokszor összemosódik.',
      practice: 'Válassz ki egy olyan rutinfolyamatot, ami legalább 2 éve ugyanúgy fut. Kérdezd meg a csapatodat: "Ha ma vezetnénk be ezt első alkalommal, hogyan csinálnánk?" Ne kötelezd el magad a változás mellett — csak figyeld meg, mi jön elő.',
    },
  },

  uncertainty_tolerance: {
    strength: {
      summary: 'Nem csak elviseled a bizonytalanságot — cselekedni is tudsz benne. A csapatodnak ez biztonságot ad, különösen akkor, amikor nincsenek kész válaszok.',
      strengths: 'Nyugodtan navigálsz bizonytalan helyzetekben, és a "nem tudjuk még" érzése nem blokkolja a döntést. A csapatod látja, hogy te stabilan működsz, amikor a körülmények nem azok.',
      advice: 'Figyelj arra, hogy a magas tűrőképességed ne váljon láthatatlan elvárássá a csapatod felé. Amit te könnyedén kezelsz, másnak komoly feszültséget okozhat. A jó vezető kimondja: "Ez most nem kényelmes — és rendben van."',
      practice: 'A következő bizonytalan helyzetben, mielőtt cselekszel, mondd ki hangosan a csapatnak: "Ezt most nem tudjuk biztosan. Ezzel a hiányos képpel fogunk dolgozni." Figyelj meg, hogyan változik a csapat hozzáállása, amikor a vezető normalizálja a bizonytalanságot.',
    },
    good: {
      summary: 'Jól mozogsz ismeretlen területen — nem keresed a hamis bizonyosságot, és az "egyelőre nem tudhatjuk" érzése nem blokkol. Van egy következő szint, ami nem a tűrésről, hanem az aktív nyitásról szól.',
      strengths: 'Egészséges egyensúlyt tartasz tervezés és improvizáció között. Nem pánikólsz az ismeretlen előtt, és általában képes vagy haladni hiányos információkkal is.',
      advice: 'A következő szint az, hogy ne csak tűrd a bizonytalanságot, hanem aktívan keresd ott, ahol a legkomolyabb lehetőségek vannak. A legjobb döntések gyakran ott születnek, ahol nincs kész forgatókönyv.',
      practice: 'Vállalj be tudatosan egy projektet vagy döntést, ahol kevesebb információval indulsz, mint amennyit szeretnél — és ezt kommunikáld a csapatodnak is. Dokumentáld, milyen döntések születtek így, és mi lett az eredmény. Sokszor meglepő.',
    },
    developing: {
      summary: 'Stabil helyzetekben erős vagy. Amikor a dolgok kiszámíthatatlanná válnak, hajlamos vagy több információt keresni, mint amennyit valaha megkapsz — és ez lassítja a döntést.',
      strengths: 'Az óvatosságod és az alaposságod értékes — nem rohansz bele kapkodva a dolgokba. Ez jó alap. A fejlesztési irány az, hogy felismerd: mikor elég az "elég".',
      advice: 'A bizonytalanság a jövő alapállapota — nem kivétel. A cél nem az, hogy kényelmes legyen benne lenni, hanem hogy cselekedni tudj mellette. A tökéletes információ soha nem áll össze.',
      practice: 'Próbáld ki egy héten át a "70%-os döntési szabályt": ha az elérhető információ kb. 70%-a rendelkezésre áll, hozd meg a döntést. Jegyezd le, melyik döntésnél alkalmaztad, és mi lett az eredmény. A legtöbben meglepődnek, mennyire jól működik.',
    },
    focus: {
      summary: 'A bizonytalanság most valódi kihívást jelent számodra — és ezt érdemes komolyan venni. Nem azért, mert baj van, hanem mert ez a FLUX évtized egyik leggyakrabban emlegetett fejlesztési területe.',
      strengths: 'Az, hogy szereted, ha a dolgok kiszámíthatók, nem gyengeség — sok szervezeti funkció pontosan erre épül. A kérdés az, hogyan bővíted a kapacitásodat anélkül, hogy megtagadod, ami eddig működött.',
      advice: 'Különítsd el a kockázatot a bizonytalanságtól. Nem minden ismeretlen veszélyes — a legtöbb bizonytalan helyzet kezelhető, ha kicsi, visszafordítható lépésekben közelítesz felé.',
      practice: 'Vezess egy héten át "bizonytalansági naplót": minden nap jegyezz fel egy helyzetet, ahol bizonytalannak érezted magad, mit tettél, és mi lett az eredmény. A legtöbb ember meglepődik azon, mennyire jól boldogul — csak nem veszi észre, mert az aggodalom hangosabb.',
    },
  },

  autonomy_design: {
    strength: {
      summary: 'Tudatosan tervezed, ki hozhat milyen döntést — és ez látszik a csapatod viselkedésén. Az embereid nem kivárnak, hanem cselekszenek.',
      strengths: 'Nem mikro-menedzselsz, hanem kereteket adsz. A csapatod tagjai érzik a bizalmadat — és ez nem csak hangulat: ez a teljesítményükben mérhető.',
      advice: 'A nagy autonómia csak akkor fenntartható, ha a visszajelzési kultúra is erős. Rendszeresen ellenőrizd: tudja-e a csapatod, mikor és hogyan kérjen segítséget, ha elakad? Ha igen, ez az egész rendszer jól működik.',
      practice: 'Kérdezd meg negyedévente a csapatodat: "Miben szeretnétek több mozgásteret?" és "Hol éreznétek hasznomat, ha jobban bent lennék?" A kettő egyensúlya folyamatosan változik — és megéri nyomon követni.',
    },
    good: {
      summary: 'Általában jól érzed, mikor kell elengedni és mikor beavatkozni. Stressz alatt vagy fontos projekteknél megjelenik a visszaellenőrzési reflex — és ez az a pont, ahol a legtöbb fejlődés van.',
      strengths: 'A csapatod tagjai mozgástérben érzik magukat, és ott vagy, amikor szükség van rád. Ez a kombináció ritka — sok vezető az egyik végletbe csúszik.',
      advice: 'Figyelj arra, mikor veszed vissza a kontrollt feleslegesen. Jellemzően stressz alatt, nagy ügyfelek előtt vagy a saját ötleteidnél fordul elő. Ez nem rossz szándék — de a csapatod mindig érzi.',
      practice: 'Válassz egy közepes fontosságú projektet, és delegáld teljes egészében — beleértve a megközelítést is. Határozd meg a célokat és a határidőt, aztán kösd le magad: két hétig csak akkor szólsz bele, ha megkérnek rá. Jegyezd le, mi derül ki.',
    },
    developing: {
      summary: 'Hajlamos vagy többet kontrollálni, mint amennyire szükség van — nem szándékosan, hanem mert így tanultad a munkát. Ez megváltoztatható, és a csapatod profitál belőle a legjobban.',
      strengths: 'Az, hogy odafigyelsz a részletekre és gondoskodsz a minőségről, értékes. A fejlesztés iránya az, hogyan fordítod ezt keretek felállítására — ahelyett, hogy te kontrollálsz minden lépést.',
      advice: 'A delegálás nem lemondás a minőségről — hanem annak definiálása, mi számít jó eredménynek, és aztán a csapat útjából való kilépés. A "mi a cél" a tiéd; a "hogyan érjük el" a csapaté.',
      practice: 'Készíts a csapatoddal egy döntési térképet: írjátok le, melyik döntéseket hozhatják meg önállóan, melyeket előzetes egyeztetéssel, és melyeket csak te. Tegyétek ki jól látható helyre, és tartsd be — mindkét irányban.',
    },
    focus: {
      summary: 'Jelenleg a csapatod valószínűleg vár — vár jóváhagyásra, visszajelzésre, irányra. Nem azért, mert alkalmatlanok, hanem mert nem kapták meg a teret. Ez megváltoztatható.',
      strengths: 'A minőségigényed és a részletekre figyelésed értékes. Ez nem az a tulajdonság, amit el kell hagyni — hanem amit át kell fordítani: elvárások kommunikálásává, nem folyamatok előírásává.',
      advice: 'Kezdd azzal, hogy észreveszed, mikor mondod meg a "hogyan"-t. Sokszor automatikusan tesszük, mert tudjuk a választ. De minden alkalommal, amikor megtesszük, elvesszük a csapat fejlődési lehetőségét.',
      practice: 'Egy héten át, minden alkalommal, amikor utasítást készülnél adni, állj meg és kérdezd meg: "Neked mi lenne az ötleted?" Ha a válasz valami olyasmi, amit te is mondtál volna — csak mondd, hogy jó. Ha más — ez az, ahol tanulsz.',
    },
  },

  psychological_safety: {
    strength: {
      summary: 'Az emberek körülötted mernek hibázni, kérdezni és ellentmondani. Ez az innováció egyetlen valódi alapfeltétele — és te ezt létrehozod.',
      strengths: 'A csapatod tagjai nyíltan hoznak problémákat, és nem szépítik a valóságot. Ez nem magától jön — te teremtetted meg a feltételeit.',
      advice: 'A pszichológiai biztonság törékeny, és egyetlen rossz reakció hónapok munkáját teheti semmissé. Különösen nyomás alatt figyelj arra, hogyan reagálsz rossz hírekre vagy hibákra. A csapatod ezeket a pillanatokat mérlegeli.',
      practice: 'A következő csapatmegbeszélésen oszd meg konkrétan — nem általánosan —, hogy az elmúlt héten miben tévedtél vagy miben volt hiányos a döntésed. Nem dramatizálva: csak tényszerűen. Figyelj meg, mi változik a teremben.',
    },
    good: {
      summary: 'A csapatod általában mer szólni — és ez nem magától értetődő. Van néhány terület vagy helyzet, ahol ez szűkül, és ott van a legkomolyabb fejlődési lehetőség.',
      strengths: 'Alapvetően nyitott vagy a visszajelzésre, és a hibák nem személyes ítéletet vonnak maguk után. Ez erős alap — és jól láthatóan hat a csapatod viselkedésére.',
      advice: 'Figyelj azokra a pillanatokra, amikor a csapat bezáródik: státuszkülönbségeknél, időnyomás alatt, vagy ha a te ötleted van az asztalon. Ezek a leggyakoribb töréspontok.',
      practice: 'Vezess be egy havi "mi nem működik" kört: kérd meg a csapatot, hogy mindenki mondjon egy dolgot az aktuális munkamódból, ami lassít, zavar vagy nem hatékony. Ne védd meg a jelenlegi rendszert — csak hallgasd és jegyezd le. Az első alkalom általában meglepő.',
    },
    developing: {
      summary: 'Valószínűleg vannak a csapatodban olyanok, akik kétszer meggondolják, mielőtt szólnak. Nem azért, mert nem bíznak benned — hanem mert a kultúra még nem nyílt meg teljesen. Ez pontosan ott kezdődik, ahol te állsz.',
      strengths: 'Az, hogy ezen gondolkodsz, önmagában fontos lépés. A legtöbb vezető nem is tudatosítja, mekkora hatása van arra, hogy az emberek mit mernek kimondani.',
      advice: 'A pszichológiai biztonság a kis pillanatokban épül: hogyan reagálsz egy rossz hírre, hogyan fogadod a kritikát, mit csinálsz, amikor valaki hibázik. Ezek a reakciók formálják a kultúrát — nem az, amit mondasz.',
      practice: 'Egy héten át figyeld meg — és jegyezd le —, hogyan reagálsz az első 30 másodpercben, amikor valaki hibát, problémát vagy kellemetlen információt közöl veled. Az arckifejezés, a hang, az első mondat. A csapat pontosan ezeket méri.',
    },
    focus: {
      summary: 'Ha az emberek most nem mondják el, amit gondolnak — ez nem az ő hibájuk. Ezt te is megváltoztathatod, és gyorsabban, mint gondolnád.',
      strengths: 'Az, hogy szembenézel ezzel, önmagában bátorság. Sok vezető soha nem jut el idáig — mert kényelmes hinni, hogy a csapat rendben van.',
      advice: 'A pszichológiai biztonság nem eszközökkel épül, hanem modellezéssel. Ha te megmutatod, hogy bizonytalanság, hiba és kritika elfogadható — a csapat elkezdi hinni, hogy valóban az.',
      practice: 'A következő három megbeszélésen te mondd el először, amiben bizonytalan voltál az elmúlt napokban — konkrétan, nem általánosan. Csak annyit: "Ebben nem voltam biztos, és így döntöttem." Figyeld meg, mi változik.',
    },
  },

  adaptive_decision: {
    strength: {
      summary: 'Tudod, mikor kell gyorsan dönteni és mikor érdemes lassítani — és ez a kalibrálás az egyik legnehezebb vezetői képesség. Aktívan dolgozol a saját vak foltjaid ellen.',
      strengths: 'Jól érzékeled az "egyirányú ajtó" és a "kétirányú ajtó" különbségét. Ismered a tipikus kognitív torzításaidat, és tudatosan figyeled őket döntési helyzetekben.',
      advice: 'Ezen a szinten a legnagyobb hozzáadott értéked az, ha a döntéshozatali kultúrát fejleszted a csapatodban — nemcsak jobb döntéseket hozol, hanem megtanítod a döntési keretek használatát.',
      practice: 'Vezess be havi "döntési retrospektívet" a csapatoddal: válasszatok 2-3 döntést az elmúlt időszakból, amelyek nem az elvárt eredménnyel zárultak. Ne a hibás személyt keressétek — hanem azt, mi hiányzott a folyamatból. Ez tartósan jobb döntési kultúrát épít.',
    },
    good: {
      summary: 'A legtöbb helyzetben jól egyensúlyozol alaposság és gyorsaság között. Vannak szituációk — főleg, ha a saját ötleted van az asztalon —, ahol a döntési folyamat lelassul.',
      strengths: 'Általában jó döntéseket hozol, és rugalmas vagy a korrekciókban. A csapatod bízik a döntéseiben, és általában érti az indokaidat.',
      advice: 'Figyelj azokra a döntésekre, ahol halasztasz. A tökéletes döntés várása sokszor rosszabb annál, mint egy elég jó döntés most. Érdemes tudatosabban figyelned a megerősítési torzításra is — különösen, ha a saját ötleted forog kockán.',
      practice: 'Minden fontos döntésnél tedd fel magadnak ezt a kérdést: "Mit kellene látnom ahhoz, hogy megváltoztassam az álláspontomat?" Ha nehezen tudsz válaszolni, ez jel. Aktívan keresd az ellentétes bizonyítékokat — ne azokat, amik igazolnak.',
    },
    developing: {
      summary: 'Rutinhelyzetekben határozottan döntesz. Összetett vagy gyorsan változó szituációkban a döntési folyamat lelassul — és ez nem az ismeretek hiánya, hanem egy megváltoztatható szokás.',
      strengths: 'Az alaposságod értékes — nem döntesz kapkodva. Ez különösen fontos visszafordíthatatlan döntéseknél. A fejlesztés iránya az, hogy felismerd: a legtöbb döntés visszafordítható.',
      advice: 'Tanuld meg megkülönböztetni a "kétirányú ajtókat" az "egyirányú ajtóktól". A kétirányú ajtóknál — ahol a döntés megfordítható — a gyorsaság fontosabb, mint a tökéletesség. Az egyirányúaknál fordítva.',
      practice: 'Egy héten át jegyezd fel a döntéseidet, és jelöld meg mellé: visszafordítható-e, vagy sem. A legtöbb döntés megfordítható — és ennek felismerése felszabadítja az energiát a valóban kritikusakra.',
    },
    focus: {
      summary: 'Döntési helyzetekben most sok energiát visz el a "legjobb" megoldás keresése, amikor egy "elég jó és gyors" sokszor jobb eredményt ad. Ez tanulható és gyorsan fejleszthető.',
      strengths: 'Az alaposságod nem gyengeség — sok helyen éppenséggel versenyelőny. A kérdés az, mikor érdemes bekapcsolni, és mikor lassít le feleslegesen.',
      advice: 'Kezdd azzal, hogy elfogadod: a nem-döntés is döntés — általában a legköltségesebb. A legtöbb helyzetben az elérhető információ 70%-a elegendő. A maradék 30% soha nem lesz meg.',
      practice: 'Vezess be egy "5 perces szabályt" a kisebb döntéseknél: ha 5 perc alatt eldönthető, döntsd el azonnal és menj tovább. Ez nem kapkodás — ez az agyad felszabadítása a valóban komplex döntésekre.',
    },
  },

  group_culture_awareness: {
    strength: {
      summary: 'Látod és tudatosan formálod a csapatod kultúráját — nem reagálsz rá, hanem alakítod. Ez ritka, és a szervezet szempontjából komoly versenyelőny.',
      strengths: 'Felismered a különböző csoportdinamikákat, és képes vagy alkalmazkodni hozzájuk anélkül, hogy elveszítenéd a saját irányodat. Tudod, hogy a kultúra nem véletlenül alakul.',
      advice: 'Használd ezt a képességet arra, hogy a csapatod tagjait is érzékenyebbé tedd a dinamikákra. Minél többen látják és értik, annál rugalmasabb és ellenállóbb lesz a csapat egésze.',
      practice: 'Negyedévente tarts "kultúra-check-in"-t a csapatoddal: "Milyen viselkedést jutalmazunk valójában — figyelemmel, dicsérettel, előrelépéssel? Milyet kellene? Mi az, ami kimondatlanul elfogadott, de nem kellene?" Ne adj kész választ — csak vezesd a beszélgetést.',
    },
    good: {
      summary: 'Érzékeny vagy a csoportdinamikákra, és hajlandó foglalkozni velük. Általában reagálsz a kultúra jelzéseire — a következő szint az, hogy proaktívan formálod azt.',
      strengths: 'Észreveszed, ha a csapatban valami "nem stimmel", és nem söpröd a szőnyeg alá. A legtöbb embered érzi, hogy odafigyelsz arra, hogyan működnek együtt.',
      advice: 'Ne csak reagálj a kultúrára — gondolkodj el azon, milyen kultúrát szeretnél, és tedd meg az első tudatos lépéseket felé. A kultúra mindig a vezető viselkedéséből következik elsőként.',
      practice: 'Írj le 3 mondatban, milyen kultúrát szeretnél a csapatodban. Aztán kérdezd meg külön-külön 3 kollégádat, ők hogyan írnák le a jelenlegi kultúrát. A kettő közötti rést nem kritizálni kell — hanem megérteni, honnan jön.',
    },
    developing: {
      summary: 'Intuitívan érzékeled a csapatdinamikákat — de nem mindig tudod, mit kezdj velük. Ez nem tudatosság hiánya, hanem egy eszközrendszer, amit be lehet tanulni.',
      strengths: 'Ha feszültség van a csapatban, általában te érzed meg először. Ez jó alap — a kérdés az, hogyan fordítod tudatos kultúra-alakítássá.',
      advice: 'A csapatkultúra mindig a vezető viselkedéséből következik — nem a szavaiból. Amit te csinálsz (mit jutalmazol, mit tűrsz el, mit büntetsz), az lesz a norma, függetlenül attól, mit mondasz.',
      practice: 'Figyelj meg egy héten át, milyen viselkedéseket "jutalmazol" — figyelemmel, dicsérettel, idővel, előrelépéssel — és melyeket hagysz szó nélkül. Ez a csapatkultúrád valódi térképe, nem az, amit gondolsz róla.',
    },
    focus: {
      summary: 'Jelenleg a kultúra nagyrészt magától alakul körülötted — és ez azt jelenti, hogy mások íratlan szabályai töltik ki a teret. Ez megváltoztatható, amint tudod, mire figyelj.',
      strengths: 'Az, hogy most felismered ezt, valódi első lépés. A legtöbb vezető soha nem teszi fel a kérdést: "Mi az én hatásom a csapatom kultúrájára?"',
      advice: 'Kezdd azzal, hogy megfigyeled: mi az, ami jelenleg "terjed" a csapatodban? Milyen viselkedés normalizálódott? Mi van kimondatlanul, de mindenki tudja? Ezek a csapatkultúra valódi jelei.',
      practice: 'A következő csapatmegbeszélésen figyeld meg: ki szólal meg először? Ki hallgat? Ki kivel ért egyet automatikusan? Ezek a minták megmondják, ki van valójában hatalomban — és kit nem hallgat a csoport. Ez az az információ, ami alapján lehet változtatni.',
    },
  },
};

export function getDimensionReport(dimensionId: string, score: number): DimensionReport {
  const levelKey = getLevelKey(score);
  const dimReports = reports[dimensionId];
  if (!dimReports) {
    return {
      summary: '',
      strengths: '',
      advice: '',
      practice: '',
    };
  }
  return dimReports[levelKey];
}
