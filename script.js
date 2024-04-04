$(document).ready(function () {
    RandomElementlerEkle();
});
$(document).on("keydown", (e) => {
    HareketEt(e.which);
    tuslar[e.which].basili = true;
});
$(document).on("keyup", (e) => {
    tuslar[e.which].basili = false;
    oyunDevamEdiyor = false;
});

var oyunDevamEdiyor = false;
$("#SifirlaBtn").click(function () {
    location.reload();
});
function RandomUret(min, max) {
    return Math.floor(min + Math.random() * max);
}
function RandomElementlerEkle() {
    const alan = $("#OyunAlan");
    var sayac = RandomUret(5, 15);
    for (var i = 0; i < sayac; i++) {
        var boyut = RandomUret(5, 20);
        var newEl = document.createElement("span");
        newEl.setAttribute("class", "RandomEl");
        newEl.style.width = `${boyut.toString()}px`;
        newEl.style.height = `${boyut.toString()}px`;

        newEl.style.top = `${RandomUret(1, 600).toString()}px`;
        newEl.style.left = `${RandomUret(1, 1350).toString()}px`;
        alan.append(newEl);
    }
}

function HareketEt(key) {
    oyunDevamEdiyor = true;
    var oyuncu1 = $("#Oyuncu1");
    var oyuncu2 = $("#Oyuncu2");

    if (tuslar[65].basili && tuslar[87].basili) YeniKonumHesapla(oyuncu1, "solyuk");
    if (tuslar[65].basili && tuslar[83].basili) YeniKonumHesapla(oyuncu1, "solalt");
    if (tuslar[68].basili && tuslar[87].basili) YeniKonumHesapla(oyuncu1, "sagyuk");
    if (tuslar[68].basili && tuslar[83].basili) YeniKonumHesapla(oyuncu1, "sagalt");

    switch (key) {

        case 65: YeniKonumHesapla(oyuncu1, "sol"); break;//sol a
        case 87: YeniKonumHesapla(oyuncu1, "yuk"); break;//yukari w
        case 68: YeniKonumHesapla(oyuncu1, "sag"); break;//sag d
        case 83: YeniKonumHesapla(oyuncu1, "alt"); break;//asagi s

        case 37: YeniKonumHesapla(oyuncu2, "sol"); break;//sol
        case 38: YeniKonumHesapla(oyuncu2, "yuk"); break;//yukari
        case 39: YeniKonumHesapla(oyuncu2, "sag"); break;//sag
        case 40: YeniKonumHesapla(oyuncu2, "alt"); break;//asagi
    }
}

function YeniKonumHesapla(Oyuncu, Yon) {
    var SinirGenislik = $("#OyunAlan").width() - Oyuncu.width();
    var SinirYukseklik = $("#OyunAlan").height() - Oyuncu.width();
    var OyuncuKonumLeft = Oyuncu.position().left;
    var OyuncuKonumTop = Oyuncu.position().top;

    switch (Yon) {
        case "sol": OyuncuKonumLeft -= 10; break;//sol a
        case "yuk": OyuncuKonumTop -= 10; break;//yukari w
        case "sag": OyuncuKonumLeft += 10; break;//sag d
        case "alt": OyuncuKonumTop += 10; break;//asagi s

        case "solyuk":
            OyuncuKonumLeft -= 10;
            OyuncuKonumTop -= 10;
            break;
        case "solalt":
            OyuncuKonumLeft -= 10;
            OyuncuKonumTop += 10;
            break;
        case "sagyuk":
            OyuncuKonumLeft += 10;
            OyuncuKonumTop -= 10;
            break;
        case "sagalt":
            OyuncuKonumLeft += 10;
            OyuncuKonumTop += 10;
            break;
    }

    //eger en sola geldiyse daha kucuk olamaz
    if (OyuncuKonumLeft < 0) OyuncuKonumLeft = 0;
    //eger en saga geldiyse daha buyuk olamaz
    if (OyuncuKonumLeft > SinirGenislik) OyuncuKonumLeft = SinirGenislik;
    //eger en uste geldiyse daha buyuk olamaz
    if (OyuncuKonumTop < 0) OyuncuKonumTop = 0;
    //eger en alta geldiyse daha buyuk olamaz
    if (OyuncuKonumTop > SinirYukseklik) OyuncuKonumTop = SinirYukseklik;

    Oyuncu.css("left", OyuncuKonumLeft + "px");
    Oyuncu.css("top", OyuncuKonumTop + "px");
}
var tuslar = {
    65: { basili: false, tus: 65 },
    87: { basili: false, tus: 87 },
    68: { basili: false, tus: 68 },
    83: { basili: false, tus: 83 },

    37: { basili: false, tus: 37 },
    38: { basili: false, tus: 38 },
    39: { basili: false, tus: 39 },
    40: { basili: false, tus: 40 },
};
