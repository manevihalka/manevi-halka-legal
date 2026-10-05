// P4 · Einem Kreis per Einladung beitreten (DE). Hilfeseite für Eingeladene (join.html und halka.html verlinken hierher).
// Knopfnamen kommen über [[schlüssel]] aus der App; die eigenen Texte der Webseiten (join.html, halka.html) als [[=...]].
// Kein langer Gedankenstrich, kein Cevşen.
export default {
  title: "Einem Khatm- oder Dhikr-Kreis per Einladung beitreten",
  desc: "Einladungslink oder Code bekommen? Link antippen, Code einfügen oder QR-Code scannen. Ohne App kannst du einem einmaligen Kreis im Browser beitreten.",
  h1: "So trittst du einem Kreis per Link oder Code bei",
  crumb: "Einem Kreis beitreten",
  eyebrow: "Schritt-für-Schritt-Anleitung",
  lead: "Du hast eine Einladung zu einer Khatm (in der App: Chatma, auf Türkisch Hatim) oder einem Dhikr bekommen? Dann bist du hier richtig. Hast du die App, genügt es, den Link anzutippen. Sonst lädst du die App und trittst mit dem Einladungscode bei. Einem einmaligen Kreis kannst du auch im Browser beitreten.",
  meta: ["Etwa 1 Minute", "Keine E-Mail, kein Passwort", "Beitreten kostenlos"],
  film: { sahne: "film-katil", cap: "Link antippen, auf [[joinGroup.join]] tippen, Namen eingeben. Schon bist du im Kreis." },

  kisa: {
    maddeler: [
      "Hast du die App, tippe in der Nachricht auf den Link. Öffnet sich die Einladungskarte, tippe auf [[joinGroup.join]].",
      "Trittst du zum ersten Mal bei, gib deinen Namen ein und tippe auf [[nameSheet.confirm]]. E-Mail oder Passwort brauchst du nicht.",
      "Öffnet sich der Link im Browser, obwohl du die App hast, tippe auf der Seite auf [[=App öffnen]] (beim einmaligen Kreis auf [[=In der App öffnen]]).",
      "Hast du die App nicht, lade sie zuerst. Tippe dann im Tab [[tabs.circles]] auf [[ol:circlesTab.anonJoin]], füge den Link oder den Code ein und tippe auf [[joinGroup.join]].",
      "Der Link eines einmaligen Kreises öffnet sich meist auch ohne App: Im Browser nimmst du die Seiten, die du liest, oder zählst mit.",
      "Deine Aufgabe erscheint auf der Startseite im Bereich [[tx:dashboard.myTasks]].",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "uygulaman-varsa", rol: "Wer eingeladen ist", baslik: "Wenn du die App schon hast",
      giris: "Die Einladung kommt meist als Link per WhatsApp oder SMS. Unter dem Link steht oft auch ein kurzer Code aus sechs Zeichen.",
      adimlar: [
        {
          baslik: "Tippe auf den Link in der Nachricht",
          metin: [
            "Tippe auf den Link in der Nachricht. Die App öffnet sich von selbst und zeigt die Einladungskarte. Oben auf der Karte steht [[tx:join.invite]], darunter der Name des Kreises. Bei einem einmaligen Kreis steht oben [[tx:event.createMenuTitle]].",
            "Willst du jetzt nicht beitreten, tippe auf [[tx:join.skip]]. Der Link bleibt in der Nachricht; du kannst ihn später wieder antippen.",
          ],
          ipucu: "Öffnet sich der Link in WhatsApp oder Instagram, siehst du manchmal statt der App eine Webseite. Tippe dort auf [[=App öffnen]] (beim einmaligen Kreis auf [[=In der App öffnen]]). Dann öffnet sich die Einladungskarte in der App.",
          sahne: "katil-link",
        },
        {
          baslik: "Auf Beitreten tippen und deinen Namen eingeben",
          metin: [
            "Tippe auf [[joinGroup.join]]. Nutzt du die App zum ersten Mal, fragt dich die Karte [[tx:nameSheet.title]] nach deinem Namen. Gib ihn ein und tippe auf [[nameSheet.confirm]]. Unter diesem Namen sehen dich die anderen im Kreis.",
            "In einem regelmäßigen Kreis folgt das Fenster [[tx:join.welcome]]; tippst du auf [[common.ok]], öffnet sich der Kreis. Bei einem einmaligen Kreis öffnet sich der Kreis direkt.",
          ],
          fark: "Zum Beitreten brauchst du kein Konto. E-Mail, Passwort oder Telefonnummer werden nicht abgefragt; dein Name genügt.",
          ipucu: "Bist du diesem Kreis schon beigetreten, öffnet sich nach dem Tippen auf [[joinGroup.join]] direkt der Kreis.",
          sahne: "katil-katil",
        },
      ],
    },
    {
      tur: "bolum", id: "uygulaman-yoksa", rol: "Wer eingeladen ist", baslik: "Wenn du die App nicht hast",
      giris: "Tippst du den Link eines regelmäßigen Kreises an, öffnet sich im Browser die Einladungsseite. Nach dem Laden der App kommt die Einladung nicht von selbst an: Tippe noch einmal auf den Link in der Nachricht oder gib den Code in der App ein. Notiere dir deshalb zuerst den Code. Der Link eines einmaligen Kreises öffnet dagegen meist die Seite des Kreises selbst (siehe Schritt 7 unten).",
      adimlar: [
        {
          baslik: "Notiere den Code auf der Einladungsseite und lade die App",
          metin: [
            "Auf der Seite siehst du im Feld [[tx:=Einladungscode]] einen Code aus sechs Zeichen, zum Beispiel T4X6RC. Schreib ihn dir auf oder lösche die Nachricht nicht.",
            "Tippe dann auf [[ol:=App Store]] oder [[ol:=Google Play]] und lade Manevi Halka. Laden und einem Kreis beitreten ist kostenlos.",
          ],
          ipucu: "Der Code steht meist auch in der Nachricht: Die Zeile [[tx:group.shortCode]] unter dem Link ist derselbe Code.",
          sahne: "katil-sayfa",
        },
        {
          baslik: "Öffne in der App den Tab Kreise",
          metin: [
            "Öffne die App und geh die kurze Einführung beim ersten Start durch. Tippe unten in der Leiste auf den Tab [[tabs.circles]]. Tippe dann auf [[ol:circlesTab.anonJoin]].",
            "Die App fragt nur nach deinem Namen. Gib ihn ein und tippe auf [[nameSheet.confirm]]. Danach öffnet sich der Bildschirm [[tx:joinGroup.title]].",
          ],
          ipucu: "Hast du in der App schon deinen Namen eingegeben oder dich angemeldet, siehst du diesen Knopf nicht. Tippe dann oben rechts auf **+**. Tippe im Fenster auf die Zeile [[tx:dashboard.joinExisting]].",
          sahne: "katil-kod-giris",
        },
        {
          baslik: "Link oder Code einfügen, auf Beitreten tippen",
          metin: [
            "Halte in WhatsApp die Einladungsnachricht gedrückt und kopiere sie. Geh dann zurück in die App und tippe auf [[ol:common.paste]]. Fragt dein Handy um Erlaubnis zum Einfügen, erlaube es. Die App findet den Code selbst in der Nachricht. Du kannst den Code auch von Hand eingeben.",
            "Tippe dann auf [[joinGroup.join]]. Der Kreis öffnet sich direkt.",
          ],
          fark: "Du kannst den ganzen Link einfügen, sogar die ganze Nachricht. Auch ein Code mit Leerzeichen dazwischen wird erkannt.",
          ipucu: "Passt der Code nicht, zeigt die App: [[tx:joinGroup.notFoundMsg]] Lies den Code dann noch einmal genau. In den Codes kommen die Buchstaben I und O und die Ziffern 0 und 1 nicht vor.",
          sahne: "katil-kod",
        },
      ],
    },
    {
      tur: "bolum", id: "qr-ve-tarayici", rol: "Wer eingeladen ist", baslik: "Per QR-Code oder im Browser",
      giris: "Eine Einladung kann in der Moschee oder bei einem Treffen auf einem Bildschirm gezeigt werden. Einem einmaligen Kreis kannst du auch ohne App beitreten.",
      adimlar: [
        {
          baslik: "Scanne den QR-Code mit der Kamera deines Handys",
          metin: [
            "Jemand im Kreis, meist der Admin, öffnet auf seinem Handy das Fenster [[tx:group.inviteToCircle]]. Dort ist ein QR-Code. Öffne die Kamera deines Handys und halte sie auf den QR-Code.",
            "Tippe auf den Link, der erscheint. Hast du die App, öffnet sich die Einladungskarte; tippe auf [[joinGroup.join]]. Hast du die App nicht, öffnet sich die Einladungsseite; mach mit Schritt 3 oben weiter.",
          ],
          ipucu: "Den QR-Code gibt es im Einladungsfenster regelmäßiger Kreise. Bei einmaligen Kreisen nimmst du den Link oder den Code.",
          sahne: "katil-qr",
        },
        {
          baslik: "Einem einmaligen Kreis im Browser beitreten",
          metin: [
            "Der Link eines einmaligen Kreises, etwa einer Khatm für einen Verstorbenen, einer Khatm in einer gesegneten Nacht oder gemeinsamer Salawat, öffnet sich meist auch ohne App, und im Browser erscheint die Seite des Kreises. Konto oder App brauchst du nicht. Siehst du auf der Seite nur das Feld [[tx:=Einladungscode]] und die Store-Knöpfe, braucht dieser Link die App; mach mit Schritt 3 weiter.",
            "Tippe bei einer Khatm auf [[=Diesen nehmen]]. Wähle unter [[=Wie viel wirst du lesen?]] die Zahl der Seiten und tippe auf [[=Ich bestätige, ich nehme ihn]]. Mit [[=Jetzt lesen]] öffnen sich deine Seiten im Browser. Bei einem Dhikr- oder Salawat-Ziel tippe auf [[=Mitzählen]], tippe so oft auf den Ring, wie du gezählt hast, und tippe am Ende auf [[=Beitrag hinzufügen]].",
            "Jeder liest oder rezitiert an seinem eigenen Ort; die Seite verteilt nur die Teile und zählt die Zahlen zusammen. Bei manchen Kreisen zeigt die Seite nur den Kreis; dann brauchst du zum Mitmachen die App. Mehr dazu: [Einmaliger Kreis](/de/anleitungen/einmaliger-kreis/) und [Dhikr und Salawat gemeinsam](/de/anleitungen/dhikr-salawat-gemeinsam/).",
          ],
          fark: "Auch ein Angehöriger ohne App kann meist einfach den Link antippen und seinen Teil im Browser übernehmen.",
          ipucu: "Hast du die App und hat sich trotzdem diese Seite geöffnet, tippe ganz unten auf [[=In der App öffnen]] und in der App auf [[joinGroup.join]]. So werden die Teile, die du ab jetzt nimmst, deinem Konto zugeordnet und erscheinen im Bereich [[tx:dashboard.myTasks]].",
          sahne: "katil-web",
        },
      ],
    },
    {
      tur: "bolum", id: "katildiktan-sonra", rol: "Neu im Kreis", baslik: "Nach dem Beitreten",
      giris: "Im Kreis gibt es zwei Tabs. Im Tab [[tx:group.readingsTab]] stehen die Aufgaben des Kreises, im Tab [[tx:group.membersMenu]] siehst du die anderen Mitglieder.",
      adimlar: [
        {
          baslik: "Finde deine Aufgabe auf der Startseite",
          metin: [
            "Bekommst du eine Aufgabe, erscheint im Tab [[tx:tabs.home]] im Bereich [[tx:dashboard.myTasks]] eine Karte. Darauf stehen der Name des Kreises und dein Dschuz.",
            "Tippst du auf die Karte, öffnet sich die Aufgabe. Hast du Benachrichtigungen erlaubt, bekommst du auch eine Benachrichtigung, sobald deine neue Aufgabe bereit ist; beginnt eine Runde in der Nacht, kommt die Benachrichtigung am Morgen.",
          ],
          sahne: "katil-gorev",
        },
        {
          baslik: "Läuft schon eine Khatm, kommt dein Teil in der nächsten Runde",
          metin: [
            "Läuft im Kreis eine Khatm und bist du mitten in einer Runde beigetreten, steht in der Aufgabe: [[tx:flow.noAssignment]] Das ist kein Fehler.",
            "Die Dschuz gehen beim Start einer Runde an alle, die dann im Kreis sind. In der nächsten Runde stehst auch du auf der Liste, und dein Teil kommt von selbst. Aufgaben wie ein Dhikr-Ziel erscheinen dagegen sofort im Bereich [[tx:dashboard.myTasks]].",
          ],
          ipucu: "Willst du nicht warten und liegt ein Teil im Pool, erscheint unten der Link [[tx:flow.noAssignmentPoolCta]]. Dort kannst du einen Teil übernehmen.",
          sahne: "katil-sonraki-tur",
        },
      ],
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "So sieht es in der App aus",
      giris: "Diese Bilder stammen direkt aus der App.",
      kareler: [
        { img: "h01-home", alt: "Startseite: Bereich Deine Aufgaben mit den Aufgaben der Kreise", cap: "Startseite: deine Aufgaben" },
        { img: "n01-halka", alt: "Kreis-Bildschirm: Aufgaben des Kreises im Tab Lesungen", cap: "Kreis-Bildschirm: die Aufgaben des Kreises" },
        { img: "n03b-uyeler", alt: "Tab Mitglieder: ein Gast, die Zeile Gast hinzufügen und der Knopf Kreis verlassen", cap: "Tab Mitglieder (so sieht ihn der Admin): ein Gast und der Knopf [[tx:group.leaveGroup]]" },
        { img: "06c-event-davet", alt: "Einladungskarte eines einmaligen Kreises: Einladungscode, Einladungslink und Hinweis für Menschen ohne App", cap: "Einmaliger Kreis: der Link öffnet sich auch ohne App" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Ich habe den Einladungslink angetippt. Was passiert jetzt?",
        c: "Hast du die App, öffnet sie sich und zeigt die Einladungskarte; du tippst auf [[joinGroup.join]]. Hast du die App nicht, öffnet sich im Browser die Einladungsseite. Dort stehen der Einladungscode und Knöpfe zum Laden der App. Der Link eines einmaligen Kreises öffnet dagegen meist im Browser die Seite des Kreises selbst. Stehen auf der Seite nur das Feld [[tx:=Einladungscode]] und die Store-Knöpfe, braucht dieser Kreis die App; mach mit Schritt 3 weiter." },
      { s: "Ich habe einen kurzen Code bekommen. Wo gebe ich ihn ein?",
        c: "Öffne in der App den Tab [[tabs.circles]] und tippe auf [[ol:circlesTab.anonJoin]]. Siehst du diesen Knopf nicht (weil du schon deinen Namen eingegeben oder dich angemeldet hast), tippe oben rechts auf **+** und dann auf die Zeile [[tx:dashboard.joinExisting]]. Gib den Code in das Feld ein und tippe auf [[joinGroup.join]]." },
      { s: "Kann ich beitreten, ohne die App zu laden?",
        c: "Bei einem einmaligen Kreis meist ja: Der Link öffnet sich im Browser, du nimmst einen Dschuz oder zählst mit. In einem regelmäßigen Kreis brauchst du die App. Einen Angehörigen ohne Smartphone kann der Admin als **Gast** hinzufügen; seinen Koran-Teil markiert die gewählte verantwortliche Person oder der Admin." },
      { s: "Muss ich ein Konto anlegen?",
        c: "Nein. Die App fragt nur nach deinem Namen; E-Mail, Passwort oder Telefonnummer brauchst du nicht. Wenn du willst, verknüpfst du dein Konto später mit Apple, Google oder E-Mail: Tippe dazu oben auf dem Bildschirm [[tabs.circles]] auf den Hinweis [[tx:secure.banner]]. So bleiben deine Kreise erhalten, auch wenn du das Handy wechselst." },
      { s: "Ich bin beigetreten. Wo sehe ich meine Aufgabe?",
        c: "Im Tab [[tx:tabs.home]] im Bereich [[tx:dashboard.myTasks]]. Im Kreis stehen im Tab [[tx:group.readingsTab]] außerdem alle Aufgaben des Kreises. Bist du mitten in einer Runde einer laufenden Khatm beigetreten, kommt dein Teil mit der nächsten Runde." },
      { s: "Wie verlasse ich einen Kreis?",
        c: "Tippe im Kreis oben rechts auf die drei Punkte. Tippe in der Liste auf [[tx:group.leaveGroup]]. Auf der nächsten Seite siehst du, was sich ändert. Mit [[ol:common.leave]] verlässt du den Kreis, mit [[tx:notice.stayInCircle]] brichst du ab. Deine nicht gelesenen Koran-Teile gehen in den Pool; die anderen im Kreis können sie von dort übernehmen. Später kannst du mit demselben Code wieder beitreten." },
      { s: "Der Einladungslink oder der Code funktioniert nicht. Was tun?",
        c: "Stimmt etwas mit dem Link nicht, zeigt die App: [[tx:join.invalidLink]] Hast du es mit dem Code versucht, zeigt sie: [[tx:joinGroup.notFoundMsg]] Vielleicht ist der Code falsch geschrieben oder den Kreis gibt es nicht mehr. Einmalige Kreise schließen, wenn ihre Zeit um ist. Bitte die Person, die dir den Link geschickt hat, um einen neuen Link oder Code. Ist der Kreis voll, zeigt die App: [[tx:joinGroup.groupFull]] Sag dann dem Admin Bescheid." },
    ],
  },

  ilgili: ["hatim", "tek", "zikir"],
  cta: { baslik: "Lade die App jetzt", metin: "Einem Kreis beitreten ist kostenlos. Lade die App, tippe auf den Einladungslink und tritt deinem Kreis bei." },
  kart: { kicker: "Beitreten", baslik: "Einem Kreis per Einladung beitreten", metin: "Tippe auf den Link oder füge den Code ein. Ohne App trittst du einem einmaligen Kreis im Browser bei." },
  onizleme: { sahne: "katil-link", adim: 3 },
};
