# Y2Y Burnout Tool — Validációs Terv

> NTC feladat #10: "gondold vegig hogy hogyan lehet ertelmesen validalni az egeszet, a skalara nagyon figyelj hogy ossze legyen hangolva es legyen egy y2y burnout tool, pont ahogy ildikonak irtam az emailben"

## Kontextus (Foxconn Ildikó thread alapján)

**Ügyfél igények:**
- ~60 fős management team burnout mérése
- Magyar + angol (3 külföldi kolléga)
- Online, egyéni eredmény + aggregált HR view
- Két vezetői szint (felsőbb + középső management)
- Rugalmas utógondozás, ár/hó/fő modell

---

## A két referencia teszt (amire az eszköz épül)

A Y2Y Burnout Compass valószínűleg a következő két validált skálából merít:

### 1. MBI — Maslach Burnout Inventory (aranystandardard)
- **3 dimenzió:** Érzelmi kimerültség (EE), Deperszonalizáció (DP), Személyes teljesítmény (PA)
- **22 kérdés**, 7-fokú Likert skála (0=soha, 6=minden nap)
- Scoring: EE ≥27, DP ≥13, PA ≤31 → burnout
- Limitáció: copyright, nem szabad módosítani

### 2. BAT — Burnout Assessment Tool (Leiter & Maslach, 2021, ingyenes)
- **23 kérdés**, 5-fokú skála
- 4 core dimenzió: kimerültség, mentális distancia, kognitív károsodás, érzelmi károsodás
- 2 másodlagos: pszichológiai jóllét, pszichoszomatikus panaszok
- Előny: nyílt forrású, validált magyarul is, Y2Y customizálhatja

---

## Skála-harmonizáció (⚠️ Dorka külön kérte!)

**A probléma:** Ha MBI-t és BAT-ot keverünk, a skálák nem kompatibilisek.

**Megoldás — Y2Y Burnout Compass saját skálarendszer:**
```
Minden kérdés: 1-5-ös skála (nem soha → mindig)
Dimenzió-súlyok: egyformán súlyozva az aggregált score-ban
Output kategóriák:
  🟢 0-30%  → Égő pislákolás (figyelj a jelekre)
  🟡 31-60% → Kimerültség határán (ideje lépni)
  🔴 61-85% → Aktív burnout (azonnali beavatkozás)
  ⚫ 86-100% → Krízis (szakmai segítség szükséges)
```

---

## Javasolt kérdésstruktúra (Y2Y Burnout Compass v2)

### Blokk 1: Érzelmi kimerültség (6 kérdés)
1. Kimerülten érzem magam, mire a munkanapom véget ér.
2. Reggel már fáradtan kelek, amikor munkanapra kell felkelni.
3. Érzem, hogy a végső határomon vagyok.
4. Munkám emocionálisan kimer.
5. Frusztrált érzem magam a munkámtól.
6. Közvetlenül emberekkel dolgozni megterhelő számomra.

### Blokk 2: Mentális distancia / Deperszonalizáció (4 kérdés)
7. Azt érzem, hogy közömbössé váltam mások problémáival szemben.
8. Attól tartok, a munkám érzéketlenné tesz.
9. Nem igazán érdekel, mi történik a kollégáimmal.
10. Cinikusabbá váltam, mióta itt dolgozom.

### Blokk 3: Kognitív funkciók (4 kérdés)
11. Nehezen koncentrálok munkavégzés közben.
12. Feladataim ellátása közben hibákat vetek.
13. Nehezen hozok döntéseket, ami korábban nem volt jellemző rám.
14. Munkám közben nehezen tartom fenn a fókuszomat.

### Blokk 4: Teljesítményérzet (4 kérdés)
15. Hatékonyan megoldom a munkámban felmerülő problémákat.
16. Pozitívan befolyásolom mások életét a munkámon keresztül.
17. Könnyen megteremtem a nyugodt légkört a csapatommal.
18. Energikusnak érzem magam a munkámban.

### Blokk 5: Szomatikus jelzések (4 kérdés)
19. Fejfájással, izomfeszüléssel ébredek.
20. Alvási problémáim vannak (nehezen alszom el / éjjel felébredek).
21. Testi tünetek (pl. hasi görcs, szívdobogás) munkával kapcsolatos stressz esetén.
22. Az elmúlt 3 hónapban betegséggel töltött napjaim száma nőtt.

---

## Validációs terv (tudományos megalapozás)

### Fázis 1: Pilot (Foxconn-nal!)
- N=60 manager tölti ki
- Párhuzamosan: 5 kérdéses WHO-5 wellbeing index (validált, ingyenes)
- Convergent validity: Y2Y score ↔ WHO-5 score korreláció (r >0.6 elvárt)

### Fázis 2: Teszt-reteszt
- 4 hét után újrakitöltés (ugyanazon személyek)
- Reliability: ICC >0.75

### Fázis 3: Normatív adatok
- Magyar management populációra normák felállítása (Foxconn + más ügyfelek)
- Percentilis alapú kategóriák (jobb, mint fix cutoff)

---

## Kétnyelvűség

Minden kérdés: magyar + angol változat
Dorka + anyanyelvi lektor validálja az angol verziót
Különböző szintű burnout-jelzők a két csoportra (junior vs senior management)

---

## Műszaki megvalósítás (burnout-assessment projekt)

A meglévő ground.y2y.hu template alapján:
- React + TypeScript + Tailwind (már elkészült az alap)
- Kérdések: `src/data/questions.ts` (már tartalmaz placeholder-t)
- Scoring: `src/utils/scoring.ts` (skálák implementálva)
- HR Dashboard: aggregált view Ildikónak → Supabase backend
- Egyéni PDF riport letöltés kitöltés után

---

## Következő lépések

- [ ] Dorka átnézi és jóváhagyja a kérdésbankot
- [ ] Ildikónak megmutatni a tesztet (ők az első pilotozók)
- [ ] Anyanyelvi lektor az angol verzióhoz
- [ ] Supabase táblastruktúra: `burnout_results`, `burnout_aggregates`
- [ ] HR dashboard Ildikó számára

*NCT automatizálás | 2026-03-20*
